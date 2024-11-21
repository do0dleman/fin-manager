import { api } from "~/trpc/react";
import { MoneyAccountModal } from "./MoneyAccountModal";
import { Button } from "~/app/_components/ui/button";
import { useMemo } from "react";
import MoneyAccountListItem from "./MoneyAccountListItem";
import { useUser } from "@clerk/nextjs";

function MoneyAccountList() {
  const { data } = api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const { user } = useUser();
  const { data: userData } = api.users.getUserInfo.useQuery({
    user_id: user?.id ?? "",
  });

  const { data: currencyInfo } = api.moneyAccounts.getCurrencyInfo.useQuery({
    currency_code: userData?.user.currency_code ?? "",
  });

  const totalMoney = useMemo(() => {
    if (!data) {
      return 0;
    }

    // TODO: money conversion
    return data?.moneyAccounts
      .map((acc) => +acc.amount)
      .reduce((acc, v) => acc + v);
  }, [data]);

  return (
    <div className="w-full min-w-60">
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
            <MoneyAccountListItem account={account} key={`ac-${account.id}`} />
          ))}
        <div className="mt-2 flex w-full justify-between border-t">
          <span>Total:</span>
          <span className="mr-8 font-bold">
            {Math.round(totalMoney * 100) / 100}
            {currencyInfo?.symbol ?? "$"}
          </span>
        </div>
      </div>
    </div>
  );
}
export default MoneyAccountList;
