import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

const getImg = async (query, page) => {
  const { data } = await axios.get(
    `search/photos?client_id=OiJXlg_POGkPLgP6qu235zjz5HBEBnqGp_TqAX3K9wE&query=${query}&page=${page}`
  );
  return data;
};

export default getImg;