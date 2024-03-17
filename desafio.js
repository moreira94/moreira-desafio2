class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  /**
   *
   * @param {String} title
   * @param {String} description
   * @param {Number} price
   * @param {String} thumbnail
   * @param {String} code
   * @param {Number} stock
   */

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("Asegurate de incluir todas las propiedades en el objeto!");
    } 
    if (this.products.some(product => product.code === code)) {
         return console.log("Este código de producto ya existe");
    }
      this.id++;
      let nuevoProducto = { title, description, price, thumbnail, code, stock, id:this.id };
      this.products.push(nuevoProducto);
      console.log(nuevoProducto);
    
  }

  async getProducts() {
    return console.log(this.products);
  }

  async getProductsById(id) {
    if (this.products.find((producto) => producto.id === id)) {
        let productoBuscado = this.products.filter((producto) => producto.id === id)
      return console.log(productoBuscado);
    } else console.log(`El id: ${id} no es válido`);
  }
}

let productManager = new ProductManager();
productManager.addProduct(
  "Toalla",
  "Sirve para secarse",
  20,
  "Ruta de Img",
  "H2B1",
  10
);
productManager.addProduct("Toalla de manos", 20, "Ruta de Img", "H2B1", 10);
productManager.addProduct(
    "Mesa",
    "Sirve para Comer",
    100,
    "Ruta de Img",
    "H4F1",
    80
  );
productManager.getProducts();
productManager.addProduct(
    "Mesa",
    "Sirve para Comer",
    100,
    "Ruta de Img",
    "H4F1",
    80
  );
productManager.getProductsById(2);
productManager.getProductsById(3);
