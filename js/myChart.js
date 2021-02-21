const ctx = document.getElementById("myChart").getContext('2d');


const url = 'http://127.0.0.1/weights?user=1';

async function getWeights(){
	const response = await fetch(url);
	const data = await response.json();

	for(var i=0;i<data.length;i++){
		delete data[i]['user_id']
	}
	console.log(data);
	return data;
}


obj=getWeights();
const config = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			data: obj,
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