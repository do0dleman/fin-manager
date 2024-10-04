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

function AnnualCard(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Card className="flex w-full max-w-72 flex-col border-primary">
      <CardHeader>
        <CardTitle>Annual Plan</CardTitle>
        <CardDescription>Best value for long-term users</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold text-primary">
          $99.99
          <span className="text-xl font-normal text-muted-foreground">
            /year
          </span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Save $19.89 compared to monthly
        </p>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            <span>All Monthly Plan features</span>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            <span>Two months free</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}

export default AnnualCard;
