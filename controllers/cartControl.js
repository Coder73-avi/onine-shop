import axios from "controllers/axios";

export const addToCart = async (newObj) => {
  try {
    const req = await axios.post("/addcheckout", newObj);
    if (req.status == 201 || req.status == 200) {
      return console.log("add successfully");
    }
  } catch (error) {
    // return console.error(error);
  }
};

export const removeItemFromCart = async (id) => {
  try {
    const remove = await axios.delete("/deletecheckout/" + id);
    if (remove.status == 200) {
      return console.log("Delete successfully");
    }
  } catch (error) {
    return console.error(error);
  }
};
