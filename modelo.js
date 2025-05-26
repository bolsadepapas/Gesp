class ModeloProductos {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
    }

    // Obtener todas los productos
    obtenerTodosLosProductos() {
        return this.productos;
    }

    // Obtener un producto por ID
    obtenerProductoPorId(id) {
        return this.productos.find(producto => producto.id === id);
    }

    // Añadir un nuevo producto
    agregarProducto(producto) {
        const nuevoProducto = {
            id: Date.now().toString(),
            ...producto
        };
        this.productos.push(nuevoProducto);
        this._guardarEnLocalStorage();
        return nuevoProducto;
    }

    // Actualizar un producto existente
    actualizarProducto(id, productoActualizado) {
        const indice = this.productos.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            this.productos[indice] = { ...this.productos[indice], ...productoActualizado };
            this._guardarEnLocalStorage();
            return true;
        }
        return false;
    }

    // Eliminar un producto
    eliminarProducto(id) {
        const indice = this.productos.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            this.productos.splice(indice, 1);
            this._guardarEnLocalStorage();
            return true;
        }
        return false;
    }

    // Guardar en localStorage
    _guardarEnLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }
}