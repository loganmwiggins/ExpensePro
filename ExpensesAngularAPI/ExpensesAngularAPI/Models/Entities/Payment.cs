namespace ExpensesAngularAPI.Models.Entities
{
    public class Payment
    {
        public Guid Id { get; set; }

        public required Double Amount { get; set; }

        public required DateOnly StatementOpen { get; set; }

        public required DateOnly StatementClose { get; set; }

        public required DateOnly PaymentDate { get; set; }

        public required DateOnly DueDate { get; set; }

        public required bool IsPaid { get; set; }
    }
}