using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensesAngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCardIssuerToEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardIssuer",
                table: "CreditCards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardIssuer",
                table: "CreditCards");
        }
    }
}
