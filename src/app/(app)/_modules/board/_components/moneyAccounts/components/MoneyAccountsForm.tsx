import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { api } from "~/trpc/react";

function MoneyAccountsForm() {
  const createMutation = api.moneyAccounts.createMoneyAccounts.useMutation({});

  const utils = api.useUtils();

  const formSchema = z.object({
    name: z.string({ message: "Money account has to have a name" }).min(2, {
      message: "Name must be at least 2 characters.",
    }),
    amount: z.coerce.number({ message: "Amount has to be a number" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createMutation.mutateAsync({
      name: values.name,
      amount: values.amount,
    });

    form.reset();
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
              <FormLabel>Money Account Name</FormLabel>
              <FormControl>
                <Input className="text-xl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Money Amount</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input className="text-xl" {...field} />
                  <Button>Create</Button>
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
export default MoneyAccountsForm;