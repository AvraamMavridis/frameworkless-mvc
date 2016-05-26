import { err, noop } from 'core/helpers';
import Renderer from 'core/Renderer';

export default class View
{
    constructor( props )
    {
        this.props = props;
        this.willMount();
        this.willRender();

        this.__timer = setInterval(() =>{
          if( this.isOnTheDom() )
          {
              // trigger the didMount hook when the View has been rendered to the DOM
              this.didMount();
              clearInterval( this.__timer );
          }
        }, 1 );
    }

    /**
     * Checks if the View is on the DOM
     * @return {Boolean}
     */
    isOnTheDom()
    {
        const parser = new DOMParser()
        const doc = parser.parseFromString(this.__element, "text/xml");
        return document.contains(doc);
    }

    // Some hooks for the render lifecycle
    willMount(){ return noop(); };
    didMount(){ return noop(); };
    willUpdate(){ return noop(); };

    /**
     * Set the props and re-render
     * @param { Object } nextProps
     */
    setProps( nextProps )
    {
        this.props = nextProps;
        this.willUpdate();
        this.willRender();
    }

    /**
     * Return the HTMLElements or String that has been rendered
     * @return {HTMLElements or String} [description]
     */
    getElement()
    {
        return this.__element;
    }

    willRender()
    {
        this.__element = this.render();
    }

    /**
     * Renders children to the View
     */
    appendChild( child )
    {
        Renderer.render( this.__element, child );
    }

    /**
     * Every view that extends the "View" should implement this
     * method, otherwise we throw an error
     */
    render()
    {
        err('Views should have a render method')
    }

}
