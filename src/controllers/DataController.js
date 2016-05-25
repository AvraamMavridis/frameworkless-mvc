import DonutChart   from '../views/DonutChart';
import { response } from '../server/server';
import Controller   from '../core/Controller';


export default class DonutController extends Controller
{
    constructor( props )
    {
        super( new DonutChart( props ) );
        response().then( ({dataEntries}) => {

            const [ totalTablet, totalSmartphone ] = this.calculateTotals( dataEntries );

            this.setViewProps( { totalTablet, totalSmartphone, dataEntries } );
        });
    }

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
