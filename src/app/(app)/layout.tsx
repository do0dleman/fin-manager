"use client";

import { useEffect, useState } from "react";
import Loader from "./_modules/Loader";
import useSettingsStore from "./_store/settings_store";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useSettingsStore();
  const [themeName, setThemeName] = useState("dark");

  useEffect(() => {
    if (theme === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setThemeName("dark");
        return;
      }
      setThemeName("light");
      return;
    }
    setThemeName(theme);
  }, [theme]);
  return (
    <body className={`relative bg-background ${themeName}`}>
      <div className="">{children}</div>
      <Loader />
    </body>
  );
}
