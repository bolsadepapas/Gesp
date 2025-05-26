class ControladorProductos {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

        // Vincular eventos
        this.vista.vincularAgregarProducto(this.manejarAgregarProducto);
        this.vista.vincularAlternarDetalles(this.manejarAlternarDetalles);
        this.vista.vincularEditarProducto(this.manejarEditarProducto);
        this.vista.vincularEliminarProducto(this.manejarEliminarProducto);
        this.vista.vincularGuardarProducto(this.manejarGuardarProducto);
        this.vista.vincularCancelarModal(this.manejarCancelarModal);

        // Mostrar Producto iniciales
        this.mostrarProductos();
    }

    // Mostrar todos los Producto
    mostrarProductos = () => {
        const productos = this.modelo.obtenerTodosLosProductos();
        this.vista.mostrarProductos(productos);
    }

    // Manejar añadir nuevo Producto
    manejarAgregarProducto = () => {
        this.vista.mostrarModal();
    }

    // Manejar mostrar/ocultar detalles
    manejarAlternarDetalles = (id) => {
        this.vista.alternarDetallesProducto(id);
    }

    // Manejar editar Producto
    manejarEditarProducto = (id) => {
        const producto = this.modelo.obtenerProductoPorId(id);
        if (producto) {
            this.vista.mostrarModal(producto);
        }
    }

    // Manejar eliminar Producto
    manejarEliminarProducto = (id) => {
        const exito = this.modelo.eliminarProducto(id);
        if (exito) {
            this.mostrarProductos();
        }
    }

    // Manejar guardar Producto
    manejarGuardarProducto = (id, datosProducto) => {
        if (id) {
            // Actualizar Producto existente
            this.modelo.actualizarProducto(id, datosProducto);
        } else {
            // Añadir nuevo Producto
            this.modelo.agregarProducto(datosProducto);
        }
        this.mostrarProductos();
    }

    // Manejar cancelar modal
    manejarCancelarModal = () => {
        this.vista.ocultarModal();
        this.vista.ocultarModalConfirmacion();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const modelo = new ModeloProductos();
    const vista = new VistaProductos();
    new ControladorProductos(modelo, vista);
});