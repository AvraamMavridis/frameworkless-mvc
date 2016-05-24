import View from '../core/View';
import { response } from '../server/server';
import d3 from 'd3';

export default class DataDetails extends View
{
    render()
    {
        const { tablet, smartphone } = this.props;
        return `<div>Tablet</div>`;
    }
}
