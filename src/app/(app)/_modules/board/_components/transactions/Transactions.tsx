import { api } from "~/trpc/react";
import TransactionForm from "./components/TransactionForm";

function Transactions() {
  const { data } = api.transactions.getUserLatestTransactions.useQuery();

  return (
    <div className="max-w-96">
      <TransactionForm />
      <h2 className="mb-4 border-b">Latest Transactions</h2>
      <div>
        {data?.transactions.map((transaction) => (
          <div key={`ac-${transaction.id}`} className="flex justify-between">
            <span>{transaction.name}</span>
            <span>{transaction.amount}</span>
          </div>
        )) ?? <></>}
      </div>
    </div>
  );
}
export default Transactions;
