const ctx = document.getElementById("myChart").getContext('2d');


async function getUser(){
	const user = await fetch('./current-user', {
		credentials: "same-origin"
		});
	var user_data = await user.json()
	if(user.status != 200){
		window.location.href = "./login";
	}
	

	return user_data
}
async function addUserData(){
	user_data = await getUser();
	sessionStorage.setItem('user',user_data['name'])
	document.getElementById("welcomemessage").innerHTML = "Welcome " + user_data['name'];
}
async function getData() {

	user_data= await getUser();
	var url = './weights?user=';
	url = url.concat(user_data['id'])
	

	const response = await fetch(url, {
		credentials: "same-origin"
	});
	if (response.status ===401)
	{
		window.location.href = "./login";
	}
	const data = await response.json();
	labels = []
	weights = []
	for (var i = 0; i < data.length; i++) {
		labels.push(data[i]['timestamp']);
		weights.push(data[i]['weight']);
	}
	return { labels, weights };
}

async function chartIt() {

	data = await getData();
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
			maintainAspectRatio: false,
			responsive: true,
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
				}],
				xAxes: [{
					type: 'time',
					time: {
						unit: 'day'
					},
					distribution: 'linear',
				}],
				title: {
					display: true,
				}
			}
		}
	};
	new Chart(ctx, config);
}
addUserData();
chartIt();
