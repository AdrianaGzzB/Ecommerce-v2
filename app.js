//Definimos las variables principales
const contenedorProductos = document.getElementById('contenedor-productos')
let carrito = []


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        ActulizarCarrito();
    } 
})

//llenar el contenedor de productos con cada producto del catalogo del stock.js
catalogo.forEach((producto) => {
    //1.    crear un div y pegarle la clase css 
    //2.    crear el contenido del div, toda la info de cada producto 
    //3.    anidar el nuevo elemento al contenedor de productos 
    //4.    crear el boton de cada producto 
    //5.    generar el evento click al boton creado y asociarlo a la funcion agregar carrito   
    // ---------------------------------------------------------------------------------------------------------- 
    const div = document.createElement('div');
    div.classList.add('producto');
    div.insertAdjacentHTML("beforeend", "<img src=" + producto.img + ">");
    div.insertAdjacentHTML("beforeend", "<h3>" + producto.nombre + "</h3>");
    div.insertAdjacentHTML("beforeend", "<p>" + producto.desc + "</p>");
    div.insertAdjacentHTML("beforeend", "<p class='precioProducto'>Precio: $" + producto.precio + "</p>");
    div.insertAdjacentHTML("beforeend", "<button id=agregar" + producto.id + " class='boton-agregar'>Agregar <i class='fas fa-shopping-cart'></i></button>");
    contenedorProductos.appendChild(div);
    const boton = document.getElementById("agregar" + producto.id);
    boton.addEventListener('click', () => {
        AgregarCarrito(producto.id)

    });
});
//crear funcion AgregarCarrito
const AgregarCarrito = (prodid) => {
    const existe = carrito.some(prod => prod.id === prodid) 
    
    if (existe) { 
        carrito.map(prod => { 
            if (prod.id === prodid) {
                prod.cantidad++ 
            }
        })
    } else { 
        const item = catalogo.find((prod) => prod.id === prodid); 
        carrito.push(item); 
    }
    console.log(carrito)
  ActulizarCarrito() 
}

//crear funcion ActualizarCarrito
const ActulizarCarrito= () => {
    //limpiar el contenedor antes de actualizarlo
    //recorrer el arreglo carrrtio
    //  -crear el HTML o los objetos de cada producto
    //  -anidar el elemento creado(HTML) al contenedor carrrito
    //  -actualizar la cantidad del carrito
    // -actualizar el precio total del carrito
    // -guardar en el local storage el contenido del carrito

    const contadorCarrito=document.getElementById('contadorCarrito')
    contadorCarrito.innerText=carrito.length   //cambioandole el valor que esta dentro
    const contenedorCarrito=document.getElementById('carrito-contenedor')
    const precioTotal=carrito.reduce((acc,prod)=>acc+prod.cantidad*prod.precio,0)
    contenedorCarrito.innerHTML='' //estamos limpiando todo el contenido
    carrito.forEach((producto)=>{
        const div=document.createElement('div')
        div.classList.add('productoEnCarrrito')
        div.insertAdjacentHTML("beforeend", "<p>" + producto.nombre + "</p>");
        div.insertAdjacentHTML("beforeend", "<p> " + producto.cantidad + "</p>" );
        div.insertAdjacentHTML("beforeend","<p class='precioProducto'>Precio: $" + producto.precio +"</p>");
        div.insertAdjacentHTML("beforeend", "<button onclick='eliminarDelCarrito(" + producto.id + ")' class='boton-eliminar'><i class='fas fa-trash-alt'></i></button>");
        contenedorCarrito.appendChild(div)
    })
    const div2=document.createElement('div')
    div2.insertAdjacentHTML("beforeend","<p class='precioProducto'>PrecioTotal: $" + precioTotal +"</p>");
    contenedorCarrito.appendChild(div2)
    div2.insertAdjacentHTML("beforeend", "<button onclick='vaciarCarrito()' class='boton-vaciar'>Vaciar Carrito</button>");
    localStorage.setItem('carrito',JSON.stringify(carrito))

}

// Eliminar del carrito
const eliminarDelCarrito=(Id)=>{
    const item=carrito.find((elemento)=> elemento.id===Id)
    const indice=carrito.indexOf(item)
    carrito.splice(indice,1)
    ActulizarCarrito()
}
//vaciar el carrito
const vaciarCarrito=()=>{
    carrito.length=0;
    ActulizarCarrito()
}