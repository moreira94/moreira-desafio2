import fs1 from 'fs'

const fs=fs1.promises

export default class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.PATH = './data/products.JSON'
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

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      let fileExists = await fs.stat(this.PATH);
      if (!fileExists) {
        await fs.writeFile(this.PATH, JSON.stringify([]));
      }
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return await console.log("Asegurate de incluir todas las propiedades en el objeto!");
    } 
    if (this.products.some(product => product.code === code)) {
      return await console.log("Este código de producto ya existe");
    }
      this.id++;
      let nuevoProducto = { title, description, price, thumbnail, code, stock, id:this.id };
      this.products.push(nuevoProducto);
      await fs.writeFile('./products.JSON', JSON.stringify(this.products), 'utf-8' )
      console.log("Se agrego el siguiente producto: ", nuevoProducto);
    }
      catch (error) {
        console.log(error);
      }
      
    
  };

  getProducts = async () => {
    let data = await fs.readFile(this.PATH, "utf8");
    try {
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      return [];
    }
  };

  async getProductsById(id) {
    const data = await fs.readFile(this.PATH, 'utf-8');
    const products = JSON.parse(data);
    if (products.some((product) => product.id === id)) {
      const productoBuscado = products.find((product) => product.id === id);
      return console.log(`Aqui está el producto buscado con el id ${id}: `, productoBuscado);
    } else {
      console.log(`El id ${id} no es válido`);
    }
  };


  async deleteProduct(id) {
    let arraydeproductos = JSON.parse(await fs.readFile(this.PATH, 'utf-8'));
    if (arraydeproductos.find((producto) => producto.id === id)) {
      let nuevoArray = arraydeproductos.filter((producto) => producto.id != id);
      this.products = nuevoArray;
      console.log(`El producto con id ${id} ha sido eliminado`);
      await fs.writeFile(this.PATH, JSON.stringify(nuevoArray), 'utf-8')
    }
  }
  updateProduct = async ({id, ...producto }) => {
    await this.deleteProduct(id);
    let arrayProductos = await this.getProducts() ;
    let arrayModificado = [{id, ...producto}, ...arrayProductos];
    await fs.writeFile(this.PATH, JSON.stringify(arrayModificado, null, "\t"))
  };
}

  // let productManager = new ProductManager();

//   await productManager.addProduct(
//     "Toalla",
//     "Sirve para secarse",
//     20,
//     "Ruta de Img",
//     "H2B1",
//     10
//   );
//   await productManager.addProduct("Toalla de manos", 20, "Ruta de Img", "H2B1", 10);
//   await productManager.addProduct(
//     "Mesa",
//     "Sirve para Comer",
//     100,
//     "Ruta de Img",
//     "H4F1",
//     80
//   );
//   console.log(await productManager.getProducts());
//   await productManager.addProduct(
//     "Mesa",
//     "Sirve para Comer",
//     100,
//     "Ruta de Img",
//     "H4F1",
//     "80"
//   );
//   await productManager.getProductsById(2);
//   await productManager.getProductsById(3);
//   await productManager.deleteProduct(2);
//   console.log(await productManager.getProducts());
//   await productManager.addProduct(
//     "Mesa",
//     "Sirve para Comer",
//     100,
//     "Ruta de Img",
//     "H4F1",
//     80
//   );
//   await productManager.updateProduct({
//     id:1,
//     title: "mesa",
//     description: "Donde apoyar los platos y vasos",
//     price: 3000,
//     thumbnail: "No disponible",
//     code: "H300",
//     stock: 22,
// });
// console.log(await productManager.getProducts());

// })();
