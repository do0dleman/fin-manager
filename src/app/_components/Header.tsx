import AuthHeader from "./AuthHeader";
import WebsiteLogo from "./ui/website-logo";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-4 text-3xl">
      <WebsiteLogo />
      <AuthHeader />
    </header>
  );
}
export default Header;
