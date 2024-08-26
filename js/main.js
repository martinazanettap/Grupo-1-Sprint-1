// Carga y muestra la información del usuario al cargar la página
const usuario = recuperarUsuariosDeLocalStorage(); // Recupera todos los usuarios de localStorage
const usuarioActual = localStorage.getItem('usuarioActual'); // Obtiene el usuario actual
const datosUsuario = usuario[usuarioActual]; // Accede a los datos del usuario actual

if (datosUsuario) {
	const saldoNumerico = parseFloat(datosUsuario.saldo); // Convierte el saldo a número para asegurar la precisión
	document.getElementById('user-balance').textContent = `$${saldoNumerico.toFixed(2)}`; // Formatea y muestra el saldo
	cargarHistorial(datosUsuario.historialTransferencias, 'transfer-history'); // Carga el historial de transferencias
	cargarHistorial(datosUsuario.historialPagos, 'payment-history'); // Carga el historial de pagos
	cargarHistorial(datosUsuario.historialPrestamos, 'loan-history'); // Carga el historial de préstamos
}

// Función para cargar y mostrar el historial en la interfaz del usuario
function cargarHistorial(historial, elementoId) {
	const ul = document.getElementById(elementoId); // Accede al elemento donde se mostrará el historial
	historial.forEach((item) => {
		const li = document.createElement('li'); // Crea un nuevo elemento de lista para cada entrada del historial
		li.textContent = `N°: ${item.numero} - Monto: $${item.monto}${item.tasaInteres ? ' - ' + item.tasaInteres : ''}`; // Configura el texto del elemento de lista
		ul.appendChild(li); // Añade el elemento de lista al contenedor correspondiente
	});
}
