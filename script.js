function calculatePrice() {
		const packPrice = parseFloat(document.getElementById('packPrice').value);
		const packUnit = parseFloat(document.getElementById('packUnit').value);

		if (!isNaN(packPrice) && !isNaN(packUnit)) {
				const pricePerGram = packPrice / packUnit;
				const x = 100; // Default value for x grams

				const resultDiv = document.getElementById('result');

				// Create table if not exists
				if (!resultDiv.querySelector('table')) {
						resultDiv.innerHTML = '<table>' +
																		'<tr>' +
																				'<th>Price per gram (₹)</th>' +
																				'<th>Price for 100 grams (₹)</th>' +
																		'</tr>' +
																	'</table>';
				}

				// Append new row to the table
				const table = resultDiv.querySelector('table');
				const newRow = table.insertRow(-1);
				newRow.insertCell(0).textContent = pricePerGram.toFixed(2);
				newRow.insertCell(1).textContent = (pricePerGram * x).toFixed(2);

				// Clear input fields
				document.getElementById('packPrice').value = '';
				document.getElementById('packUnit').value = '';
		} else {
				alert('Please enter valid values for comparison.');
		}
}
