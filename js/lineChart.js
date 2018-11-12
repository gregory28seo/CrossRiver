monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
gradeArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
//monthArray = ['Jan','Feb'];
//gradeArray = ['A', 'B'];
counter = 0;
function getLine(postdata) {
	$.ajax({ url : 'https://eiy55lq6e2.execute-api.us-east-1.amazonaws.com/beta', 
		method : 'POST',
		data: JSON.stringify(postdata),
		dataType: "json",
		processData: true,
		success: response => {
			counter++;
			var found = optionsLine.series.findIndex(x => x.name === response.grade);
			if (found == -1) {
				var obj = {
					name: response.grade,
					data: []
				}
				if (obj.name) {
					optionsLine.series.push(obj);
				}
			} else {
				var obj = optionsLine.series[found];
			}
			var dataIndex = monthArray.indexOf(response.month);
			obj.data[dataIndex] = Math.ceil(response.gradePoint);
			if (counter == 84) {
				console.log(optionsLine.series);
				Highcharts.chart('lineChart', optionsLine);
			}
		},
		fail: error => {
			console.error(error)
		}
	})
}

var optionsLine = {

    title: {
        text: 'Loan By Credit Grade'
    },

    subtitle: {
        text: 'Loan issued by credit score(Grade)'
    },
	xAxis: {
		categories: monthArray
	},
    yAxis: {
        title: {
            text: 'Avg Loan Amount'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },

    series: [],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

};

function getLineData () {
	counter = 0
	for (grade of gradeArray) {
		for (month of monthArray) {
			var postdata = {"year":localStorage.year, "month":month, "grade":grade}
			getLine(postdata)
		}
	}
}