import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { api } from "~/trpc/react";

function BankAccounts() {
  const { data, isFetched, refetch } =
    api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const createMutation = api.moneyAccounts.createMoneyAccounts.useMutation({
    onSuccess: () => refetch(),
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  async function createNewAccount() {
    createMutation.mutate({
      name: name,
      amount: amount,
    });
  }

  return (
    <div className="max-w-96">
      <div className="mb-4 [&>input]:mb-1">
        <Label htmlFor="acc-name">Name</Label>
        <Input
          id="acc-name"
          className="text-2xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="acc-amount">Amount</Label>
        <div className="flex gap-2">
          <Input
            id="acc-amount"
            className="text-2xl"
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
          <Button onClick={createNewAccount} disabled={!name}>
            Create
          </Button>
        </div>
      </div>
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
export default BankAccounts;
