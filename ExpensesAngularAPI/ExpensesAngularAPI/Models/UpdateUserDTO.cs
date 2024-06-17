namespace ExpensesAngularAPI.Models
{
    public class UpdateUserDTO
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public required string Username { get; set; }

        public double? Income { get; set; }
    }
}