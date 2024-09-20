import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function page() {
  return (
    <div className="grid h-[100dvh] place-items-center">
      <SignUp
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "transparent",
            colorPrimary: "hsl(20.5 90.2% 48.2%)",
            colorInputBackground: "transparent",
          },
        }}
        signInUrl="sign-in"
      />
    </div>
  );
}
export default page;
