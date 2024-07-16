"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Wrapper() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const result = fileReader.result;
      if (typeof result === "string") {
        setPreviewUrl(result);
      }
    };
    fileReader.readAsDataURL(selectedImage);
    formData.append("image", selectedImage);
  }, [selectedImage]);

  return (
    <div className="flex flex-col justify-center m-10 p-10 bg-white w-[50%] rounded-lg shadow-sm">
      <div className="text-center text-[#0F0F0F] font-bold text-xl">
        Upload Your Money
      </div>
      <div className="flex justify-center items-center p-8 border-dashed border-2 w-full border-[#384eb7] border-opacity-30 bg-[#f8f8ff] rounded-md mt-8">
        {selectedImage && previewUrl ? (
          <Image
            src={previewUrl}
            alt="upload icon"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }} // optional
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={`/upload-icon.png`}
              alt="upload icon"
              width="100"
              height="59"
            />

            <div className="text-base font-bold mt-6">
              <span className="text-[#0f0f0f]">Drag & drop files or </span>
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
              Format berupa: JPEG, PNG, JPG
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 font-bold text-sm text-[#676767]">Uploading...</div>
      <button className="bg-primary text-white mt-8 p-3 rounded-md">
        START DETECT
      </button>
    </div>
  );
}
