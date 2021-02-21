const ctx = document.getElementById("myChart").getContext('2d');


const url = 'http://127.0.0.1/weights?user=1';

async function getData() {
	const response = await fetch(url);
	const data = await response.json();
	labels = []
	weights = []
	for (var i = 0; i < data.length; i++) {
		labels.push(data[i]['timestamp']);
		weights.push(data[i]['weight']);
	}
	return {labels,weights};
}

async function chartIt() {

	data=await getData();
	const config = {
		type: 'line',
		data: {
			labels: data.labels,
			datasets: [{
				data: data.weights,
				label: "Weight",
				borderColor: "#3e95cd",
				fill: false
			}]
		},
		options: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: 'Weight-Loss Graph'
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Weight (kg)'
					},
					ticks: {
						suggestedMin: 60,
						suggestedMax: 100
					}
				}],
				xAxes: [{
					type: 'time',
					distribution: 'linear',
				}],
				title: {
					display: false,
				}
			}
		}
	};
	new Chart(ctx, config);
}
chartIt();