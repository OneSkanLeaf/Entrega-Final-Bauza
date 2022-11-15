# Proyecto-Final-JavaScript

Proyecto Ecommerce para el curso de JavaScript de Coderhouse. La idea de esta página es vender mis servicios como profesor particular de inglés y de español. Las funcionalidades que agregué con JavaScript son las siguientes:

1- Cree un carrito de compras, en el cual el usuario puede ir agregando o quitando los cursos que quiera hacer. 

2- A su vez, cree una barra de búsqueda por filtro, con la cual el usuario puede ir buscando el nombre del curso que quiera buscar, y el buscador se lo va a filtrar y mostrar en pantalla (ocultando todos los que no sean compatibles con lo que el usuario haya escrito en el input)

3- También agregué  el objeto Date() para crear un nuevo objeto de horario (con formato de 24 horas) para que el usuario sepa la hora en todo momento, ya que está constantemente actualizandose (para eso use el setTimeout con 1 segundo de delay. 

4- Cree un formulario de contacto, mediante el cual (gracias al uso de local storage) se van guardando los datos que haya ingresado el usuario. Además, gracias a que utilice fetch para consumir datos de la API de Formspree, cada vez que el usuario complete los campos del formulario, voy a estar recibiendo el correo electrónico con todos los datos (puedo recibir hasta 50 correos por mes). 

5- Finalmente, hice uso de las librerías Toastify y Sweet Alert para ir creando ventanas personalizadas a la hora de agregar cosas al carrito, quitar cosas del carrito, eliminar todo el carrito, finalizar al compra, enviar el formulario de contacto o incluso ni bien carga la página, para pedirle el nombre al usuario y poder saludarlo. 

