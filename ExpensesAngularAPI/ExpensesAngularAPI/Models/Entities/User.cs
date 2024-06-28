using System.ComponentModel.DataAnnotations;

namespace ExpensesAngularAPI.Models.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public required string Username { get; set; }

        public required string Password { get; set; }

        public string? Token { get; set; }

        public string? Role { get; set; }


        // Extra user info
        public double? Income { get; set; }

        public DateTime? DateJoined { get; set; }
    }
}