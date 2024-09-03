"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { speak } from "../helperFunctions/textToSpeech";
import DragAndDrop from "../components/drag-and-drop";
import { postImage } from "../services/post-image";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleDeleteImage = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.type == "click") {
      setSelectedImage(null);
    }
  };

  const handlePostImage = React.useCallback(async (file: File | null) => {
    try {
      setLoading(true);
      postImage(file);
    } catch (error) {
      console.log("Something error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDetectImage = () => {
    if (selectedImage == null) {
      speak("Image must be uploaded");
    } else {
      speak("Start Detect");

      handlePostImage(selectedImage);
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
    fileList: null,
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
        Upload your money
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
          <div className="relative p-3">
            <Image
              src={previewUrl}
              alt="upload icon"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }} // optional
            />
            <div
              className="flex absolute top-0 right-0 w-8 h-8 justify-center items-center bg-white rounded-full shadow-2xl hover:shadow-md"
              onClick={handleDeleteImage}
              onMouseEnter={() => {
                speak("Delete Image");
              }}
            >
              <span className="text-red text-xs cursor-pointer">X</span>
            </div>
          </div>
        ) : (
          <DragAndDrop handleImageUpload={handleImageUpload} />
        )}
      </div>
      {loading && (
        <div className="mt-5 font-bold text-sm text-[#676767]">
          Uploading...
        </div>
      )}
      <button
        className={`${
          selectedImage == null ? "bg-primary/50" : "bg-primary"
        } text-white mt-8 p-3 rounded-md`}
        onClick={handleDetectImage}
      >
        START DETECT
      </button>
    </div>
  );
}
