import { err, noop } from './helpers';

export default class View
{
    constructor()
    {
      this.willRender();
      this.willMount();
      this.__timer = setInterval(() =>{
        if( this.isOnTheDom() )
        {
            this.didMount();
            clearInterval( this.__timer );
        }
      }, 0 );
    }

    isOnTheDom()
    {
        const parser = new DOMParser()
        const doc = parser.parseFromString(this.__element, "text/xml");
        return document.contains(doc);
    }

    willMount(){ return noop() };
    didMount(){ return noop() };
    willUpdate(){ return noop() };

    setProps( nextProps )
    {
        this.props = nextProps;
        this.willUpdate();
        this.willRender();
    }

    getElement()
    {
        return this.__element;
    }

    willRender()
    {
        this.__element = this.render();
    }

    render()
    {
       err('Components should have a render method')
    }

}
