
const fetchImageFromUrl = async (url) => {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      return await response.blob();
   } catch (err) {
      window.alert(err.message);
      return null;
   }
};

const getPreviewUrl = (file) => {
   if (!file) return null
   return URL.createObjectURL(file)
}


export { fetchImageFromUrl, getPreviewUrl }