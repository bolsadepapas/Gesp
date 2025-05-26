class VistaProductos {
    constructor() {
        this.contenedorProductos = document.getElementById('producto-container');
        this.botonAgregarProducto = document.getElementById('add-producto-btn');
        this.modal = document.getElementById('producto-modal');
        this.modalConfirmacion = document.getElementById('confirm-modal');
        this.tituloModal = document.getElementById('modal-name');
        this.formularioProducto = document.getElementById('producto-form');
        this.botonCerrar = document.querySelector('.close-btn');
        this.botonCancelar = document.getElementById('cancel-btn');
        this.botonGuardar = document.getElementById('save-btn');
        this.botonConfirmarCancelar = document.getElementById('confirm-cancel');
        this.botonConfirmarEliminar = document.getElementById('confirm-delete');

        // Campos del formulario
        this.campoIdProducto = document.getElementById('producto-id');
        this.campoNombre = document.getElementById('name');
        this.campoImagen = document.getElementById('image');
        this.campoTienda = document.getElementById('store');
        this.campoDia = document.getElementById('day');
        this.campoPrecio = document.getElementById('price');
        this.campoDescuento = document.getElementById('isInSale');
    }

    // Mostrar todos los productos
    mostrarProductos(productos) {
        this.contenedorProductos.innerHTML = '';
        productos.forEach(producto => {
            const elementoProducto = this._crearElementoProducto(producto);
            this.contenedorProductos.appendChild(elementoProducto);
        });
    }

    // Crear elemento HTML para un producto
    _crearElementoProducto(producto) {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'producto-card';
        tarjetaProducto.dataset.id = producto.id;

        tarjetaProducto.innerHTML = `
            <div class="producto-header">
                <h3 class="producto-name">${producto.name}</h3>
                <div class="producto-actions">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Borrar</button>
                </div>
            </div>
            <div class="producto-details">
                <img src="${producto.image}" alt="${producto.name}" class="producto-image">
                <p class="producto-info"><strong>Tienda:</strong> ${producto.store}</p>
                <p class="producto-info"><strong>Dia:</strong> ${producto.day}</p>
                <p class="producto-info"><strong>Precio:</strong> ${producto.price}</p>
                <p class="producto-info"><strong>Dsct:</strong> ${producto.isInSale ? 'Producto con Descuento' : 'Precio Etiqeuta'}</p>
            </div>
        `;

        return tarjetaProducto;
    }

    // Mostrar modal para añadir/editar producto
    mostrarModal(producto = null) {
        if (producto) {
            this.tituloModal.textContent = 'Editar Producto';
            this.campoIdProducto.value = producto.id;
            this.campoNombre.value = producto.name;
            this.campoImagen.value = producto.image;
            this.campoTienda.value = producto.store;
            this.campoDia.value = producto.day;
            this.campoPrecio.value = producto.price;
            this.campoDescuento.checked = producto.isInSale;
        } else {
            this.tituloModal.textContent = 'Añadir Nuevo Producto';
            this.formularioProducto.reset();
            this.campoIdProducto.value = '';
        }
        this.modal.style.display = 'flex';
    }

    // Ocultar modal
    ocultarModal() {
        this.modal.style.display = 'none';
    }

    // Mostrar modal de confirmación
    mostrarModalConfirmacion(productoId) {
        this.modalConfirmacion.dataset.id = productoId;
        this.modalConfirmacion.style.display = 'flex';
    }

    // Ocultar modal de confirmación
    ocultarModalConfirmacion() {
        this.modalConfirmacion.style.display = 'none';
    }

    // Alternar visibilidad de los detalles del producto
    alternarDetallesProducto(productoId) {
        const tarjetaProducto = document.querySelector(`.producto-card[data-id="${productoId}"]`);
        if (tarjetaProducto) {
            const detalles = tarjetaProducto.querySelector('.producto-details');
            detalles.classList.toggle('active');
        }
    }

    // Vincular eventos
    vincularAgregarProducto(manejador) {
        this.botonAgregarProducto.addEventListener('click', manejador);
    }

    vincularAlternarDetalles(manejador) {
        this.contenedorProductos.addEventListener('click', evento => {
            if (evento.target.classList.contains('producto-name')) {
                const tarjetaProducto = evento.target.closest('.producto-card');
                manejador(tarjetaProducto.dataset.id);
            }
        });
    }

    vincularEditarProducto(manejador) {
        this.contenedorProductos.addEventListener('click', evento => {
            if (evento.target.classList.contains('edit-btn')) {
                const tarjetaProducto = evento.target.closest('.producto-card');
                manejador(tarjetaProducto.dataset.id);
            }
        });
    }

    vincularEliminarProducto(manejador) {
        this.contenedorProductos.addEventListener('click', evento => {
            if (evento.target.classList.contains('delete-btn')) {
                const tarjetaProducto = evento.target.closest('.producto-card');
                this.mostrarModalConfirmacion(tarjetaProducto.dataset.id);
            }
        });

        this.botonConfirmarEliminar.addEventListener('click', () => {
            manejador(this.modalConfirmacion.dataset.id);
            this.ocultarModalConfirmacion();
        });
    }

    vincularGuardarProducto(manejador) {
        this.formularioProducto.addEventListener('submit', evento => {
            evento.preventDefault();
            const datosProducto = {
                name: this.campoNombre.value,
                image: this.campoImagen.value,
                store: this.campoTienda.value,
                day: parseInt(this.campoDia.value),
                price: this.campoPrecio.value,
                isInSale: this.campoDescuento.checked
            };
            
            const id = this.campoIdProducto.value;
            manejador(id, datosProducto);
            this.ocultarModal();
        });
    }

    vincularCancelarModal(manejador) {
        this.botonCerrar.addEventListener('click', manejador);
        this.botonCancelar.addEventListener('click', manejador);
        this.botonConfirmarCancelar.addEventListener('click', manejador);
    }
}