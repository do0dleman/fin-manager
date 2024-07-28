import type Transaction from "./Transaction";

type BankAccount = {
  id: string
  name: string;
  amount: number;
  userId: string;
  transactions: Transaction[]
}

export default BankAccount