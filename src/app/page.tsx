import SubscriptionCards from "./_components/subscription-cards/subscription-cards";
import Header from "./_components/Header";
import Cta from "./modules/Cta";

export default async function Home() {
  return (
    <body className="dark">
      <Header />
      <Cta />
      <main className="flex items-center justify-center">
        <SubscriptionCards />
      </main>
    </body>
  );
}
