import DonutChart   from '../views/DonutChart';
import { response } from '../server/server';
import Controller   from '../core/Controller';


export default class DonutController extends Controller
{
    constructor()
    {
        super( DonutChart );
        response().then( data => this.setViewProps( data ));
    }

    updateChart()
    {
        response().then( data => this.setViewProps( data ));
    }
}
