﻿using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models.Entities;
using ExpensesAngularAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using static Azure.Core.HttpHeader;

namespace ExpensesAngularAPI.Controllers
{
    // localhost:xxxx/api/CreditCard
    [Route("api/[controller]")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        // dbContext variable refers to the connected database
        // We can use dbContext.TABLENAME to refer to a table in the Db
        private readonly ExpensesDbContext dbContext;

        public CreditCardController(ExpensesDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        // Return entire list of credit cards from Db
        [Authorize]
        [HttpGet]
        public IActionResult GetAllCards()
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);
            var allCards = dbContext.CreditCards.Where(card => card.UserId == currentUserId).ToList();

            return Ok(allCards);
        }

        // Return a single card from the Db by its id
        [Authorize]
        [HttpGet]
        [Route("{id:guid}")]    // Accepting an identifier is required for this action
        public IActionResult GetCardById(Guid id)
        {
            var card = dbContext.CreditCards.Find(id);  // Result can be a found expense, or if not found, var is nullable

            if (card is null)
            {
                return NotFound("Card not found."); // 404
            }

            return Ok(card);
        }


        // Add card to Db
        [Authorize]
        [HttpPost]
        public IActionResult AddCard(AddCardDTO addCardDTO)
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var cardEntity = new CreditCard
            {
                //Id = Guid.NewGuid(), [not needed: Entity Framework does this for us]
                UserId = currentUserId,
                CardName = addCardDTO.CardName,
                CardIssuer = addCardDTO.CardIssuer,
                CardImage = addCardDTO.CardImage,
                CreditLimit = addCardDTO.CreditLimit,
                AnnualFee = addCardDTO.AnnualFee,
                AnnualFeeDate = addCardDTO.AnnualFeeDate,
                StatementDate = addCardDTO.StatementDate,
                PaymentDate = addCardDTO.PaymentDate,
                DueDate = addCardDTO.DueDate,
                Notes = addCardDTO.Notes
            };

            dbContext.CreditCards.Add(cardEntity);
            dbContext.SaveChanges();

            return Ok(cardEntity);
        }

        // Update/edit card in the Db
        [Authorize]
        [HttpPut]
        [Route("{id:guid}")]    // Accepts identifier for the action, but function also accepts parameter (DTO) for what we want to update
        public IActionResult UpdateCard(Guid id, AddCardDTO updateCardDTO)
        {
            var card = dbContext.CreditCards.Find(id);  // var is an expense if found, or null

            if (card is null)
            {
                return NotFound("Expense not found."); // 404
            }

            // Use information from client (DTO param) to update Db vars
            card.CardName = updateCardDTO.CardName;
            card.CardIssuer = updateCardDTO.CardIssuer;
            card.CardImage = updateCardDTO.CardImage;
            card.CreditLimit = updateCardDTO.CreditLimit;
            card.AnnualFee = updateCardDTO.AnnualFee;
            card.AnnualFeeDate = updateCardDTO.AnnualFeeDate;
            card.StatementDate = updateCardDTO.StatementDate;
            card.PaymentDate = updateCardDTO.PaymentDate;
            card.DueDate = updateCardDTO.DueDate;
            card.Notes = updateCardDTO.Notes;

            dbContext.SaveChanges();

            return Ok(card);
        }


        // Delete card from Db
        [Authorize]
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteCard(Guid id)
        {
            // Check if id exists in Db
            var card = dbContext.CreditCards.Find(id);

            if (card is null)
            {
                return NotFound(); // 404
            }

            dbContext.CreditCards.Remove(card);
            dbContext.SaveChanges();

            return Ok(); // Can pass a specific response if wanted, but not necessary
        }
    }
}