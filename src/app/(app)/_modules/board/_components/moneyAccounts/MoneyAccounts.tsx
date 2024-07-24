import { api } from "~/trpc/react";
import { MoneyAccountModal } from "./components/MoneyAccountModal";
import { Button } from "~/app/_components/ui/button";

function MoneyAccounts() {
  const { data } = api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  return (
    <div className="max-w-96">
      <div className="mb-4 flex gap-2 border-b p-1">
        <h2 className="">BankAccounts</h2>
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
            <div key={`ac-${account.id}`} className="flex justify-between">
              <span>{account.name}</span>
              <span>{account.amount}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MoneyAccounts;
