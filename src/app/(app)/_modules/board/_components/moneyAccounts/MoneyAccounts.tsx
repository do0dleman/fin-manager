import { api } from "~/trpc/react";
import { MoneyAccountModal } from "./components/MoneyAccountModal";
import { Button } from "~/app/_components/ui/button";
import { useMemo } from "react";
import MoneyAccountDelete from "./components/MoneyAccountDelete";

function MoneyAccounts() {
  const { data } = api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const totalMoney = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data?.moneyAccounts
      .map((acc) => +acc.amount)
      .reduce((acc, v) => acc + v);
  }, [data]);

  return (
    <div className="min-w-60">
      <div className="mb-4 flex justify-between gap-2 border-b p-1">
        <h2 className="">Money Accounts</h2>
        <MoneyAccountModal
          OpenButton={
            <Button variant="secondary" className="aspect-aquare h-fit py-1">
              add
            </Button>
          }
        />
      </div>
      <div>
        {data?.moneyAccounts
          .sort((a, b) => +b.amount - +a.amount)
          .map((account) => (
            <div key={`ac-${account.id}`} className="flex items-center gap-2">
              <div
                className={`aspect-square h-5 w-5 rounded-full`}
                style={{ background: `var(--${account.color})` }}
              />
              <div className="flex w-full justify-between">
                <span>{account.name}</span>
                <div className="flex items-center gap-2">
                  <span>{account.amount}</span>
                  <MoneyAccountDelete accountId={account.id} />
                </div>
              </div>
            </div>
          ))}
        <div className="mt-2 flex w-full justify-between border-t">
          <span>Total:</span>
          <span className="font-bold">{totalMoney}</span>
        </div>
      </div>
    </div>
  );
}
export default MoneyAccounts;
