import { err, isString } from 'core/helpers';

/**
Renders a view to the DOM
*/
export default class Renderer
{
    /**
     * Determines if the el is a DOM element
     * @param  {DOM element}
     * @return {Boolean}
     */
     static isDomElement( el = err('el is undefined, check isDomElement() on Render') )
     {
        return ( el && el instanceof HTMLElement );
     }

     /**
      * Renders the passed component to the target
      * @param  {DOM element} target
      * @param  {DOM element or String}
      */
     static render( target = err( 'target is undefined, check render() on Render' ),
                    componentInstance = err( 'componentInstance is undefined, check render() on Render' ) )
     {
        /** Throw error if the target is not a DOM element */
        !Renderer.isDomElement( target ) && err('Target should be a HTMLEelment');

        const _el = componentInstance.__element;

        /**
         * In case of element is a DOM element e.g. document.createElement('div')
         */
        if( Renderer.isDomElement( _el ) )
        {
            target.appendChild(  _el );
        }
        /**
         * In case of element is HTML string e.g. <div>Something</div>
         */
        else if( isString( _el ) )
        {
            target.insertAdjacentHTML( 'afterend', _el );
        }

     }
}
