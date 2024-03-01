let totalPrice = "";
let weight = "";
let pricePerGram = "";

function appendNumber(number) {
	const display = document.getElementById("display");
	let currentInput = display.value;

	// Check for decimal point limitation
	if (number === "." && currentInput.includes(".")) {
		return;
	}

	currentInput += number;
	display.value = currentInput;

	// Separate total price and weight when comma is entered
	if (number === ",") {
		const parts = currentInput.split(",");
		totalPrice = parts[0];
