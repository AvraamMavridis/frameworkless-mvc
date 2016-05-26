import DonutController from './src/controllers/DataController';
import Renderer   		 from './src/core/Renderer';

var a = new DonutController({ label: 'Revenue', colors : [ '#50D328', '#006700' ] });
var b = new DonutController({ label: 'Impressions', colors : [ '#1AC7DF', '#064E64' ], lineColor : '#C9EEF0'});
var c = new DonutController({ label: 'Visits', colors : [ '#F9C303', '#D75512' ], lineColor : '#F7ECBB'});

const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');
const chart3 = document.getElementById('chart3');
Renderer.render( chart1, a.getView() )
Renderer.render( chart2, b.getView() )
Renderer.render( chart3, c.getView() )
