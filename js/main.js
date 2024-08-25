document.addEventListener('DOMContentLoaded', function () {
	const usuario = recuperarUsuariosDeLocalStorage();
	const usuarioActual = localStorage.getItem('usuarioActual');
	const datosUsuario = usuario[usuarioActual];

	if (datosUsuario) {
		const saldoNumerico = parseFloat(datosUsuario.saldo); // Ensure it's a number
		document.getElementById('user-balance').textContent = `$${saldoNumerico.toFixed(2)}`;
		cargarHistorial(datosUsuario.historialTransferencias, 'transfer-history');
		cargarHistorial(datosUsuario.historialPagos, 'payment-history');
		cargarHistorial(datosUsuario.historialPrestamos, 'loan-history');
	}
});

function cargarHistorial(historial, elementoId) {
	const ul = document.getElementById(elementoId);
	historial.forEach((item) => {
		const li = document.createElement('li');
		li.textContent = `Fecha: ${item.fecha} - Monto: $${item.monto}`;
		ul.appendChild(li);
	});
}
