import View from 'core/View';
import d3 from 'd3';
import './styles.css';


export default class DataDetails extends View
{

    render()
    {
        const { totalTablet, totalSmartphone, colors } = this.props;

        const percSmartphone = parseInt( (totalSmartphone / ( totalSmartphone + totalTablet ) ) * 100 );
        const perceTablet = 100 - percSmartphone;

        return `<div class="details">
                  <div class="tablet">
                    <label style="color:${colors[0]}">Tablet</label>
                    <div class="numbers">
                      <span class="perc">${perceTablet}%</span>
                      <span class="total">${totalTablet}</span>
                    </div>
                  </div>
                  <div class="smartphone">
                    <label style="color:${colors[1]}">Smartphone</label>
                    <div class="numbers">
                      <span class="perc">${percSmartphone}%   </span>
                      <span class="total">${totalSmartphone}</span>
                    </div>
                  </div>
               </div>`;
    }
}
