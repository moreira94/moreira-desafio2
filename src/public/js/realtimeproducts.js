
const socket = io();

const formAgregar = document.getElementById('agregarForm');

formAgregar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        title : document.getElementById('title').value,
        price : parseInt(document.getElementById('price').value),
        code : document.getElementById('code').value,
        stock : parseInt(document.getElementById('stock').value),
        description : document.getElementById('description').value,
        // category : "1",
        thumbnail : "none"
    };
    console.log(data);

    socket.emit('addProduct', data);
    formAgregar.reset();
});

const inputId = document.getElementById('id');

document.getElementById('delete').addEventListener('click', () => {
    const id = parseInt(inputId.value);

    if (!id) {
        alert("Ingrese el id del producto a eliminar");
        return;
    }

    socket.emit('deleteProduct', id);

    inputId.value = '';
});
