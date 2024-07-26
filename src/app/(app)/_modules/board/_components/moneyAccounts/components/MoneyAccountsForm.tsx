import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountColors } from "~/app/(app)/_models/AccountColor";
import { Button } from "~/app/_components/ui/button";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form";
import { Input } from "~/app/_components/ui/input";
import { RadioGroup } from "~/app/_components/ui/radio-group";
import { api } from "~/trpc/react";

function MoneyAccountsForm(props: { onSuccessSubmit?: () => void }) {
  const { onSuccessSubmit } = props;

  const createMutation = api.moneyAccounts.createMoneyAccounts.useMutation({});

  const utils = api.useUtils();

  const formSchema = z.object({
    name: z.string({ message: "Money account has to have a name" }).min(2, {
      message: "Name must be at least 2 characters.",
    }),
    amount: z.coerce.number({ message: "Amount has to be a number" }),
    color: z.enum(accountColors, { message: "Please select a color" }),
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
      color: values.color,
    });

    form.reset();
    if (onSuccessSubmit) {
      onSuccessSubmit();
    }
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
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Color</FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  className="flex gap-[2%]"
                  onValueChange={field.onChange}
                >
                  {accountColors.map((color) => (
                    <RadioGroupPrimitive.Item
                      className="relative z-0 aspect-square w-full rounded-sm transition-all duration-100 checked:border-2 hover:opacity-85 active:opacity-65"
                      style={{ background: `var(--${color})` }}
                      value={color}
                      id={`macc-r-c-${color}`}
                      key={`macc-r-c-${color}`}
                    >
                      <RadioGroupPrimitive.Indicator className="absolute inset-0 m-auto aspect-square w-1/2 rounded-full bg-foreground" />
                      <RadioGroupPrimitive.Indicator className="absolute inset-0 -z-10 m-auto aspect-square w-1/2 rounded-full bg-background opacity-45 blur-sm" />
                    </RadioGroupPrimitive.Item>
                  ))}
                </RadioGroup>
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
