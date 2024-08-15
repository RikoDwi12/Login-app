import { useApi } from "./useApi";

const useImage = (image: File) => {
  const fd = new FormData();
  fd.append("image", image);

  const { action: uploadImage, isLoading: isLoadingUploadImage } = useApi({
    url: "/upload-image",
    data: fd,
  });

  return {
    uploadImage,
    isLoadingUploadImage,
  };
};

export default useImage;
