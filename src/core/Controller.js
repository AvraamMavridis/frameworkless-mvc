import { err } from '../core/helpers';

export default class Controller
{
    constructor( View = err(`Undefined View, check the ${this.constructor.name}`) )
    {
        this.__view = View;
    }

    setViewProps( props = err(`Undefined props, in the setViewProps of ${this.constructor.name}`) )
    {
        this.__view.setProps( props );
    }

    getView()
    {
        return this.__view;
    }
}
