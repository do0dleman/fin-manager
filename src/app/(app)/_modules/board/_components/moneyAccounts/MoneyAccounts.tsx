import { api } from "~/trpc/react";
import MoneyAccountsForm from "./components/MoneyAccountsForm";

function MoneyAccounts() {
  const { data } = api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  return (
    <div className="max-w-96">
      <MoneyAccountsForm />
      <h2 className="mb-4 border-b">BankAccounts</h2>
      <div>
        {data?.moneyAccounts.map((account) => (
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
