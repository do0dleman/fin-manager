import SubscriptionCards from "./_components/subscription-cards";
import Header from "./_components/Header";

export default async function Home() {
  return (
    <div className="">
      <Header />
      <main className="flex items-center justify-center">
        <SubscriptionCards />
      </main>
    </div>
  );
}
