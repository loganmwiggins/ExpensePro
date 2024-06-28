using ExpensesAngularAPI.Data;
using ExpensesAngularAPI.Helpers;
using ExpensesAngularAPI.Models;
using ExpensesAngularAPI.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace ExpensesAngularAPI.Controllers
{
    // localhost:xxxx/api/expenses
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        // dbContext variable refers to the connected database
        // We can use dbContext.TABLENAME to refer to a table in the Db
        private readonly ExpensesDbContext dbContext;

        public ExpensesController(ExpensesDbContext dbContext)
        {   
            this.dbContext = dbContext;
        }


        // Return entire list of expenses from Db
        [Authorize]
        [HttpGet]
        public IActionResult GetAllExpenses()
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var allExpenses = dbContext.Expenses.Where(exp => exp.UserId == currentUserId).ToList(); // Get expense list based on current user Id
            return Ok(allExpenses);
        }


        // Return a single expense from the Db by its id
        [Authorize]
        [HttpGet]
        [Route("{id:guid}")]    // Accepting an identifier is required for this action
        public IActionResult GetExpenseById(Guid id)
        {
            var expense = dbContext.Expenses.Find(id);  // Result can be a found expense, or if not found, var is nullable

            if (expense is null)
            {
                return NotFound("Expense not found."); // 404
            }

            return Ok(expense);
        }


        // Add expense to Db
        [Authorize]
        [HttpPost]
        public IActionResult AddExpense(AddExpenseDTO addExpenseDTO)
        {
            var currentUserId = CurrentUserFinder.GetCurrentUserId(User);

            var expenseEntity = new Expense
            {
                //Id = Guid.NewGuid(), [not needed: Entity Framework does this for us]
                UserId = currentUserId,
                Name = addExpenseDTO.Name,
                Type = addExpenseDTO.Type,
                Icon = addExpenseDTO.Icon,
                Cost = addExpenseDTO.Cost,
                PaymentDate = addExpenseDTO.PaymentDate,
                PaymentDateNum = addExpenseDTO.PaymentDateNum,
                Category = addExpenseDTO.Category
            };

            dbContext.Expenses.Add(expenseEntity);
            dbContext.SaveChanges();

            return Ok(expenseEntity);
        }


        // Update/edit expense in the Db
        [Authorize]
        [HttpPut]
        [Route("{id:guid}")]    // Accepts identifier for the action, but function also accepts parameter (DTO) for what we want to update
        public IActionResult UpdateExpense(Guid id, UpdateExpenseDTO updateExpenseDTO)
        {
            var expense = dbContext.Expenses.Find(id);  // var is an expense if found, or null

            if (expense is null)
            {
                return NotFound("Expense not found."); // 404
            }

            // Use information from client (DTO param) to update Db vars
            expense.Name = updateExpenseDTO.Name;
            expense.Type = updateExpenseDTO.Type;
            expense.Icon = updateExpenseDTO.Icon;
            expense.Cost = updateExpenseDTO.Cost;
            expense.PaymentDate = updateExpenseDTO.PaymentDate;
            expense.PaymentDateNum = updateExpenseDTO.PaymentDateNum;
            expense.Category = updateExpenseDTO.Category;

            dbContext.SaveChanges();

            return Ok(expense);
        }


        // Delete expense from Db
        [Authorize]
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteExpense(Guid id)
        {
            // Check if id exists in Db
            var expense = dbContext.Expenses.Find(id);

            if (expense is null)
            {
                return NotFound(); // 404
            }

            dbContext.Expenses.Remove(expense);
            dbContext.SaveChanges();

            return Ok(); // Can pass a specific response if wanted, but not necessary
        }
    }
}