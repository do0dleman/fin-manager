import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import { api } from "~/trpc/react";

function TransactionForm(props: { onSuccessSubmit?: () => void }) {
  const { onSuccessSubmit } = props;

  const { data: accountsData } =
    api.moneyAccounts.getUsersMoneyAccounts.useQuery();

  const utils = api.useUtils();

  const createMutation = api.transactions.createTransaction.useMutation();

  const formSchema = z.object({
    name: z.string({ message: "Transaction has to have a name" }).min(2, {
      message: "Name must be at least 2 characters.",
    }),
    amount: z.coerce
      .number({ message: "Amount has to be a number" })
      .min(0.01, {
        message: "Amount cannot be 0",
      }),
    type: z.enum(["income", "expense"]),
    accountId: z.coerce.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: "expense",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createMutation.mutateAsync({
      name: values.name,
      account_id: values.accountId,
      amount: values.amount,
      type: values.type,
    });

    form.reset();
    if (onSuccessSubmit) {
      onSuccessSubmit();
    }
    void utils.transactions.getUserLatestTransactions.invalidate(undefined, {
      refetchType: "all",
    });
    void utils.moneyAccounts.getUsersMoneyAccounts.invalidate(undefined, {
      refetchType: "all",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-4 w-full space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Name</FormLabel>
              <FormControl>
                <Input className="text-xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction account</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accountsData?.moneyAccounts.map((account) => (
                    <SelectItem
                      key={`facc-${account.id}`}
                      value={`${account.id}`}
                    >
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input className="text-xl" {...field} />
                  <Button type="submit">Submit</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
export default TransactionForm;
