
//scatter plot of Iris dataset

//pluggable variables 
	var outerWidth = 300,
	    innerHeight = 250,
	    rMin = 1,
	    rMax = 6,
	    xColumn = 'sepal_length',
	    yColumn = 'petal_length',
	    rColumn = 'sepal_width',
	    colorColumn = 'species';


	var svg = d3.select('body').append('svg')
	  .attr('width',outerWidth)
	  .attr('height',innerHeight);

	var xScale = d3.scaleLinear().range([0,outerWidth]);
	var yScale = d3.scaleLinear().range([innerHeight,0]);
	var rScale = d3.scaleLinear().range([rMin,rMax]);
	var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	function type(d){
	  d.sepal_length = +d.sepal_length;
	  d.sepal_width = +d.sepal_width;
	  d.petal_length = +d.petal_length;
	  d.petal_width = +d.petal_width;
	  return d;
	}

	function render(data){

	  xScale.domain(d3.extent(data,function(d){return d[xColumn];}));
	  yScale.domain(d3.extent(data,function(d){return d[yColumn];}));
	  rScale.domain(d3.extent(data,function(d){return d[rColumn];}));


	  //bind
	  var circles = svg.selectAll('circle').data(data);
	  //enter
	  circles.enter().append('circle').attr('r',function(d){return rScale(d[rColumn]);})
	  //update
	  .merge(circles)

	    .attr("cx", function (d){ return xScale(d[xColumn]); })
	    .attr("cy", function (d){ return yScale(d[yColumn]); })
	    .attr("fill",    function (d){ return   colorScale(d[colorColumn]); });
	  //exit
	  circles.exit().remove();
	}
	d3.csv('iris.csv',type,render);

