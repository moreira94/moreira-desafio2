
const socket = io();

const inputDelete = document.getElementById("delete");
const inputAdd = document.getElementById("");

inputDelete.addEventListener("keyup", (event) => { });


botonAgregar.addEventListener('keyup', event => {
    if(event.key === 'click'){
        let iDGenerator = products.at(-1).id;
        this.id = iDGenerator + 1;
        let productoNuevo = {
            title: document.getElementById("title").value,
            price: document.getElementById("price").value,
            code: document.getElementById("code").value,
            stock: document.getElementById("stock").value,
            description: document.getElementById("description").value,
            thumbnail: "",
            id: this.id,
        };
        const arrayModificado = [...products, nuevoProducto];
        this.jsonSave(arrayModificado);
        console.log("Se agrego el siguiente producto: ", nuevoProducto);

    }
})


// socket.emit('message', 'data en forma de string');

// socket.on('socket_individual', data => {
//     console.log(data);
// });

// socket.on('para_todos_menos_el_actual', data => {
//     console.log(data);
// });

// socket.on('eventos_para_todos', data => {
//     console.log(data);
// });
