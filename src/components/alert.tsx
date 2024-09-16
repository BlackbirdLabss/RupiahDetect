import { useEffect, useState } from "react";

type AlertProps = {
  borderColor: string,
  textColor: string,
  bgColor: string,
  message: string,
};
export const Alert: React.FC<AlertProps> = ({
  borderColor = "red-400",
  textColor = "red-700",
  bgColor = "red-100",
  message = "There is an error ",
}) => {
  return (
    <>
      <div
        className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded relative`}
        role="alert"
      >
        <span className="block sm:inline">
          {message}
        </span>
      </div>
    </>
  );
};
