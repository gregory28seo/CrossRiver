function getcommonData (postdata) {
	$.ajax({ url : 'https://i4dpf79ju4.execute-api.us-east-1.amazonaws.com/beta', 
		method : 'POST',
		data: JSON.stringify(postdata),
		dataType: "json",
		processData: true,
		success: response => {
			console.log(response)
			document.getElementById('total_amount').innerHTML = formatter.format(Math.ceil(response.total_amount));
			document.getElementById('total_amount_funded').innerHTML = formatter.format(Math.ceil(response.total_amount_funded));
			document.getElementById('total_invested').innerHTML = formatter.format(Math.ceil(response.total_invested));
		},
		fail: error => {
			console.error(error)
		}
	})
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

function getCompleteData() {
	$( "#total_amount" ).empty();
	$( "#total_amount_funded" ).empty();
	$( "#total_invested" ).empty();
	if (options && options.series) {
		options.series = [];
		Highcharts.chart('barChart', options);
	}
	if (optionsLine && optionsLine.series) {
		optionsLine.series = [];
		Highcharts.chart('lineChart', optionsLine);
	}
	localStorage.year = document.getElementsByName('year')[0].value;
	var postdata = {"year":localStorage.year};
	getLineData();
	getBarData();
	getcommonData(postdata);
}