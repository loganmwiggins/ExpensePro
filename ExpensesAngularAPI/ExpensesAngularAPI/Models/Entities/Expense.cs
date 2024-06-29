namespace ExpensesAngularAPI.Models.Entities
{
    public class Expense
    {
        public Guid Id { get; set; }

        public required int UserId { get; set; }

        public required string Name { get; set; }

        public required string Type { get; set; }

        public required string Icon { get; set; }

        public required double Cost { get; set; }

        public string? PaymentDate { get; set; }

        public string? PaymentDateNum { get; set; }

        public required string Category { get; set; }

        public DateTime? Timestamp { get; set; }
    }
}