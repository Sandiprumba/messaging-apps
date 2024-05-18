import moment from "moment";

const fileFormat = (url = "") => {
  const urlWithoutQueryParams = url.split("?")[0];
  const fileExt = urlWithoutQueryParams.split(".").pop();
  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";

  if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif") return "image";
  return "file";
};

const transformImage = (url = "", width = 100) => {
  if (typeof url !== "string") return url;
  //this will automatically change the resolution of the images..
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};
//data for charts
const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  //displays the updated data of the last 7 days
  // for(let i =0; i< 7;i++){
  //   last7Days.unshift(currentDate.format('MMMM D'));
  //   currentDate.subtract(1,'days');
  // }
  // return last7Days

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("dddd");

    last7Days.unshift(dayName);
  }
  return last7Days;
};

//VIDEO CONTINUE FROM 4:50;;;
const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transformImage, getLast7Days, getOrSaveFromStorage };
