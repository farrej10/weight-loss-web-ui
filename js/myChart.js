const csvToChartData = csv => {
	const lines = csv.trim().split('\n');
	lines.shift(); // remove titles (first line)
	return lines.map(line => {
		const [date, weight] = line.split(',');
		return {
			x: date,
			y: weight
		}
	});
};

const ctx = document.getElementById("myChart").getContext('2d');

const Http = new XMLHttpRequest();
const url = 'http://127.0.0.1/weights?user=15';
Http.open("GET", url);
Http.send();
var responsedata;
Http.onreadystatechange = (e) => {
	responsedata = Http.responseText;
	console.log(Http.responseText)


	var obj = JSON.parse(responsedata);

	for (var i = 0; i < obj.length; i++) {
		delete obj[i]['user_id']
	}

	const config = {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				data: obj,//csvToChartData(csv),
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
				text: 'Fatty Graph'
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