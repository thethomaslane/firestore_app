// Creates an 8 character Pin that alternates between Consonants and Vowels (BACEDIFO)
export default function generatePin() {
	let consonants = ['B','C','D','F','G','H','J','K','L','M','N', 'P','R','S','T','V','W','X','Y','Z'];
	let vowels = ['A','E','I','O','U']
	let pin ="";
	for (var i = 8 - 1; i >= 0; i--) {
		if (i % 2 == 0) {
			var index = Math.floor(Math.random() * vowels.length);
			pin += vowels[index];
		} else {
			var index = Math.floor(Math.random() * consonants.length);
			pin += consonants[index];
		}
	}
	return pin;
}