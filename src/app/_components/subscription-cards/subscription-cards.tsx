import MonthlyCard from "./monthly-card";
import AnnualCard from "./annual-card";
import SubscriptionCardsLink from "../subscription-cards-link";

export default function SubscriptionCards() {
  return (
    <div className="flex flex-col items-stretch justify-center gap-6 bg-background p-4 md:flex-row">
      <MonthlyCard>
        <SubscriptionCardsLink
          className="w-full"
          variant="outline"
          href="https://finman.lemonsqueezy.com/buy/c648e06f-9f46-4467-9dde-1b08ab82d570"
        >
          Subscribe Now
        </SubscriptionCardsLink>
      </MonthlyCard>
      <AnnualCard>
        <SubscriptionCardsLink
          className="w-full"
          href="https://finman.lemonsqueezy.com/buy/4f62d395-1525-4e71-baf7-f8f048bf7f6a"
        >
          Subscribe Now
        </SubscriptionCardsLink>
      </AnnualCard>
    </div>
  );
}
