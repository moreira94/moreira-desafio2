import fs1 from "fs";

const fs = fs1.promises;

export default class CartManager {
    constructor() {
        this.cart = [];
        this.PATH = './data/cart.JSON'
        this.id = 0;
      }


  jsonSave = async (arrayAGuardar) => {
    return await fs.writeFile(this.PATH, JSON.stringify(arrayAGuardar), "utf8");
  };

  getCarts = async () => {
    const data = await fs.readFile(this.PATH, "utf8");
    try {
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return [];
    }
  };
}
