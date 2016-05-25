import DonutController from './src/controllers/DataController';
import Renderer   from './src/core/Renderer';

var a = new DonutController();
var b = new DonutController({ donutColors : [ '#1AC7DF', '#064E64' ], lineColor : '#C9EEF0'});
var c = new DonutController({ donutColors : [ '#F9C303', '#D75512' ], lineColor : '#F7ECBB'});

const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');
const chart3 = document.getElementById('chart3');
Renderer.render( chart1, a.getView() )
Renderer.render( chart2, b.getView() )
Renderer.render( chart3, c.getView() )
