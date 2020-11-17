// returns a string list so that react items can have a list of classes
export default function multiClass(classList) {
	let joinedClassList = "";
	for (var i = classList.length - 1; i >= 0; i--) {
		joinedClassList = joinedClassList + " " + classList[i];
	}
	return joinedClassList
};