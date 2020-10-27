export default function generatePin() {
	let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	let pin ="";
	for (var i = 8 - 1; i >= 0; i--) {
		var index = Math.floor(Math.random() * alphabet.length);
		pin += alphabet[index];
	}
	return pin;
}