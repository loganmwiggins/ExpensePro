namespace ExpensesAngularAPI.Models
{
    public class AddSuggestionDTO
    {
        public required string User { get; set; }

        public required string Message { get; set; }

        public required int UpvoteCount { get; set; }
    }
}
