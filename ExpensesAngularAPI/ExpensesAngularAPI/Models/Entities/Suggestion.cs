using System.ComponentModel.DataAnnotations;

namespace ExpensesAngularAPI.Models.Entities
{
    public class Suggestion
    {
        [Key]
        public int Id { get; set; }

        public required string Username { get; set; }

        public required string Message { get; set; }

        public int? UpvoteCount { get; set; }
    }
}