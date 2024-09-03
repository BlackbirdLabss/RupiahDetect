export const postImage = async (file: File | null) => {
  if (!file) {
    return;
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
    console.log(response);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to detect money");
  }
};
