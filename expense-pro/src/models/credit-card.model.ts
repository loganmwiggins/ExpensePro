export interface CreditCard {
    id: string;
    cardName: string;
    cardImage: string;
    creditLimit: number;
    annualFee: number;
    annualFeeDate: string;
    statementDate: string;
    paymentDate: string;
    dueDate: string;
    notes: string;
}