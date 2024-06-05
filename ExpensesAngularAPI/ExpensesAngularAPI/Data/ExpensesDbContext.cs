using ExpensesAngularAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpensesAngularAPI.Data
{
    public class ExpensesDbContext : DbContext
    {
        public ExpensesDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Expense> Expenses { get; set; }
    }
}