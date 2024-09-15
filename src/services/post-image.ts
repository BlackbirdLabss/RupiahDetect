import { useState } from "react";

export const postImage = async (
  file: File | null,
  setLoading: (loading: boolean) => void // Accept a callback for loading state
) => {
  if (!file) {
    return null; // Explicitly return null if no file is provided
  }

  const formData = new FormData();
  formData.append("image", file);

  setLoading(true); // Set loading to true before starting the upload

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    console.log(data);
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to detect money");
  } finally {
    setLoading(false); // Set loading to false after the upload completes
  }
};
