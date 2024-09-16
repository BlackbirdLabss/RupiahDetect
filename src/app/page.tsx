import Main from "./main";
import React from "react";
export default function Page() {
  return (
    <main
      data-testid="main"
      className="flex min-h-screen flex-col items-center justify-center tablet:p-24 bg-background"
    >
      <Main />
    </main>
  );
}
