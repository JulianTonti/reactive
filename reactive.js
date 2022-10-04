import {render,html} from 'https://unpkg.com/uhtml@3.0.1?module';
export default function reactive(parent='div', state={}, renderer=()=>{}) {
  const traps = {
    get : (o,k) => (!o[k] || typeof o[k] != 'object' ? o[k] : new Proxy(o[k],traps)),
    set : (o,k,v) => (o[k] = v, this.render(), true),
    deleteProperty : (o,k) => (delete o[k], this.render(), true),
  };
  this.set_state  = s => { this.state = s; this.proxy = new Proxy(s,traps); }
  this.set_render = r => { this.render = () => requestAnimationFrame(() => render(this.parent, r(html, this.state, this.proxy))); }
  this.set_parent = p => { this.parent = typeof p == 'string' ? document.createElement(p) : p; }
  this.set_parent(parent);
  this.set_render(renderer);
  this.set_state(state);
  this.render();
}
