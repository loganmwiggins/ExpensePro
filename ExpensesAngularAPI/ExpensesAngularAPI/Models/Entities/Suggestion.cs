using System.ComponentModel.DataAnnotations;

namespace ExpensesAngularAPI.Models.Entities
{
    public class Suggestion
    {
        [Key]
        public Guid Id { get; set; }

        public required string User {  get; set; }

        public required string Message { get; set; }

        public required int UpvoteCount { get; set; }
    }
}