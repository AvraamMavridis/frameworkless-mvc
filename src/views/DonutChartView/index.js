import View from 'core/View';
import DataDetailsView from 'views/DataDetailsView';
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

    /**
     * Creates the svg canvas where we draw the chart
     */
    createAnSVGCanvas()
    {
       this.svg = d3.select( this.getElement() ).append('svg')
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .append('g')
                    .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }

    /**
     * Draws the donut chart
     */
    createTheDonutChart()
    {
        const { totalTablet, totalSmartphone, dataEntries } = this.props;
        const dataset = [ totalTablet, totalSmartphone ];

        const pie = d3.layout.pie()
            .sort(null);

        const arc = d3.svg.arc()
            .innerRadius(this.radius)
            .outerRadius(this.radius - this.donutWidth);

        const path = this.svg.selectAll('path')
            .data(pie(dataset))
            .enter().append('path')
            .attr('fill', (d, i) => this.colors[i])
            .attr('d', arc);


         const lineHeight = 5;

         // Draws the tick in the donut
         for(let t in [1,2,3,4])
         {
            let sign = Math.pow( -1, t%2 );
            let inversesign = -sign;
            var pos = ( sign * this.radius ) + ( inversesign * this.donutWidth );
            let x1 = 0, x2 = 0, y1 = pos, y2 = pos - sign * lineHeight;

            if( t > 1 )
            {
              y1 = 0;
              y2 = 0;
              x1 = pos;
              x2 = pos - sign*lineHeight;
            }

            this.svg.append('line')
                    .attr('x1', x1)
                    .attr('y1', y1)
                    .attr('x2', x2)
                    .attr('y2', y2)
                    .attr('stroke-width', 2)
                    .attr('stroke', `${this.colors[1]}`);
         }
    }

    /**
     * Draws the line chart inside the donut
     */
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
              .interpolate('linear');

       this.svg.append('path')
          .attr({
             d : lineFunc(dataEntries),
             'stroke' : this.lineColor,
             'stroke-width' : 2,
             'fill' : 'none'
          })
          .attr('transform', `translate(-50,${this.radius/4})`);
    }

    createDetails()
    {
        const { totalTablet, totalSmartphone, dataEntries, colors } = this.props;
        const dataset = [ totalTablet, totalSmartphone ];
        var a = new DataDetailsView({ totalTablet, totalSmartphone, colors });
        this.appendChild(a)
    }

    createText()
    {
        const { totalTablet, totalSmartphone, label } = this.props;

        this.svg.append('text').text(`${label}`)
                               .attr('font-family', 'sans-serif')
                               .attr('x', 0)
                               .attr('y', - (this.radius / 4 ))
                               .attr('fill', '#AAAAAA')
                               .style('text-anchor', 'middle');

        this.svg.append('text').text( (totalTablet + totalSmartphone).toLocaleString('de-DE') )
                               .attr('font-family', 'sans-serif')
                               .attr('font-family', 'sans-serif')
                               .attr('x', 0)
                               .attr('y', 0)
                               .attr('fill', '#363636')
                               .style('text-anchor', 'middle');
    }

    willUpdate()
    {
        this.createAnSVGCanvas();
        this.createTheDonutChart();
        this.createTheLineChart();
        this.createText();
        this.createDetails();
    }

    render()
    {
        return document.createElement('div');
    }
}
