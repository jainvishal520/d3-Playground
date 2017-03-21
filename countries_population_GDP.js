// Population v/s GDP Dataset

	var outerWidth = 300,
	    outerHeight = 300,
	    margin = {left:30,right:30,top:30,bottom:30},
	    innerWidth = outerWidth-margin.left-margin.right,
	    innerHeight = outerHeight-margin.top-margin.bottom,
	    rMin = 0,
	    rMax = 20,
	    xColumn = 'population',
	    yColumn = 'gdp',
	    rColumn = 'population';

	var svg = d3.select('body').append('svg')
	  .attr('width',outerWidth)
	  .attr('height',outerHeight);

	var g = svg.append('g')
	  .attr('transform','translate('+margin.left+','+margin.right+')');

	var xScale = d3.scaleLog().range([0,innerWidth]);
	var yScale = d3.scaleLog().range([innerHeight,0]);
	var rScale = d3.scaleSqrt().range([rMin,rMax]);
	// var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


	function render(data){
	  xScale.domain(d3.extent(data,function(d){return d[xColumn];}));
	  yScale.domain(d3.extent(data,function(d){return d[yColumn];}));
	  rScale.domain([0,d3.max(data,function(d){return d[rColumn];})]);
	  //bind
	  var circles = g.selectAll('circle').data(data);
	  //enter
	  circles.enter().append('circle')
	    .attr('r',function(d){return rScale(d[rColumn]);})
	    //update
	    .merge(circles)
	      .attr('cx',function(d){return xScale(d[xColumn]);})
	      .attr('cy',function(d){return yScale(d[yColumn]);});
	      // .attr('fill',function(d){return colorScale(d.country_code);});
	  circles.exit().remove();
	}

	function type(d){
	  d.population = +d.population;
	  d.gdp = +d.gdp;
	  return d;
	}


	d3.csv('countries_population_GDP.csv',type,function(data){
	  render(data);
	  // console.log(rScale.domain());
	  // console.log(rScale(1359821465));

	  //population in the biggest circle
	  var people = rScale.domain()[1];

	  //number of pixels in the biggest circle
	  var pixels = Math.PI*rMax*rMax;
	  console.log((people/pixels)+' people per pixel');
	});