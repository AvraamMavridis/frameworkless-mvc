import DonutChartView    from 'views/DonutChartView';
import { response } from 'server/server';
import Controller   from 'core/Controller';


export default class DonutController extends Controller
{
    constructor( props )
    {
        super( new DonutChartView( props ) );
        const { label } = props;

        response()
          .then( ({dataEntries}) => {
            const [ totalTablet, totalSmartphone ] = this.calculateTotals( dataEntries );
            this.setViewProps( {
                label: label.toUpperCase(),
                totalTablet,
                totalSmartphone,
                dataEntries,
                ...props
            } );
        });
    }

    /**
     * NOT USED
     */
    updateChart()
    {
        response().then( data => this.setViewProps( data ));
    }

    /**
     * Calculates the sum per device type
     * @param  {[type]} dataEntries [description]
     * @return {[type]}             [description]
     */
    calculateTotals( dataEntries )
    {
        return dataEntries.reduce(( sums, entry ) => {
          sums[0] += entry.tablet;
          sums[1] += entry.smartphone;
          return sums;
        }, [0,0] );
    }
}
