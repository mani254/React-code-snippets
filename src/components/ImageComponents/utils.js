
const fetchImageFromUrl = async (url) => {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error("Image Can't be fetched");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
         throw new Error("Response is not an image");
      }

      return await response.blob();
   } catch (err) {
      throw new Error("Image Can't be fetched")
   }
};

const getPreviewUrl = (file) => {
   if (!file) return null
   return URL.createObjectURL(file)
}


export { fetchImageFromUrl, getPreviewUrl }