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

export const removeItemFromCart = async (id, qty = 1) => {
  try {
    let remove;
    if (qty == 1) remove = await axios.delete("/deletecheckout/" + id);

    if (qty !== 1)
      remove = await axios.patch("/updatecheckout/" + id, { qty: qty - 1 });

    if (remove.status == 200) {
      return console.log("Removed Successfully");
      return;
    }
  } catch (error) {
    return console.error(error);
  }
};
