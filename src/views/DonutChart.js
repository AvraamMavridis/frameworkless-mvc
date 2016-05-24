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

    }

    render()
    {
        this.element = document.createElement('div')
        return this.element;
    }
}
