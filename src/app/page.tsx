import UploadImage from "./upload-image";
import React from "react";
export default function Page() {
  return (
    <main
      data-testid="main"
      className="flex min-h-screen flex-col items-center justify-center tablet:p-24 bg-background"
    >
      <UploadImage />
      <footer className="flex justify-center items-end w-full h-24 p-3 absolute bottom-0">
        created by{"\u00A0"}
        <a
          href="https://github.com/BlackbirdLabss"
          target="_blank"
        >
          <b>
            Blackbird<span className="text-[#2da1fc]">Labss</span>
          </b>
        </a>
      </footer>
    </main>
  );
}
