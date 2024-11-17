using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models.Entities;
using ExpensesAngularAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesAngularAPI.Controllers
{
    // localhost:xxxx/api/creditcards
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
    }
}