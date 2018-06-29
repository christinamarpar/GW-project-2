function init() {


	Plotly.d3.json('/mat_data/lifetime_risk_maternal_death', function (error, mat_list) {
		if (error) return console.warn(error);




		var data_inc = [{
			x: [mat_list[0]['country_region'][255], mat_list[0]['country_region'][247], mat_list[0]['country_region'][155], mat_list[0]['country_region'][137], mat_list[0]['country_region'][136]],
			y: [mat_list[0]['lifetime_risk_maternal_death'][255], mat_list[0]['lifetime_risk_maternal_death'][247], mat_list[0]['lifetime_risk_maternal_death'][155], mat_list[0]['lifetime_risk_maternal_death'][137], mat_list[0]['lifetime_risk_maternal_death'][136]],
			marker: {
				color: ["green", "blue", "blue", "blue", "blue"]
			},
			//text: mat_list[0]['country_region'],
			//name: "Greek",
			type: "bar"
		}];

		var layout_inc = {
			title: "Lifetime risk maternal death by income"
		};
		var INC = document.getElementById('bar_inc');
		Plotly.plot(INC, data_inc, layout_inc);
	})
}

function optionChanged(dataset) {
	console.log(dataset);

	var INC = document.getElementById("bar_inc");

	Plotly.d3.json('/mat_data/' + dataset, function (error, mat_list) {
		if (error) return console.warn(error);

		var xinc = []
		var yinc = []

		xinc = [mat_list[0]['country_region'][255], mat_list[0]['country_region'][247], mat_list[0]['country_region'][155], mat_list[0]['country_region'][137], mat_list[0]['country_region'][136]],
			yinc = [mat_list[0][dataset][255], mat_list[0][dataset][247], mat_list[0][dataset][155], mat_list[0][dataset][137], mat_list[0][dataset][136]],

			ind = dataset.replace(/_/g, " ")
		ind = ind.charAt(0).toUpperCase() + ind.slice(1).toLowerCase();

		update_inc = { title: ind + " by income" };

		Plotly.restyle(INC, "x", [xinc]);
		Plotly.restyle(INC, "y", [yinc]);
		Plotly.relayout(INC, update_inc);

	});

	// append a new script tag to load the map data
	// console.log("hello");
	var map = document.getElementById("map");
	map.innerHTML = "<div id='map_target'></div>"
	
	// map.innerHTML("");


	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', `/static/js/${dataset}.js`);

	map.appendChild(script);

}

init();
