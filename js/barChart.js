monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getData(postdata) {
	$.ajax({ url : 'https://kvqxkiawrj.execute-api.us-east-1.amazonaws.com/beta/', 
		method : 'POST',
		data: JSON.stringify(postdata),
		dataType: "json",
		processData: true,
		success: response => {
			console.log(response)
			var obj = {
				name: response.month,
				data: [Math.ceil(response.volume)]
			}
			options.series.push(obj);
			if (options.series.length == 12) {
				Highcharts.chart('barChart', options);
			}
		},
		fail: error => {
			console.error(error)
		}
	})
}

var options =  {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Loan Volume'
    },
    subtitle: {
        text: 'Lending Club- Monthly Loan Volume for year 20'+ localStorage.year
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Loan Volume'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
}
options.series = []

function getBarData () {
	for (month of monthArray) {
		var postdata = {"year":localStorage.year, "month":month}
		getData(postdata)
	}
}