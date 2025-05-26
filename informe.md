### Aplicación de Gestión de Productos
Esta aplicación está diseñada para gestionar productos, permitiendo a los usuarios añadir, ver, editar y eliminar productos. Está estructurada siguiendo un patrón de diseño Modelo-Vista-Controlador (MVC) para una clara separación de responsabilidades.

## Archivos del Proyecto
El proyecto se compone de los siguientes archivos principales:

- Controlador.js
- modelo.js
- style.css

## 1. Controlador.js
Este archivo contiene la clase VistaProductos, que actúa como la Vista de la aplicación. Su función es gestionar la interfaz de usuario (UI), mostrando información y capturando las interacciones del usuario.

### Funciones Clave:

- **constructor()**: Inicializa referencias a todos los elementos HTML necesarios (contenedores, botones, modales, campos de formulario) usando sus IDs o clases.
mostrarProductos(productos): Recibe un array de productos y los renderiza dinámicamente en la interfaz, creando una tarjeta HTML para cada uno.

- **_crearElementoProducto(producto):** Una función auxiliar que genera el HTML para una tarjeta de producto individual, incluyendo nombre, imagen, tienda, día, precio y si está en descuento, junto con botones de acción (Editar, Borrar).

- **mostrarModal(producto = null) / ocultarModal():** Controla la visibilidad del modal usado para añadir o editar productos. Precarga el formulario si se está editando un producto existente.

- **mostrarModalConfirmacion(productoId) /ocultarModalConfirmacion():** Gestiona la visibilidad y los datos del modal de confirmación, utilizado para acciones como eliminar.

- **alternarDetallesProducto(productoId):** Controla la visibilidad de detalles adicionales en una tarjeta de producto.

- **(vincularAgregarProducto, vincularEditarProducto, vincularGuardarProducto):** Estas funciones son fundamentales para conectar los eventos del usuario en la UI con las funciones de manejo de lógica de negocio. Reciben una función manejador (callback) que será ejecutada cuando ocurra un evento (clic, envío de formulario, etc.). Esto permite que la Vista notifique al "Controlador" sobre las acciones del usuario sin manejar la lógica subyacente.

- Relaciones:
HTML: Requiere un archivo HTML con los IDs y clases correspondientes para que pueda manipular los elementos de la UI.

Controlador Principal (no proporcionado aquí): Se espera que un archivo controlador principal (ej. app.js) instancie esta vista y le pase las funciones manejador para procesar las interacciones del usuario, delegando la lógica de negocio y la interacción con el modelo.
style.css: Depende de este archivo para la apariencia visual de todos los elementos que gestiona y crea.
## 2. modelo.js
Este archivo contiene la clase ModeloProductos, que actúa como el Modelo de la aplicación. Es responsable de la gestión y persistencia de los datos de los productos, utilizando localStorage del navegador para el almacenamiento.

### Funciones Clave:

constructor(): Al inicializarse, carga los productos almacenados en localStorage (bajo la clave 'productos'). Si no hay datos, inicializa el array de productos vacío.
this.productos (Variable): El array interno donde se almacenan todos los objetos de producto.
obtenerTodosLosProductos(): Devuelve el array completo de productos.
obtenerProductoPorId(id): Busca y devuelve un producto específico por su ID.
agregarProducto(producto): Añade un nuevo producto al array, generando un ID único para él, y luego lo guarda en localStorage.
actualizarProducto(id, productoActualizado): Modifica un producto existente por su ID con los nuevos datos proporcionados, y luego guarda los cambios en localStorage.
eliminarProducto(id): Elimina un producto del array por su ID y persiste los cambios en localStorage.
_guardarEnLocalStorage(): Una función interna auxiliar que serializa el array this.productos a una cadena JSON y lo guarda en localStorage.
Relaciones:

Controlador Principal (no proporcionado aquí): El controlador principal de la aplicación será el encargado de interactuar con ModeloProductos para realizar las operaciones CRUD (Crear, Leer, Actualizar, Borrar) en los datos de los productos, en respuesta a las acciones del usuario.
localStorage: Utiliza directamente la API localStorage del navegador para asegurar que los datos de los productos se mantengan entre sesiones.

## 3. style.css
Este archivo contiene todas las reglas de CSS que definen la apariencia visual y el diseño de la aplicación. Es la Capa de Presentación.

### Elementos Clave:

Variables CSS (:root): Define una paleta de colores centralizada (ej., --primary para el verde de Falabella, --secondary para gris oscuro, etc.), lo que permite un branding consistente y facilita cambios de estilo futuros.
Estilos Generales: Establece la fuente (Montserrat), márgenes, colores de fondo y texto base para todo el body. El header incluye el logo de Falabella.
Diseño Responsivo de Tarjetas:
#producto-container: Utiliza CSS Grid para organizar las tarjetas de productos de manera responsiva, ajustándose a diferentes tamaños de pantalla.
.producto-card: Estilos para cada tarjeta de producto, incluyendo bordes redondeados, sombras, transiciones y la estructura de su contenido (cabecera, acciones, detalles).
Modales: Define la apariencia de las ventanas emergentes (añadir/editar y confirmación), incluyendo un fondo semitransparente con efecto de desenfoque (backdrop-filter: blur(3px)), estilos para los campos de formulario y la disposición de los botones.
Animaciones: Incluye un @keyframes para una animación fadeIn suave en los modales.
Media Queries (@media): Adapta el diseño de la aplicación para dispositivos móviles o pantallas más pequeñas, ajustando el diseño de la cuadrícula de productos y el encabezado para una mejor experiencia de usuario.
Relaciones:

- **HTML:**  Se aplica a los elementos HTML mediante sus selectores (IDs y clases), dando la apariencia visual a la estructura definida en el HTML.

- **Controlador.js:** Controlador.js manipula las clases CSS (ej. producto-details.active, modal.style.display) para controlar la visibilidad y el estado visual de los elementos, y style.css define cómo se ven esos cambios.

## Estructura General de la Aplicación

- La aplicación sigue el patrón MVC, donde:

La Vista (Controlador.js) es responsable de lo que el usuario ve y con lo que interactúa.
El Modelo (modelo.js) gestiona los datos y su persistencia.
La Presentación (style.css) define la apariencia visual.
Un archivo controlador principal (no proporcionado en este análisis) sería el encargado de conectar la Vista y el Modelo, orquestando el flujo de datos y lógica de negocio.