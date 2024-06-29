namespace ExpensesAngularAPI.Models
{
    public class AddSuggestionDTO
    {
        public required string Username { get; set; }

        public required string Message { get; set; }

        public int? UpvoteCount { get; set; }

        public DateTime? Timestamp { get; set; }
    }
}