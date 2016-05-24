import DonutController from './src/controllers/DataController';
import Renderer   from './src/core/Renderer';

var a = new DonutController();


const main = document.getElementById('main');
Renderer.render( main, a.getView() )
