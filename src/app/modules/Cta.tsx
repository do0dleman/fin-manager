import React from "react";
import { Button } from "../_components/ui/button";
import Container from "../_components/container";
import Image from "next/image";

function Cta() {
  return (
    <section className="relative pb-24 pt-28">
      <Container className="relative flex gap-8">
        <article className="relative z-10 w-[60%]">
          <h1 className="mb-4 text-4xl">
            Take your money into account with FinMan!
          </h1>
          <p className="mb-16 text-xl text-muted-foreground">
            Manage multiple accounts, categorize your expenses and more.
          </p>
          <Button className="h-10 px-12 py-6 text-lg">Start Trial</Button>
        </article>
        <Image
          src="/img/appScreenshot.png"
          alt={"App Illustration"}
          className="absolute -bottom-12 -right-16 -z-10"
          width={672}
          height={314}
        />
      </Container>
      <div className="absolute top-0 h-full w-full bg-gradient-to-br from-background to-muted opacity-20" />
    </section>
  );
}

export default Cta;
