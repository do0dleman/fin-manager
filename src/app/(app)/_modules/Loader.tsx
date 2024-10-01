"use client";

import React from "react";
import useLoaderStore from "./store";

function Loader() {
  const { isLoading } = useLoaderStore();

  if (!isLoading) return;

  return (
    <div className="fixed bottom-4 right-4 z-10 h-12 w-12 animate-spin rounded-full border-4 border-t-primary" />
  );
}

export default Loader;
