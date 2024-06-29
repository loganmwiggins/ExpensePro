using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensesAngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTimestampFieldToExpenseAndSuggestionTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "Suggestions",
                type: "datetime2",
                nullable: true,
                defaultValue: DateTime.UtcNow);

            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "Expenses",
                type: "datetime2",
                nullable: true,
                defaultValue: DateTime.UtcNow);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Suggestions");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "Expenses");
        }
    }
}
