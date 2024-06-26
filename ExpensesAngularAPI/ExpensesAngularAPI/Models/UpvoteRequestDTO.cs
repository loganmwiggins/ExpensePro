namespace ExpensesAngularAPI.Models
{
    public class UpvoteRequestDTO
    {
        public required int SuggestionId { get; set; }
        public required int UserId { get; set; }
    }
}