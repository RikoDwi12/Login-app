import imageCompression from "browser-image-compression";

async function compressImage(imageFile: File) {
  try {
    return await imageCompression(imageFile, {
      maxSizeMB: 1,
      fileType: "image/webp",
      initialQuality: 0.8,
      alwaysKeepResolution: true,
      maxWidthOrHeight: 1920,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default compressImage;
