import axios from "axios";
/**
 * get the thumbnail of a youtube video
 * @param id Youtube video ID
 */
async function getVideoThumbnail(VIDEO_ID: string) {
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VIDEO_ID}&key=${process.env.YOUTUBE_API_KEY}`
    )
    .then(response => {
      return response.data.items[0].snippet.thumbnails.maxres.url;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export default getVideoThumbnail;
