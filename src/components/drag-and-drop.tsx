import Image from "next/image";
import React from "react";

const defaultImage = "/upload-icon.png";

function DragAndDrop({
  handleImageUpload,
}: {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={defaultImage}
          alt="upload icon"
          width="100"
          height="59"
        />

        <div className="text-base font-bold mt-6">
          <span className="text-[#0f0f0f]">Drag & Drop File or </span>
          <div className="relative inline-block">
            <span className="text-primary underline relative">Browse</span>
            <input
              className="absolute top-0 left-0 opacity-0 w-full h-full"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="text-xs text-[#676767]">
        The formats are: JPEG, PNG, JPG
        </div>
      </div>
    </>
  );
}

export default DragAndDrop;
