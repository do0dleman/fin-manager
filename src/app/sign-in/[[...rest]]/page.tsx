import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function page() {
  return (
    <div className="grid h-[100dvh] place-items-center">
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "transparent",
            colorPrimary: "hsl(20.5 90.2% 48.2%)",
            colorInputBackground: "transparent",
          },
        }}
        signUpUrl="sign-up"
      />
    </div>
  );
}
export default page;
