const planDataToCompare = [];

function addPlanToCompare() {
		const packPrice = parseFloat(document.getElementById('packPrice').value);
		const packUnit = parseFloat(document.getElementById('packUnit').value);

		if (!isNaN(packPrice) && !isNaN(packUnit)) {
				const newPlan = { packPrice, packUnit };
				planDataToCompare.push(newPlan);
				document.getElementById('packPrice').value = '';
				document.getElementById('packUnit').value = '';
				updateComparisonTable(newPlan);
		} else {
				alert('Please enter valid values for comparison.');
		}
}

function updateComparisonTable(newPlan) {
		const resultContainer = document.getElementById('result');
		const x = 100; // Default value for x grams

		// Create table if not exists
		if (!resultContainer.querySelector('table')) {
				resultContainer.innerHTML = '<table>' +
																		'<tr>' +
																				'<th>Original Price (₹)</th>' +
																				'<th>Original Grams/Unit</th>' +
																				'<th>Price per gram (₹)</th>' +
																				'<th>Price for 100 grams (₹)</th>' +
																		'</tr>' +
																	'</table>';
		}

		const table = resultContainer.querySelector('table');
		const newRow = table.insertRow(-1);

		const pricePerGram = newPlan.packPrice / newPlan.packUnit;
		const priceForXGram = pricePerGram * x;

		newRow.insertCell(0).textContent = newPlan.packPrice.toFixed(2);
		newRow.insertCell(1).textContent = newPlan.packUnit;
		newRow.insertCell(2).textContent = pricePerGram.toFixed(2);
		newRow.insertCell(3).textContent = priceForXGram.toFixed(2);

		highlightBestPlan();
}

function highlightBestPlan() {
		const rows = document.querySelectorAll('#result table tr');
		if (rows.length > 1) {
				const bestPlanIndex = findBestPlanIndex();
				rows.forEach((row, index) => {
						if (index === bestPlanIndex) {
								row.classList.add('best-plan');
						} else {
								row.classList.remove('best-plan');
						}
				});
		}
}

function findBestPlanIndex() {
		let bestPlanIndex = 0;
		let bestPricePerGram = parseFloat(document.querySelectorAll('#result table tr td:nth-child(2)')[0].textContent);
		for (let i = 1; i < planDataToCompare.length; i++) {
				const pricePerGram = parseFloat(document.querySelectorAll(`#result table tr:nth-child(${i + 1}) td:nth-child(2)`)[0].textContent);
				if (pricePerGram < bestPricePerGram) {
						bestPricePerGram = pricePerGram;
						bestPlanIndex = i;
				}
		}
		return bestPlanIndex;
}

function clearComparisonTable() {
		const resultContainer = document.getElementById('result');
		resultContainer.innerHTML = '';
		// Clear the planDataToCompare array
		planDataToCompare.length = 0;
}
