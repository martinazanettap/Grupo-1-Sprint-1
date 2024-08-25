function transferirSaldo(deUsuario, aUsuario, monto) {
	const usuarios = JSON.parse(localStorage.getItem('usuarios'));
	if (usuarios[deUsuario].saldo >= monto) {
		usuarios[deUsuario].saldo -= monto;
		usuarios[aUsuario].saldo += monto;
		// Registrar la transacción
		usuarios[deUsuario].historialTransferencias.push({ a: aUsuario, monto: monto });
		usuarios[aUsuario].historialTransferencias.push({ de: deUsuario, monto: monto });
		localStorage.setItem('usuarios', JSON.stringify(usuarios));
		return true;
	} else {
		alert('Saldo insuficiente.');
		return false;
	}
}
