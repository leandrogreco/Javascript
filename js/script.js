const IVA1=1.21
const IVA2=1.105
let total = 0
let tipoProducto=""
let ingresaProducto=""
let ingresaCosto=""

do {
    opcionMenu = prompt("MENU DE COTIZACION\n\n1- HARDWARE\n2- SOFTWARE\n3- SALIR\n\n")
    switch(opcionMenu) {
        case "1":
            tipoProducto="HARDWARE"
            //Ingresa Producto
            ingresaProducto = prompt("Ingresar nombre del " + tipoProducto);
            while(esSoloTexto(ingresaProducto)){
                ingresaProducto = prompt("Por favor, ingrese un PRODUCTO valido")
            }
            //Ingresa Costo
            ingresaCosto = prompt("Ingresar costo del "+ tipoProducto);
            while(esNumero(ingresaCosto)){
                ingresaCosto = prompt("Por favor, ingrese un COSTO valido")
            }
            mostrar()
            break;
        case "2":
            tipoProducto="SOFTWARE"
            //Ingresa Producto
            ingresaProducto = prompt("Ingresar nombre del " + tipoProducto);
            while(esSoloTexto(ingresaProducto)){
                ingresaProducto = prompt("Por favor, ingrese un PRODUCTO valido")
            }
            //Ingresa Costo
            ingresaCosto = prompt("Ingresar costo del "+ tipoProducto);
            while(esNumero(ingresaCosto)){
                ingresaCosto = prompt("Por favor, ingrese COSTO valido")
            }
            mostrar()
            break;
        case "3":
            //alert ("SOY 3");
            break;
        default:
            alert ("Ingrese una opcion valida del MENU");
    }
} while (opcionMenu !=3);

function esSoloTexto(texto) {
    if (texto =="") {
        return true
    }
    return false
}

function esNumero(costo) {
    if (isNaN(costo)) {
        //alert ("NO soy un numero");
        return true
    }
    else
    {
        if (costo =="") {
            //alert ("NO soy un numero");
            return true
        }
        else
        {
            //alert ("Soy un numero");
            return false
        }
    }
}

function mostrar() {
    let valorVenta = (ingresaCosto / 0.8);
    let valorVentaIVA=0;
    if (tipoProducto =="HARDWARE") {
        valorVentaIVA=(valorVenta*IVA1);
    }
    else
    {
        valorVentaIVA=(valorVenta*IVA2);
    }
    alert ("El tipo de producto: " + tipoProducto + "\n" +
    "El producto ingresado: "+ ingresaProducto + "\n" +
    "El costo ingresado: " + ingresaCosto + "\n" +
    "El valor de venta: " + valorVenta + "\n" +
    "El valor + IVA: " + valorVentaIVA + "\n")
}