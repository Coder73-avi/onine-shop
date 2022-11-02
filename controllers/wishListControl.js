import axios from "controllers/axios";

export const addToWishList = async (newObj) => {
  try {
    const req = await axios.post("/addwishlist", newObj);
    if (req.status == 201 || req.status == 200) {
      return console.log("add successfully");
    }
  } catch (error) {
    return console.error(error.response.data);
  }
};

export const removeFromWishList = async (id) => {
  try {
    const remove = await axios.delete("/deletewishlist/" + id);
    if (remove.status == 200) {
      return console.log("Delete successfully");
    }
  } catch (error) {
    return console.error(error);
  }
};
