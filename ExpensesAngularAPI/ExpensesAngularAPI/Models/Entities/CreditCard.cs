namespace ExpensesAngularAPI.Models.Entities
{
    public class CreditCard
    {
        public Guid Id { get; set; }

        public required int UserId { get; set; }

        public required string CardName { get; set; }

        public string? CardImage { get; set; }

        public int? CreditLimit { get; set; }

        public required int AnnualFee { get; set; }

        public string? AnnualFeeDate { get; set; }

        public string? StatementDate { get; set; }

        public string? PaymentDate { get; set; }

        public string? DueDate  { get; set; }

        public string? Notes { get; set; }
    }
}