const IVA=1.21
let total = 0
let tipoProducto=""
let lsLargo = 0;
let controlrz = 0;
let controlap = 0;
let controln = 0;
let controle = 0;
let controlfinalizar = true;

class Producto {
    constructor(skuItem,skuCosto,skuDescripcion) {
        this.skuItem = skuItem.toUpperCase();
        this.skuCosto= parseFloat(skuCosto);
        this.skuDescripcion= (skuDescripcion);
    }
}
//Declaramos un array de productos para almacenar objetos
const productos = [];
productos.push(new Producto("FG-40F","633","Fortigate 40F"));
productos.push(new Producto("FG-60F","888","Fortigate 60F"));
productos.push(new Producto("FG-100F","3568","Fortigate 100F"));
productos.push(new Producto("FC-10-0040F-950-02-12","443","Soporte UTP para Fortigate 40F"));
productos.push(new Producto("FC-10-0060F-950-02-12","621","Soporte UTP para Fortigate 60F"));
productos.push(new Producto("FC-10-F100F-950-02-12","2497","Soporte UTP para Fortigate 100F"));

let razonSocial = document.getElementById("formRazonSocial");
let apellido = document.getElementById("formApellido");
let nombre = document.getElementById("formNombre");
let email = document.getElementById("formEmail");
let sku = document.getElementById("formSku");
let cantidad = document.getElementById("formCantidad");

//fetch con ruta relativa
const getDatos = async () => {
    const resp = await fetch("js/data.json")
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        return resp
}
const prodFortinet = getDatos()
console.log(prodFortinet)

//JSON Queres cotizar con los datos del ultimo que cotizo?
if (localStorage.getItem('datoscliente')){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })

        swalWithBootstrapButtons
        .fire({
            title: 'Datos de usuario almacenados',
            text: "¿Desea cotizar con los mismos datos de la ultima cotizacion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, por favor!',
            cancelButtonText: 'No, gracias!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Excelente!',
                    'Ya puede cotizar con esos datos de usuario',
                    'success'
                )
                let usuario = JSON.parse(localStorage.getItem("datoscliente"));
                document.getElementById("formRazonSocial").value = usuario.rSocial;
                document.getElementById("formApellido").value = usuario.apellido;
                document.getElementById("formNombre").value = usuario.nombre;
                document.getElementById("formEmail").value = usuario.email;
                controlrz=1;
                controlap=1;
                controln=1;
                controle=1;
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Excelente',
                    'Ya puede continuar ingresando nuevos datos',
                    'success'
                )
                localStorage.removeItem('datoscliente');
            }
        })
    }

//Control de campos de ingreso
document.getElementById("formRazonSocial").onchange = function() {myFunctionRazon()};
function myFunctionRazon() {
    if (razonSocial.value == null || razonSocial.value.length == 0 || /^\s+$/.test(razonSocial.value)){
        Swal.fire('Ingrese una RAZON SOCIAL valida');
        razonSocial.value=""
        controlrz=0;
    }
    else {
        controlrz=1;
    }
}
document.getElementById("formApellido").onchange = function() {myFunctionApellido()};
function myFunctionApellido() {
    if (apellido.value == null || apellido.value.length == 0 || /^\s+$/.test(apellido.value)){
        Swal.fire('Ingrese una APELLIDO valido');
        apellido.value=""
        controlap=0;
    }
    else {
        controlap=1;
    }
}
document.getElementById("formNombre").onchange = function() {myFunctionNombre()};
function myFunctionNombre() {
    if (nombre.value == null || nombre.value.length == 0 || /^\s+$/.test(nombre.value)){
        Swal.fire('Ingrese una NOMBRE valido');
        nombre.value=""
        controln=0;
    }
    else {
        controln=1;
    }
}
document.getElementById("formEmail").onchange = function() {myFunctionEmail()};
function myFunctionEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value)){
        controle=1;
    }
    else {
        Swal.fire('Ingrese una EMAIL Valido');
        email.value=""
        controle=0;
    }
}

//Eventos del boton agregar
function botonAgregar () {
    if (cantidad.value<1){
        Swal.fire('Ingrese una CANTIDAD Valida');
        return; 
}
    if (controlrz==0 || controlap==0 || controln==0 || controle==0 || sku.value == "-- Seleccionar --"){
        Swal.fire('Complete todos los datos');
        return;
    }

    let usuario = {rSocial:razonSocial.value, apellido:apellido.value, nombre:nombre.value , email:email.value};
    const enJSON = JSON.stringify(usuario);
    localStorage.setItem("datoscliente", enJSON);

    function buscosku(elemento) {
        return elemento.skuItem === sku.value;
    }

    temporal=productos.find(buscosku);
    //console.log(temporal);
    let datos = document.getElementById("tablaIngreso");
    let subtotal = Number (cantidad.value) * Number (temporal.skuCosto);
    datos.innerHTML = datos.innerHTML + "<tr>" +
                                            "<td>"+temporal.skuItem+"</td>"+
                                            "<td>"+cantidad.value+"</td>"+
                                            "<td>"+temporal.skuDescripcion+"</td>"+
                                            "<td>"+temporal.skuCosto+"</td>"+
                                            "<td name='subtotal'>"+subtotal+"</td>"+
                                            "<td> <button onclick='eliminar(this)'>Eliminar</button></td>"+
                                            "</tr>";
    calcularTotal();
}

function botonFinalizar () {
    if (controlfinalizar){        
        Swal.fire('Ingrese algun producto a la cotizacion antes de enviar');
        return;
    }
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cotizacion enviada',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout (callback, 2000);
    function callback ( ) {
        document.location.reload(true);
    }
}

//funcion para eliminar una linea con el boton
function eliminar(linea) {
    //console.log(linea.parentElement.parentElement);
    linea.parentElement.parentElement.remove();
    calcularTotal();
}

//funcion para de calcular totales
function calcularTotal() {
    let subtotales = document.getElementsByName("subtotal");
    let total = document.getElementById("tablaTotalsinIVA");
    let totalConIVA = document.getElementById("tablaTotalconIVA");

    let suma = 0;

    for (let i = 0; i < subtotales.length; i++) {
        suma = suma  + Number(subtotales[i].innerText);
    }
    total.innerText = "$ " + suma.toFixed(2);
    let masIva = suma*1.21;
    totalConIVA.innerText = "$ " + masIva.toFixed(2);

    if (suma>0){        
        controlfinalizar = false;}
    else {
        controlfinalizar = true;
    }
}