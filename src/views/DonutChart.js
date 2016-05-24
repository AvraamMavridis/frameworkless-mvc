import View from '../core/View';
import { response } from '../server/server';
import d3 from 'd3';

export default class DonutChart extends View
{
    constructor( props = {} )
    {
        super();
        const chartProps = {
          donutWidth : 10,
          radius     : 75,
          width      : 150,
          height     : 150,
          colors     : [ '#50D328', '#006700' ],
          ...props
        };

        for( let prop in chartProps )
        {
            if( chartProps.hasOwnProperty( prop ) )
            {
                this[ prop ] = chartProps[ prop ];
            }
        }
    }

    willUpdate()
    {
        const { tablet, smartphone } = this.props;

        const dataset = {
          apples: [ tablet, smartphone ],
        };

        const pie = d3.layout.pie()
            .sort(null);

        const arc = d3.svg.arc()
            .innerRadius(this.radius)
            .outerRadius(this.radius - this.donutWidth);

        const svg = d3.select( this.element ).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        const path = svg.selectAll("path")
               .data(pie(dataset.apples))
               .enter().append("path")
               .attr("fill", (d, i) => this.colors[i])
               .attr("d", arc);

               var w = (this.radius * 2) - (this.donutWidth*2) - 10 ;
               var h = 25;
               var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];
           		// X scale will fit all values from data[] within pixels 0-w
           		var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
           		// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
           		var y = d3.scale.linear().domain([0, 10]).range([h, 0]);

            var lineFun = d3.svg.line()
              .x(function(d,i) {
                return x(i);
              })
              .y(function(d) {
                return y(d);
              })
              .interpolate("linear");



            var viz = svg.append("path")
              .attr({
                d : lineFun(data),
                "stroke" : "purple",
                "stroke-width" : 2,
                "fill" : "none"
              })
              .attr("transform", "translate(-60,0)");




    }

    render()
    {
        this.element = document.createElement('div')
        return this.element;
    }
}
