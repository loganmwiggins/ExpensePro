using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpensesAngularAPI.Migrations
{
    /// <inheritdoc />
    public partial class DropSuggestionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the Suggestions table
            migrationBuilder.DropTable(
                name: "Suggestions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Recreate the Suggestions table
            migrationBuilder.CreateTable(
                name: "Suggestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: false),
                    Message = table.Column<string>(nullable: false),
                    UpvoteCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suggestions", x => x.Id);
                });
        }
    }
}
