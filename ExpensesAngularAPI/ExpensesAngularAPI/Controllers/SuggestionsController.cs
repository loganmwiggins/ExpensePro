﻿using ExpensesAngularAPI.Data;
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
        [Route("{id:guid}")]    // Accepting an identifier is required for this action
        public IActionResult GetSuggestionById(Guid id)
        {
            var suggestion = dbContext.Suggestions.Find(id);  // Result can be a found suggestion, or if not found, var is nullable

            if (suggestion is null)
            {
                return NotFound(new { Message = "Suggestion not found." }); // 404
            }

            return Ok(suggestion);
        }


        // Add expense to Db
        [Authorize]
        [HttpPost]
        public IActionResult AddSuggestion(AddSuggestionDTO addSuggestionDTO)
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var user = dbContext.Users.Find(currentUserId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var suggestionEntity = new Suggestion
            {
                User = user.Username,
                Message = addSuggestionDTO.Message,
                UpvoteCount = 0
            };

            dbContext.Suggestions.Add(suggestionEntity);
            dbContext.SaveChanges();

            return Ok(suggestionEntity);
        }
    }
}
