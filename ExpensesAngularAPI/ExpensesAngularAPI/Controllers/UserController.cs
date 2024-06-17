using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models;
using ExpensesAngularAPI.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace ExpensesAngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // dbContext variable refers to the connected database
        // We can use dbContext.TABLENAME to refer to a table in the Db
        private readonly ExpensesDbContext dbContext;

        public UserController(ExpensesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        // Get all users
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await dbContext.Users.ToListAsync());
        }


        // Get current user by Id
        [Authorize]
        [HttpGet("current")]
        public IActionResult GetCurrentUser()
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var user = dbContext.Users.Find(currentUserId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }


        // Update/edit user
        [Authorize]
        [HttpPut]
        //[Route("{id:int}")]    // Accepts identifier for the action, but function also accepts parameter (DTO) for what we want to update
        public async Task<IActionResult> UpdateExpense(UpdateUserDTO updateUserDTO)
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var user = dbContext.Users.Find(currentUserId);

            if (user == null)
            {
                return NotFound(new { Message = "User not found." });  // 404
            }

            // Check if username is unique
            if (await CheckUsernameExistAsync(updateUserDTO.Username) && user.Username != updateUserDTO.Username)
                return BadRequest(new { Message = "Username taken." });
            //if (await dbContext.Users.AnyAsync(x => x.Username == updateUserDTO.Username) && user.Username != updateUserDTO.Username)
            //{
            //    return BadRequest(new { Message = "Username taken." });
            //}

            // Check if email is unique
            if (await CheckEmailExistAsync(updateUserDTO.Email) && user.Email != updateUserDTO.Email)
                return BadRequest(new { Message = "An account has already been registered with this email." });

            // Use information from client (DTO param) to update Db vars, if above checks are passed
            user.FirstName = updateUserDTO.FirstName;
            user.LastName = updateUserDTO.LastName;
            user.Username = updateUserDTO.Username;
            user.Email = updateUserDTO.Email;
            user.Income = updateUserDTO.Income;

            dbContext.SaveChanges();

            return Ok(user);
        }


        // Login authentication
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            // If user object (passed in) is empty/blank
            if (userObj == null) { return BadRequest(); }

            // Check if user exists (by username)
            var user = await dbContext.Users
                .FirstOrDefaultAsync(x => x.Username == userObj.Username);

            // If user is not found by username
            if (user == null) { return NotFound(new { Message = "Username does not exist." }); }

            // Check if password matches registered password hash (returns boolean, true if verified)
            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password)) {
                return BadRequest(new { Message = "Password is incorrect." });
            }

            // If user is authenticated...
            user.Token = CreateJwtToken(user);

            return Ok(new
            {
                Token = user.Token,                     // Send JWT token
                Message = "Login success!"      // and return a success message
            });
        }


        // Sign up authentication
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            // If user object (passed in) is empty/blank
            if (userObj == null) { return BadRequest(); }

            // Check if username is unique
            if (await CheckUsernameExistAsync(userObj.Username))
                return BadRequest(new { Message = "Username taken."});

            // Check if email is unique
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "An account has already been registered with this email." });

            // Check password strength
            var pass = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(pass))
                return BadRequest(new { Message = pass.ToString() });

            // Hash password
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);

            // Default values
            userObj.Role = "User";
            userObj.Token = "";

            // Add user to database
            await dbContext.Users.AddAsync(userObj);    
            await dbContext.SaveChangesAsync();

            return Ok(new { Message = "Account created successfully!" });
        }


        // Check if username already exists in Db
        private async Task<bool> CheckUsernameExistAsync(string username)
        {
            return await dbContext.Users.AnyAsync(x => x.Username == username);
        }


        // Check if email already exists in Db
        private async Task<bool> CheckEmailExistAsync(string email)
        {
            return await dbContext.Users.AnyAsync(x => x.Email == email);
        }


        // Check the strength of a password
        private string CheckPasswordStrength(string password)
        {
            string sb = "";

            // Should be at least 8 characters
            if (password.Length < 8)
                sb = "Passwords should be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one special character.";

            // Should contain at least one lowercase letter, one capital letter, and one number
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))     
            {
                sb = "Passwords should be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one special character.";
            }

            // Should contain at least one special character
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
            {
                sb = "Passwords should be at least 8 characters and contain at least one lowercase letter, one uppercase letter, and one special character.";
            }

            return sb.ToString();
        }
        

        // Create JWT token to authenticate user
        // Token is made up of: 1. Header (algorithm and token type), 2. Payload (data), 3. Signature/Credentials (for verification)
        private string CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryveryverysecretsauceonakrabbypatty.....");   // Algorithm/key
            var identity = new ClaimsIdentity(new Claim[]   // Payload = user ID
            {
                new Claim("UserID", user.Id.ToString()),
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),             // When token expires and requires relogin (valid for 2 hours)
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}