import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/app/_components/ui/card";
import { CheckCircle2 } from "lucide-react";

function MonthlyCard(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Card className="flex w-full max-w-72 flex-col">
      <CardHeader>
        <CardTitle>Monthly Plan</CardTitle>
        <CardDescription>Perfect for short-term commitments</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold text-primary">
          $9.99
          <span className="text-xl font-normal text-muted-foreground">
            /month
          </span>
        </p>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            <span>Full access to all features</span>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            <span>Cancel anytime</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}

export default MonthlyCard;
