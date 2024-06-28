using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensesAngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddPaymentDateNumColumnToExpenses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentDateNum",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentDateNum",
                table: "Expenses");
        }
    }
}
