using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            if (user == null) { return NotFound(new { Message = "User not found." }); }

            // Check if password matches registered password hash (returns boolean, true if verified)
            if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password)) {
                return BadRequest(new { Message = "Password is incorrect." });
            }

            return Ok(new { Message = "Login success!" });
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
    }
}