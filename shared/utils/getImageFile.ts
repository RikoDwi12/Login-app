export const getFileImage = (url?: string) => {
  if (!url) throw new Error("No url provided");
  return fetch(`/api?image=${url}`)
    .then(res => res.blob())
    .then(blob => {
      const name = url.split("/").pop();
      return new File([blob], name as string);
    })
    .catch(err => {
      throw err;
    });
};
