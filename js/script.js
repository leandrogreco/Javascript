const IVA1=1.21
const IVA2=1.105
let total = 0
let tipoProducto=""

class Producto {
    constructor(modelo,soporte,costoModelo,costoSoporte) {
        this.modelo = modelo.toUpperCase();
        this.soporte  = soporte.toUpperCase();
        this.costoModelo= parseFloat(costoModelo);
        this.costoSoporte= parseFloat(costoSoporte);
    }
}
//Declaramos un array de productos para almacenar objetos
const productos = [];
productos.push(new Producto("FG-40F", "FC-10-0040F-950-02-12","633","443"));
productos.push(new Producto("FG-60F", "FC-10-0060F-950-02-12","888","621"));
productos.push(new Producto("FG-100F", "FC-10-F100F-950-02-12","3568","2497"));

console.log(productos);

do {
    menuUno = prompt("MENU DE COTIZACION\n\n1- HARDWARE\n2- SOFTWARE\n3- MODIFICAR COSTO\n4- SALIR\n\n")
    switch(menuUno) {
        case "1":
            tipoProducto="HARDWARE"
            do {
                menuDos = prompt("MENU DE COTIZACION\n\n1- "+ productos[0].modelo+"\n2- "+ productos[1].modelo+"\n3- "+ productos[2].modelo+"\n4- SALIR\n\n")                
                switch(menuDos) {
                    case "1":
                        infofinal = productos[0];
                        mostrar()
                        break;
                    case "2":
                        infofinal = productos[1];
                        mostrar()
                        break;
                    case "3":
                        infofinal = productos[2];
                        mostrar()
                        break;
                    case "4":
                        infofinal =""
                        break;
                    default:
                        alert ("Ingrese una opcion valida del MENU");
                }
            } while (menuDos!="4");
            break;

        case "2":
            tipoProducto="SOFTWARE"
            do {
                menuTres = prompt("MENU DE COTIZACION\n\n1- "+ productos[0].soporte+"\n2- "+ productos[1].soporte+"\n3- "+ productos[2].soporte+"\n4- SALIR\n\n")                
                switch(menuTres) {
                    case "1":
                        infofinal = productos[0];
                        mostrar()
                        break;
                    case "2":
                        infofinal = productos[1];
                        mostrar()
                        break;
                    case "3":
                        infofinal = productos[2];
                        mostrar()
                        break;
                    case "4":
                        //infofinal =""
                        break;
                    default:
                        alert ("Ingrese una opcion valida del MENU");
                }
            } while (menuTres!="4");
            break;

        case "3":
            do {
                menuCuatro = prompt("MENU DE MODIFICACION\n\n1- "+ productos[0].modelo+"\n2- "+ productos[1].modelo+"\n3- "+ productos[2].modelo+"\n4- "+ productos[0].soporte+"\n5- "+ productos[1].soporte+"\n6- "+ productos[2].soporte+"\n7- SALIR\n\n") 
                switch(menuCuatro) {
                    case "1":
                        tipoProducto="HARDWARE"
                        modifico = productos[0].modelo;
                        modificar(modifico)
                        break;
                    case "2":
                        tipoProducto="HARDWARE"
                        modifico = productos[1].modelo;
                        modificar(modifico)
                        break;
                    case "3":
                        tipoProducto="HARDWARE"
                        modifico = productos[2].modelo;
                        modificar(modifico)
                        break;
                    case "4":
                        tipoProducto="SOFTWARE"
                        modifico = productos[0].soporte;
                        modificar(modifico)
                        break;
                    case "5":
                        tipoProducto="SOFTWARE"
                        modifico = productos[1].soporte;
                        modificar(modifico)
                        break;
                    case "6":
                        tipoProducto="SOFTWARE"
                        modifico = productos[2].soporte;
                        modificar(modifico)
                        break;                    
                    case "7":
                        //modificar =""
                        break;
                    default:
                        alert ("Ingrese una opcion valida del MENU");
                }
            } while (menuCuatro!="7");

            break;
        case "4":
            //alert ("SALIDA");
            break;

        default:
            alert ("Ingrese una opcion valida del MENU");
    }
} while (menuUno !="4");


function modificar(modifico) {
    nuevoCosto = prompt("INGRESE NUEVO COSTO\n\n")
    while(esNumero(nuevoCosto)){
        nuevoCosto = prompt("Por favor, ingrese costo VALIDO!")
    }
    if (tipoProducto=="HARDWARE") {
        const o = productos.find(elemento => 
            elemento.modelo === modifico); 
            o.costoModelo=Number(nuevoCosto);
            console.log(productos);
    }
    else {
        const o = productos.find(elemento => 
            elemento.soporte === modifico); 
            o.costoSoporte=Number(nuevoCosto);
            console.log(productos);
    }
}

function mostrar() {
    if (tipoProducto =="HARDWARE") {
        let valorVenta = (infofinal.costoModelo / 0.8);
        let valorVentaIVA=0;
        valorVentaIVA=(valorVenta*IVA1);
        alert ("El tipo de producto: " + tipoProducto + "\n" +
        "El producto ingresado: "+ infofinal.modelo + "\n" +
        "El costo ingresado: " + infofinal.costoModelo + "\n" +
        "El valor de venta: " + valorVenta + "\n" +
        "El valor + IVA: " + valorVentaIVA + "\n")
    }
    else
    {
        let valorVenta = (infofinal.costoSoporte / 0.8);
        let valorVentaIVA=0;
        valorVentaIVA=(valorVenta*IVA2);
        alert ("El tipo de producto: " + tipoProducto + "\n" +
        "El producto ingresado: "+ infofinal.soporte + "\n" +
        "El costo ingresado: " + infofinal.costoSoporte + "\n" +
        "El valor de venta: " + valorVenta + "\n" +
        "El valor + IVA: " + valorVentaIVA + "\n")
    }
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