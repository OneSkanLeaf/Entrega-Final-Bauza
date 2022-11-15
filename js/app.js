// -----DECLARACIÓN DE VARIABLES GLOBALES-----
const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
const $form = document.getElementById("formulario");
let name;
let email;
let phone;
let message;
let btnEnviar = document.getElementById("btnEnviar");
let carrito = {};

// ----------USO DE SWEET ALERT----------
// Ventana de alerta que aparece ni bien refresca la página
(async () => {
  const { value: name } = await Swal.fire({
    title: "WELCOME!",
    text: "What's your name?",
    icon: "question",
    confirmButtonText: "Done!",
    footer: '<span class="rojo">This is totally optional 😀</span>',
    width: "50%",
    padding: "1rem",
    background: "#ece5de",
    backdrop: true,
    position: "center",
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: false,
    input: "text",
    inputPlaceholder: "Enter your name",
    inputValue: "",
    customClass: {
      title: "swal-header",
      confirmButton: "swal-confirm",
      cancelButton: "swal-cancel",
      footer: "swal-footer",
      icon: "icon-question",
    },
    showConfirmButton: true,
    confirmButtonAriaLabel: "Done",
    showCancelButton: false,

    buttonsStyling: false,
    showCloseButton: true,
    closeButtonAriaLabel: "Close alert",
  });
  // Operador ternario 1
  name ? Swal.fire({ title: `Nice to meet you, ${name}!` }) : null;
})();

// Ventana de alerta que aparece cuando el usuario haya dado click en "buy" para finalizar la compra
const alertComprar = () => {
  Swal.fire({
    title: "Successful purchase.",
    text: "Thanks for choosing me 🤗",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#513e2e",
    confirmButtonText: "Wonderful!",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    stopKeydownPropagation: false,
  });
};

// ----------USO DE TOASTIFY----------
// Cartel que aparece cuando se haga click en el botón de "add to cart"
const agregarToast = () => {
  Toastify({
    text: "A new product has been added to your cart",
    duration: 3000,
    newWindow: false,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#000",
      color: "#fff",
    },
  }).showToast();
};
// Carte que aparece cuando se haga click en el signo más (+) dentro del carrito
const nuevoItemToast = () => {
  Toastify({
    text: "You have added a new item of this product",
    duration: 3000,
    newWindow: false,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#000",
      color: "#fff",
    },
  }).showToast();
};
// Cartel que aparece cuando se haga click en el signo menos (-) dentro del carrito
const eliminarToast = () => {
  Toastify({
    text: "One product was removed from your cart",
    duration: 3000,
    newWindow: false,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#f70202",
      color: "#FFF",
    },
  }).showToast();
};
// Carte que aparece cuando se haga click en el botón de "empty cart"
const eliminarTodo = () => {
  Toastify({
    text: "You have removed all products from the cart",
    duration: 3000,
    newWindow: false,
    close: true,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "#f70202",
      color: "#FFF",
    },
  }).showToast();
};

// ----------RELOJ DIGITAL----------
// Arrow function para crear una instancia del objeto Date(), y luego crear variables para obtener las horas, los minutos y los segundos de ese objeto.
// Luego, creo una variable time para concatenar la info de las tres variables anteriores
// Después paso la hora a formato de 12 horas
// Si la hora es menos de 10, le agrego un cero adelante
// Luego, mediante el DOM, muestro el reloj dentro del div con el ID de clock
// Finalmente, utilizo el setTimeout para que cada un segundo se llame a la función clock(), que es la que muestra el reloj en pantalla
let clock = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  // Operador ternario 2
  let ampm = hours >= 12 ? "PM" : "AM";
  // Operador ternario 3
  hours = hours < 10 ? `0${hours}` : hours;
  // Operador ternario 4
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  // Operador ternario 5
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  let time = `${hours}: ${minutes}: ${seconds}: ${ampm}`;
  const clockContainer = document.getElementById("clock");
  clockContainer.innerHTML = `<h2> Your time </h2>`;
  // Container del reloj
  const clockDiv = document.createElement("div");
  clockDiv.classList.add("clock-div");
  clockDiv.innerHTML = time;
  // Container del h2 + reloj
  clockContainer.appendChild(clockDiv);

  setTimeout(() => {
    clock();
  }, 1000);
};
clock();

//----------LOCAL STORAGE Y FETCH FORMULARIO----------
$form.addEventListener("submit", handleSubmit);
// Función asíncrona que es pasada como parámetro de un evento
async function handleSubmit(event) {
  event.preventDefault();
  // Guardo los valores del formulario en el localStorage
  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  phone = document.getElementById("phone").value;
  message = document.getElementById("message").value;
  localStorage.setItem("user name", name);
  localStorage.setItem("user email", email);
  localStorage.setItem("user phone", phone);
  localStorage.setItem("user message", message);
  // Ejemplo 1 de fetch()
  const form = new FormData($form);
  const response = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
      Accept: "application/json",
    },
  });
  if (response.ok) {
    this.reset();
    // Ventana de alerta que se va a disparar cuando el usuario haga click en enviar el formulario
    Swal.fire({
      title: "Wonderful!",
      text: "Message sent succesfully",
      icon: "success",
      confirmButtonText: "Great",
      timerProgressBar: true,
      toast: true,
      position: "bottom-end",
      allowOutsideClick: true,
      allowEscapeKey: true,
      allowEnterKey: true,
      stopKeydownPropagation: false,
    });
  }
}

// -----CARRITO DE COMPRAS -----
// Eventos
// Evento que se va a disparar cuando se hayan leído todos los elementos del documento HTML
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  // Si existe algo en el localStorage, en carrito llenamos con esa info que viene del localStorage
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

// Evento para aumentar y disminuir la cantidad de productos seleccionados
items.addEventListener("click", (e) => {
  btnAccion(e);
});

// Ejemplo 2 de fetch()
// Fetch para capturar los datos del archivo.json
const fetchData = async () => {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  }
};

// Pintar productos en el navegador
const pintarCards = (data) => {
  data.forEach((producto) => {
    // Con esto modifico el elemento h5, que lleva el título del producto
    templateCard.querySelector("h5").textContent = producto.title;
    // Con esto modifico el primer elemento p, que contiene la descripción del curso
    templateCard.querySelectorAll("p")[0].textContent = producto.description;
    // Con esto modifico al segundo elemento p, que contiene el precio del curso
    templateCard.querySelectorAll("p")[1].textContent = producto.price;
    // Con esto modifico a la imágen y le agrego el atributo src, con la ruta que esta en el archivo.json
    templateCard.querySelector("img").setAttribute("src", producto.image);
    // Con esto modifico al botón de comprar, y le pongo el ID que le corresponde a cada curso
    templateCard.querySelector("button").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

// Agregar productos al carrito
const addCarrito = (e) => {
  // Con esto chequeo si el evento se dispara de un botón con la clase btn
  if (e.target.classList.contains("btn")) {
    setCarrito(e.target.parentElement);
    agregarToast();
  }
  // Con esto detengo cualquier otro evento que se genere en el evento items, en este caso(ya que sino se heredan los eventos del contenedor padre)
  e.stopPropagation();
};

// Modificar el carrito
const setCarrito = (objeto) => {
  // console.log(objeto);
  const producto = {
    id: objeto.querySelector("button").dataset.id,
    title: objeto.querySelector("h5").textContent,
    description: objeto.querySelectorAll("p")[0].textContent,
    price: objeto.querySelectorAll("p")[1].textContent,
    quantity: 1,
  };

  // Si ya está el ID en el carrito, entonces le suma la cantidad en vez de repetir el objeto en el carrito
  // Si el producto no existe, entonces por defecto va a tener la cantidad de 1
  if (carrito.hasOwnProperty(producto.id)) {
    producto.quantity = carrito[producto.id].quantity + 1;
  }

  // Spread operator para hacer una copia del producto que estoy creando en el carrito de compras
  carrito[producto.id] = { ...producto };
  pintarCarrito();
};

// Pintar el carrito en el navegador
const pintarCarrito = () => {
  // console.log(carrito);
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.quantity;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.quantity * producto.price;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);

  pintarFooter();

  //Guardar la información en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Pintar footer
const pintarFooter = () => {
  footer.innerHTML = "";
  // Si nuestro carrito está vacío, le muestro este mensaje al usuario
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Empty cart- start buying!</th>`;
    return;
  }

  // Con esto voy acumulando las cantidades a medida que se agregan o quitan elementos
  const nCantidad = Object.values(carrito).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );

  // Con esto voy acumulando el total a medida que se agregan o quitan elementos
  const nPrecio = Object.values(carrito).reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const boton = document.querySelector("#vaciar-carrito");
  // Con esto elimino el carrito cada vez que se toque en el botón de vaciar
  boton.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    eliminarTodo();
  });
  // Botón para finalizar la compra
  const comprarButton = document.getElementById("btn-comprar");
  comprarButton.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
    alertComprar();
  });
};

//Acción de disminuir o aumentar
const btnAccion = (e) => {
  // Acción de aumentar
  if (e.target.classList.contains("btn-info")) {
    // Accedo a la cantidad del producto
    const producto = carrito[e.target.dataset.id];
    // Le sumo uno a la cantidad que ya tenía (operador ++)
    producto.quantity++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
    nuevoItemToast();
  }

  //Acción de disminuir
  if (e.target.classList.contains("btn-danger")) {
    // Accedo a la cantidad del producto
    const producto = carrito[e.target.dataset.id];
    // Le resto uno a la cantidad que ya tenía(operador --)
    producto.quantity--;

    // Si la cantidad es 0, desaparece el producto del carrito
    if (producto.quantity === 0) {
      delete carrito[e.target.dataset.id];
      eliminarTodo();
    } else {
      carrito[e.target.dataset.id] = { ...producto }; // Spread operator 2
    }
    pintarCarrito();
    eliminarToast();
  }
  e.stopPropagation();
};

// -----INPUT PARA BUSCAR Y FILTRAR LOS CURSOS-----
// Agarro el input que está dentro del form
const searchBar = document.forms["search-courses"].querySelector("input");

// Le agrego un evento al input
searchBar.addEventListener("keyup", function (e) {
  // Con esto agarro el valor que se ingrese en el buscador y lo paso a minúsculas
  const term = e.target.value.toLowerCase();
  // Con esto agarro todas las tarjetas de los productos
  const courses = cards.getElementsByClassName("card");
  // Con esto itero sobre las tarjetas (luego de pasar el HTML Collection a un Array )
  Array.from(courses).forEach(function (course) {
    // Con esto agarro el nombre del curso
    const name = course.firstElementChild.textContent;
    // Si es distinto de -1, quiere decir que el curso está, entonces lo muestro
    // Con indexOf puedo ver la posición del término buscado dentro del nombre de cada curso. Es decir, la posición dentro del string que es el nombre del curso
    if (name.toLowerCase().indexOf(term) != -1) {
      course.style.display = "block";
    }
    // Si es igual a -1, quiere decir que el cursono está, y por ende oculto todos los cursos disponibles
    else {
      course.style.display = "none";
    }
  });
});
