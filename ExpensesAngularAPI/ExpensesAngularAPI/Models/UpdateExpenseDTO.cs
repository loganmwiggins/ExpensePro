namespace ExpensesAngularAPI.Models
{
    public class UpdateExpenseDTO
    {
        public required string Name { get; set; }

        public required string Type { get; set; }

        public required string Icon { get; set; }

        public required double Cost { get; set; }

        public string? PaymentDate { get; set; }
    }
}