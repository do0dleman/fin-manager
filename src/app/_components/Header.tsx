import AuthHeader from "./AuthHeader";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-4 text-3xl">
      <span className="select-none text-4xl">
        <span className="text-primary">Fin</span>Man
      </span>
      <AuthHeader />
    </header>
  );
}
export default Header;
