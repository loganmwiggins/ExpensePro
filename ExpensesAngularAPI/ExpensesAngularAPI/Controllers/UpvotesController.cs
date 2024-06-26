using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Models;
using ExpensesAngularAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpensesAngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpvotesController : ControllerBase
    {
        // dbContext variable refers to the connected database
        // We can use dbContext.TABLENAME to refer to a table in the Db
        private readonly ExpensesDbContext dbContext;

        public UpvotesController(ExpensesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpPost("toggle")]
        public async Task<IActionResult> ToggleUpvote([FromBody] Upvote upvote)
        {
            var existingUpvote = await dbContext.Upvotes
                .FirstOrDefaultAsync(u => u.SuggestionId == upvote.SuggestionId && u.UserId == upvote.UserId);

            // If the suggestion is already upvoted
            if (existingUpvote != null)
            {
                dbContext.Upvotes.Remove(existingUpvote);
                var suggestion = await dbContext.Suggestions.FindAsync(upvote.SuggestionId);
                if (suggestion != null)
                {
                    suggestion.UpvoteCount = (suggestion.UpvoteCount ?? 1) - 1;
                }
            }
            // If the suggestion is not yet upvoted
            else
            {
                upvote.Timestamp = DateTime.UtcNow;
                await dbContext.Upvotes.AddAsync(upvote);
                var suggestion = await dbContext.Suggestions.FindAsync(upvote.SuggestionId);
                if (suggestion != null)
                {
                    suggestion.UpvoteCount = (suggestion.UpvoteCount ?? 0) + 1;
                }
            }

            await dbContext.SaveChangesAsync();
            return Ok();
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserUpvotes(int userId)
        {
            var upvotes = await dbContext.Upvotes
                .Where(u => u.UserId == userId)
                .ToListAsync();

            return Ok(upvotes);
        }
    }
}