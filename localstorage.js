// variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table > tbody");
let buscarClienteInput = d.querySelector("#buscarCliente");


// Agregar evento click al botón del formulario
btnGuardar.addEventListener("click", () => {
    let datos = validarFormulario();
    if (datos != null) {
        guardarDatos(datos);
    }
    borrarTabla();
    mostrarDatos();
});

// Función para validar los campos del formulario
function validarFormulario() {
    let datosForm;
    if (clienteInput.value == "" || productoInput.value == "" ||
        precioInput.value == "" || imagenInput.value == "" || observacionInput.value == "") {
        alert("Todos los campos del formulario son obligatorios");
        return;
    } else {
        datosForm = {
            cliente: clienteInput.value,
            producto: productoInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value,
        };

        clienteInput.value = "";
        precioInput.value = "";
        productoInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        return datosForm;
    }
}

const listadopedidos = "Pedidos"; // Nombre del localStorage

function guardarDatos(datos) {
    let pedidos = [];
    let pedidosguardados = JSON.parse(localStorage.getItem(listadopedidos));

    if (pedidosguardados != null) {
        pedidos = pedidosguardados;
    }

    pedidos.push(datos);
    localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
    alert("Datos guardados con exito");
}

// Función para extraer los datos guardados en el localStorage
function mostrarDatos(filtro = "") {
    let pedidos = [];
    let pedidosguardados = JSON.parse(localStorage.getItem(listadopedidos));

    if (pedidosguardados != null) {
        pedidos = pedidosguardados;
    }

    // Filtrar los pedidos por cliente
    if (filtro !== "") {
        pedidos = pedidos.filter(pedido => pedido.cliente.toLowerCase().includes(filtro.toLowerCase()));
    }

    // Función para mostrar los datos en la tabla
function mostrarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("Pedidos")) || [];
    let tabla = document.getElementById("tablaPedidos"); // Asegúrate de que este ID coincida con tu tabla en HTML
    tabla.innerHTML = ""; // Limpiar tabla antes de volver a cargar los datos

    pedidos.forEach((p, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.cliente}</td>
            <td>${p.producto}</td>
            <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(p.precio)}</td>
            <td><img src="${p.imagen}" style="max-width: 100px; height: auto;"></td>
            <td>${p.observacion}</td>
            <td>
                <span class="btn-editar btn btn-warning">✅</span>
                <span class="btn-eliminar btn btn-danger">❎</span>
            </td>
        `;

        // Agregar la fila a la tabla
        tabla.appendChild(fila);

        // Obtener los botones y agregar eventos
        let btnEditar = fila.querySelector(".btn-editar");
        let btnEliminar = fila.querySelector(".btn-eliminar");

        btnEditar.addEventListener("click", () => actualizarPedido(i));
        btnEliminar.addEventListener("click", () => eliminarPedidos(i));
    });
}

 // Mostrar los datos en la tabla
 pedidos.forEach((p, i) => {
    let fila = d.createElement("tr");
    fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${p.cliente}</td>
        <td>${p.producto}</td>
        <td>${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(p.precio)}</td>
        <td><img src="${p.imagen}" style="max-width: 100px; height: auto;"></td>
        <td>${p.observacion}</td>
        <td>
            <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">✅</span>
            <span onclick="eliminarPedidos(${i})" class="btn-eliminar btn btn-danger">❎</span>
        </td>
    `;
    tabla.appendChild(fila);
});
}

// Función para borrar los datos de la tabla
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr");
    filas.forEach((f) => {
        f.remove();
    });
}

// Función para eliminar un pedido
function eliminarPedidos(pos) {
    let pedidos = [];
    let pedidosguardados = JSON.parse(localStorage.getItem(listadopedidos));

    if (pedidosguardados != null) {
        pedidos = pedidosguardados;
    }

    let confirmar = confirm("¿Deseas eliminar el pedido del cliente:  " + pedidos[pos].cliente + "");
    if (confirmar) {
        pedidos.splice(pos, 1);
        alert("Pedido eliminado con exito");
        localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}    

// Función para actualizar un pedido
function actualizarPedido(pos) {
    let pedidos = [];
    let pedidosguardados = JSON.parse(localStorage.getItem(listadopedidos));

    if (pedidosguardados != null) {
        pedidos = pedidosguardados;
    }

    clienteInput.value = pedidos[pos].cliente;
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    imagenInput.value = pedidos[pos].imagen;
    observacionInput.value = pedidos[pos].observacion;

    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");

    btnActualizar.addEventListener("click", function () {
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = productoInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].imagen = imagenInput.value;
        pedidos[pos].observacion = observacionInput.value;

        localStorage.setItem(listadopedidos, JSON.stringify(pedidos));
        alert("El pedido fue actualizado con exito!! ");

        clienteInput.value = "";
        precioInput.value = "";
        productoInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");
        borrarTabla();
        mostrarDatos();
    });
}

// Mostrar los datos de localStorage al recargar la página
d.addEventListener("DOMContentLoaded", function () {

    borrarTabla();
    mostrarDatos();
});

// Evento para exportar a Excel cuando se haga clic en el botón
document.querySelector(".btn-excel").addEventListener("click", exportarAExcel);

// Filtrar clientes al escribir en el campo de búsqueda
buscarClienteInput.addEventListener("input", function () {
    let filtro = buscarClienteInput.value.trim();
    borrarTabla();
    mostrarDatos(filtro);
});


//Generar el pdf
//Usa jsPDF para crear un documento PDF.
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let pedidos = JSON.parse(localStorage.getItem(listadopedidos)) || [];

    doc.setFont("helvetica", "bold");
    doc.text("Lista de Pedidos", 90, 10);

    let inicioY = 20;

    pedidos.forEach((p, i) => {
        doc.setFont("helvetica", "normal");
        doc.text(`Pedido ${i + 1}`, 10, inicioY);
        doc.text(`Cliente: ${p.cliente}`, 10, inicioY + 10);
        doc.text(`Producto: ${p.producto}`, 10, inicioY + 20);
        doc.text(`Precio: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(p.precio)}`, 10, inicioY + 30);
        doc.text(`Observación: ${p.observacion}`, 10, inicioY + 40);
        doc.line(10, inicioY + 45, 200, inicioY + 45); // Línea separadora

        inicioY += 50;

        // Si la página se llena, agregar una nueva página
        if (inicioY > 270) {
            doc.addPage();
            inicioY = 20;
        }
    });

    doc.save("Pedidos.pdf");
}

// Agregar evento al botón
document.querySelector(".btn-pdf").addEventListener("click", generarPDF);

//funcion para exportar a excel
function exportarAExcel() {
    let pedidos = JSON.parse(localStorage.getItem("Pedidos")) || [];

    if (pedidos.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    // Eliminar la propiedad "imagen" de cada pedido antes de exportar
    let pedidosSinImagen = pedidos.map(({ imagen, ...resto }) => resto);

    // Crear hoja de cálculo sin la columna de imágenes
    let ws = XLSX.utils.json_to_sheet(pedidosSinImagen);

    // Crear libro de Excel
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");

    // Guardar archivo Excel
    XLSX.writeFile(wb, "Pedidos.xlsx");
}


document.querySelector(".btn-excel").addEventListener("click", exportarAExcel);
