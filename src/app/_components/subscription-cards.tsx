import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/app/_components/ui/card";
import { Button } from "~/app/_components/ui/button";
import { CheckCircle2 } from "lucide-react";
import SubscriptionCardsLink from "./subscription-cards-link";

export default function SubscriptionCards() {
  return (
    <div className="flex flex-col items-stretch justify-center gap-6 bg-background p-4 md:flex-row">
      <Card className="flex w-full max-w-sm flex-col">
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
        <CardFooter>
          <SubscriptionCardsLink
            className="w-full"
            variant="outline"
            href="https://finman.lemonsqueezy.com/buy/c648e06f-9f46-4467-9dde-1b08ab82d570"
          >
            Subscribe Now
          </SubscriptionCardsLink>
        </CardFooter>
      </Card>

      <Card className="flex w-full max-w-sm flex-col border-primary">
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
        <CardFooter>
          <SubscriptionCardsLink
            className="w-full"
            href="https://finman.lemonsqueezy.com/buy/4f62d395-1525-4e71-baf7-f8f048bf7f6a"
          >
            Subscribe Now
          </SubscriptionCardsLink>
        </CardFooter>
      </Card>
    </div>
  );
}
