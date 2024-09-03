export const postImage = async (file: File | null) => {
  if (!file) {
    return null; // Explicitly return null if no file is provided
  }

  const formData = new FormData();
  formData.append("image", file);

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
    console.log(data)
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to detect money");
  }
};
