import Wrapper from "../components/wrapper";
import React from "react";
export default function Page() {

  return (
    <main data-testid="main" className="flex min-h-screen flex-col items-center justify-center tablet:p-24 bg-background">
        <Wrapper></Wrapper>
    </main>
  );
}
