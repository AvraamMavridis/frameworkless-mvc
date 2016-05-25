export default class Controller
{
    constructor( View )
    {
        this.__view = View;
    }

    setViewProps( props )
    {
        this.__view.setProps( props );
    }

    getView()
    {
        return this.__view;
    }
}
