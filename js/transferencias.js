// Realiza una transferencia de saldo entre dos usuarios
function transferirSaldo(deUsuario, aUsuario, monto) {
	const usuarios = JSON.parse(localStorage.getItem('usuarios')); // Recupera el listado de usuarios de localStorage

	// Verifica que el usuario de origen tenga saldo suficiente para la transferencia
	if (usuarios[deUsuario].saldo >= monto) {
		usuarios[deUsuario].saldo -= monto; // Deduce el monto del saldo del usuario de origen
		usuarios[aUsuario].saldo += monto; // Añade el monto al saldo del usuario destino

		// Registra la transacción en el historial de ambos usuarios
		usuarios[deUsuario].historialTransferencias.push({ a: aUsuario, monto: monto });
		usuarios[aUsuario].historialTransferencias.push({ de: deUsuario, monto: monto });

		localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda los cambios en localStorage
		return true; // Retorna verdadero si la transferencia fue exitosa
	} else {
		alert('Saldo insuficiente.'); // Notifica al usuario si no tiene saldo suficiente
		return false; // Retorna falso si la transferencia no puede realizarse
	}
}
