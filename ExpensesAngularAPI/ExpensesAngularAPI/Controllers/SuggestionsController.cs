using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models.Entities;
using ExpensesAngularAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesAngularAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionsController : ControllerBase
    {
        // dbContext variable refers to the connected database
        // We can use dbContext.TABLENAME to refer to a table in the Db
        private readonly ExpensesDbContext dbContext;

        public SuggestionsController(ExpensesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        // Return entire list of suggestions from Db
        [Authorize]
        [HttpGet]
        public IActionResult GetAllSuggestions()
        {
            var allSuggestions = dbContext.Suggestions.ToList();
            return Ok(allSuggestions);
        }


        // Return a single suggestion from the Db by its id
        [Authorize]
        [HttpGet]
        [Route("{id:int}")]    // Accepting an identifier is required for this action
        public IActionResult GetSuggestionById(int id)
        {
            var suggestion = dbContext.Suggestions.Find(id);  // Result can be a found suggestion, or if not found, var is nullable

            if (suggestion is null)
            {
                return NotFound(new { Message = "Suggestion not found." }); // 404
            }

            return Ok(suggestion);
        }


        // Add suggestion to Db
        [Authorize]
        [HttpPost]
        public IActionResult AddSuggestion(AddSuggestionDTO addSuggestionDTO)
        {
            var suggestionEntity = new Suggestion
            {
                Username = addSuggestionDTO.Username,
                Message = addSuggestionDTO.Message,
                UpvoteCount = 0,
                Timestamp = DateTime.Now
            };

            dbContext.Suggestions.Add(suggestionEntity);
            dbContext.SaveChanges();

            return Ok(suggestionEntity);
        }
    }
}