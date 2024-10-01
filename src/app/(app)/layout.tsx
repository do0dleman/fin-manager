import Loader from "./_modules/Loader";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <div className="">{children}</div>
      <Loader />
    </div>
  );
}
