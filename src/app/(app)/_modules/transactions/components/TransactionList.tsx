import { api } from "~/trpc/react";
import { TransactionModal } from "./TransactionModal";
import { Button } from "~/app/_components/ui/button";

function TransactionList() {
  const { data } = api.transactions.getUserLatestTransactions.useQuery({
    transactionAmount: 5,
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between gap-2 border-b p-1">
        <h2 className="h-fit">Latest Transactions</h2>
        <TransactionModal
          OpenButton={
            <Button variant="secondary" className="aspect-aquare h-fit py-1">
              add
            </Button>
          }
        />
      </div>
      <div>
        {data?.transactions.map((transaction) => {
          const isExpense = transaction.type == "expense";
          return (
            <div key={`ac-${transaction.id}`} className="flex justify-between">
              <span>{transaction.name}</span>
              <span
                className={`${isExpense ? "text-destructive" : "text-positive"}`}
              >
                {isExpense ? "-" : "+"}
                {transaction.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default TransactionList;
