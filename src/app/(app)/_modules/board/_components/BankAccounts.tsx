import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import { api } from "~/trpc/react";

function BankAccounts() {
  const userAuthData = useUser();
  const userId = userAuthData.user!.id;

  const { data, isFetched, refetch } =
    api.moneyAccounts.getUsersMoneyAccounts.useQuery(
      { user_id: userId ?? "" },
      { enabled: userId != undefined },
    );

  const createMutation = api.moneyAccounts.createMoneyAccounts.useMutation({
    onSuccess: () => refetch(),
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  async function createNewAccount() {
    if (!userId) return;

    createMutation.mutate({
      name: name,
      amount: amount,
      user_id: userId,
    });
  }

  return (
    <div className="max-w-96">
      <div className="mb-4 [&>input]:mb-1 [&>input]:text-2xl">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <Button onClick={createNewAccount} disabled={!name}>
          Create
        </Button>
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
