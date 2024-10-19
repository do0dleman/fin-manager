import React from "react";
import { Button } from "../_components/ui/button";
import Container from "../_components/container";
import Graph from "../_components/svg/Graph";
import Cross from "../_components/svg/Cross";
import DotCircle from "../_components/svg/DotCircle";
import Dots from "../_components/svg/Dots";

function Cta() {
  return (
    <section className="mt-20 pb-16">
      <Container className="relative flex gap-8">
        <article>
          <h1 className="mb-4 text-4xl">
            Take your money into account with FinMan!
          </h1>
          <p className="mb-16 text-xl text-muted-foreground">
            Manage multiple accounts, categorize your expenses and more.
          </p>
          <Button className="h-10 px-12 py-6 text-lg">Start Trial</Button>
        </article>
        <Graph className="h-full w-[28rem]" />
        <Cross className="absolute -top-16 right-[39%] -rotate-12" />
        <Cross className="absolute bottom-8 right-[5%] rotate-[24deg]" />
        <DotCircle className="absolute right-[14%] top-2 -rotate-12" />
        <Dots className="absolute bottom-16 left-[38%] rotate-12" />
      </Container>
    </section>
  );
}

export default Cta;
