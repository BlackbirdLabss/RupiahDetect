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

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: action.fileList };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: File,
  });

  //handle drag & drop
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const allowedExtension = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
    ];
    let files = event.dataTransfer.files;

    if (allowedExtension.indexOf(files[0].type) > -1) {
      if (files && files.length == 1) {
        setSelectedImage(files[0]);
        dispatch({ type: "ADD_FILE_TO_LIST", fileList: files });
        dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
      } else if (files.length > 1) {
        console.log("Only one image allowed");
      }
    } else {
      console.log("Only format image allowed");
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
    <div className="flex flex-col justify-center m-10 p-10 bg-white w-full tablet:w-1/2 rounded-lg shadow-sm">
      <div className="text-center text-[#0F0F0F] font-bold text-xl">
        Upload Your Money
      </div>
      <div
        className={`${
          data.inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
        } "flex justify-center items-center p-8 border-dashed border-2 w-full border-[#384eb7] border-opacity-30 bg-[#f8f8ff] rounded-md mt-8`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {selectedImage && previewUrl ? (
          <div className="relative p-2">
            <Image
              src={previewUrl}
              alt="upload icon"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
            />
            <circle className="flex absolute top-0 right-0 w-6 h-6 justify-center items-center bg-white rounded-full shadow-lg">
              <span className="text-red text-xs">X</span>
            </circle>
          </div>
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
