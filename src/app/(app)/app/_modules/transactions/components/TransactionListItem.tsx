import React from "react";
import { api, type RouterOutputs } from "~/trpc/react";

function TransactionListItem(props: {
  transaction: RouterOutputs["transactions"]["getAccountTransactions"]["transactions"][number];
}) {
  const { transaction } = props;

  const { data: currencyInfo } = api.moneyAccounts.getCurrencyInfo.useQuery({
    currency_code: transaction.currency_code ?? "USD",
  });

  const isExpense = transaction.type == "expense";
  return (
    <div className="flex justify-between">
      <span>{transaction.name}</span>
      <span className={`${isExpense ? "text-destructive" : "text-positive"}`}>
        {isExpense ? "-" : "+"}
        {transaction.amount}
        {currencyInfo?.symbol}
      </span>
    </div>
  );
}

export default TransactionListItem;
