import React from "react";
import MoneyAccountDelete from "./MoneyAccountDelete";
import { api, type RouterOutputs } from "~/trpc/react";

function MoneyAccountListItem(props: {
  account: RouterOutputs["moneyAccounts"]["getUsersMoneyAccounts"]["moneyAccounts"][number];
}) {
  const { account } = props;

  const { data: currencyInfo } = api.moneyAccounts.getCurrencyInfo.useQuery({
    currency_code: account.currency_code ?? "",
  });

  return (
    <div className="flex items-center gap-2">
      <div
        className={`aspect-square h-5 w-5 rounded-full`}
        style={{ background: `var(--${account.color})` }}
      />
      <div className="flex w-full justify-between">
        <span>{account.name}</span>
        <div className="flex items-center gap-2">
          <span>
            {account.amount}
            {currencyInfo?.symbol}
          </span>
          <MoneyAccountDelete accountId={account.id} />
        </div>
      </div>
    </div>
  );
}

export default MoneyAccountListItem;
