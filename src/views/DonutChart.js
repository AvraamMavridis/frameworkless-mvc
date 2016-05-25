import View from '../core/View';
import DataDetailsView from './DataDetailsView';
import d3 from 'd3';

export default class DonutChart extends View
{
    constructor( props = {} )
    {
        super();
        const chartProps = {
          donutWidth  : 10,
          radius      : 75,
          width       : 150,
          height      : 150,
          donutColors : [ '#50D328', '#006700' ],
          lineColor   : '#CDEEC0',
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

    createAnSVGCanvas()
    {
       this.svg = d3.select( this.getElement() ).append("svg")
                    .attr("width", this.width)
                    .attr("height", this.height)
                    .append("g")
                    .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
    }

    createTheDonutChart()
    {
        const { totalTablet, totalSmartphone, dataEntries } = this.props;
        const dataset = [ totalTablet, totalSmartphone ];

        const pie = d3.layout.pie()
            .sort(null);

        const arc = d3.svg.arc()
            .innerRadius(this.radius)
            .outerRadius(this.radius - this.donutWidth);

        const path = this.svg.selectAll("path")
            .data(pie(dataset))
            .enter().append("path")
            .attr("fill", (d, i) => this.donutColors[i])
            .attr("d", arc);
    }

    createTheLineChart()
    {
        const { totalTablet, totalSmartphone, dataEntries } = this.props;
        const dataset = [ totalTablet, totalSmartphone ];
        const w = ( this.radius * 2 ) - ( this.donutWidth * 2 ) - this.radius/3;
        const h = this.radius / 4;

        // X scale will fit all values from data[] within pixels 0-w
        const x = d3.scale.linear().domain([0, dataEntries.length]).range([0, w]);
        // Y scale will fit values from 0-max(dataEntries)
        const y = d3.scale.linear().domain([0, 1000]).range([ h, 0 ]);

        const lineFunc = d3.svg.line()
              .x((d,i) => x(i) )
              .y((d) => y( d.smartphone + d.tablet))
              .interpolate("linear");

       this.svg.append("path")
          .attr({
             d : lineFunc(dataEntries),
             "stroke" : this.lineColor,
             "stroke-width" : 2,
             "fill" : "none"
          })
          .attr("transform", `translate(-50,${this.radius/4})`);
    }

    createDetails()
    {
        const { totalTablet, totalSmartphone, dataEntries } = this.props;
        const dataset = [ totalTablet, totalSmartphone ];
        var a = new DataDetailsView({ totalTablet, totalSmartphone, colors: this.donutColors });
        this.appendChild(a)
    }

    willUpdate()
    {

        this.createAnSVGCanvas();
        this.createTheDonutChart();
        this.createTheLineChart();
        this.createDetails();
    }

    render()
    {
        return document.createElement('div');
    }
}
