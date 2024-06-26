using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpensesAngularAPI.Models.Entities
{
    public class Upvote
    {
        [Key]
        public int Id { get; set; }

        //[ForeignKey(nameof(SuggestionId))]
        public required int SuggestionId { get; set; }

        //[ForeignKey(nameof(UserId))]
        public required int UserId { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
