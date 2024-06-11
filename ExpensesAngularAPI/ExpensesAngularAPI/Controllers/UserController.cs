using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            // Check if user exists (by username and password)
            var user = await dbContext.Users
                .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

            // If user is not found by username
            if (user == null) { return NotFound(new { Message = "User not found." }); }

            return Ok(new { Message = "Login success!" });
        }


        // Sign up authentication
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            // If user object (passed in) is empty/blank
            if (userObj == null) { return BadRequest(); }

            await dbContext.Users.AddAsync(userObj);    // Add user to database
            await dbContext.SaveChangesAsync();

            return Ok(new { Message = "Account created successfully!" });
        }
    }
}