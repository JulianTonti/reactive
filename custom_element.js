
function define(name) {
  class Custom extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({mode: 'open'});
      const wrapper = document.createElement('span');
      const style = document.createElement('style');
      style.textContent = `
        span {
          position: relative;
        }
      `;
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }
  return customElements.define(name, Custom);
}


// all custom elements with extend the generic custom element
class ReactiveElement extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('span');
    const style = document.createElement('style');
    style.textContent = `
      span { color:red; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}
customElements.define('reactive-element', ReactiveElement);

// 
customElements.define('reactive-widget', class ReactiveWidget extends ReactiveElement {
  constructor() { super(); }
})


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


class CustomElement extends HTMLElement {
  constructor() {
    super();
    const shadow  = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('span');
    const style   = document.createElement('style');
    style.textContent = `
      span {
        position: relative;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    this.traps = {
      get : (o,k) => (!o[k] || typeof o[k] != 'object' ? o[k] : new Proxy(o[k],this.traps)),
      set : (o,k,v) => (o[k] = v, this.render(), true),
      deleteProperty : (o,k) => (delete o[k], this.render(), true),
    };
    set_state  = s => { this.state = s; this.proxy = new Proxy(s,traps); }
    set_render = r => { this.render = () => requestAnimationFrame(() => render(this.parent, r(html, this.state, this.proxy))); }
    set_parent = p => { this.parent = typeof p == 'string' ? document.createElement(p) : p; }
    set_parent(parent);
    set_render(renderer);
    set_state(state);
    render();
  


  }

  connectedCallback() {
    // added to the page
  }
  disconnectedCallback() {
    // removed from the page
  }
  adoptedCallback() {
    // moved to a new dom
  }
  attributeChangedCallback(name, old_value, new_value) {
    // when an attribute changes
  }

  _traps = {
    get : (o,k) => (!o[k] || typeof o[k] != 'object' ? o[k] : new Proxy(o[k],_traps)),
    set : (o,k,v) => (o[k] = v, this.render(), true),
    deleteProperty : (o,k) => (delete o[k], this.render(), true),
  };
  set_state  = s => { this.state = s; this.proxy = new Proxy(s,traps); }
  set_render = r => { this.render = () => requestAnimationFrame(() => render(this.parent, r(html, this.state, this.proxy))); }
  set_parent = p => { this.parent = typeof p == 'string' ? document.createElement(p) : p; }
  set_parent(parent);
  set_render(renderer);
  set_state(state);
  render();



}


o = {
  a:'a',
  b:'b',
  __proto__:{
    c:'c',
    d:'d'
  }
}


function Test() {
  this.blah = 'blah';
}
Object.setPrototypeOf(Test.prototype, HTMLElement.prototype);
t = new Test();
t.__proto__

let v = Object.create(


CustomElementRegistry.define('custom-element', CustomElement);


render`<div id='main'>
  <div>Title: ${s.title}</div>
  <ce-blah data-state='${s}' />
`;

function render_blah()




/*
An example of a widget that uses the reactive pattern (state,proxy & renderer)
*/
import reactive from './reactive.js';

export default function widget(parent) {
  return new reactive(parent, {
    line   : 'some line',
    lines  : ['a','set','of','lines'],
    number : 100,
    radio  : {
      value : 'first',
      options : ['first','second','third']
    },
    select : {
      value  : 'first',
      options : ['first','second','third']
    },
    repeat : { min:0, max:100, value:50 },
    range  : { min:0, max:100, value:50 },
    print : () => console.log(JSON.stringify(internal_state,null,2)),
  },
  (html,S,P) => html`
    <table>
    <tr>
      <td>line</td>
      <td><input type='text' value=${S.line} onchange=${e => P.line = e.target.value} /></td>
    </tr>

    <tr>
      <td>textarea</td>
      <td><textarea onchange=${e => P.lines = e.target.value.split("\n")}>${S.lines.join("\n")}</textarea></td>
    </tr>

    <tr>
      <td>number</td>
      <td><input type='number' value=${S.number} onchange=${e => P.number = e.target.value} /></td>
    </tr>

    <tr>
      <td>radio</td>
      <td>${S.radio.options.map(s => html`<input onchange=${e => P.radio.value = e.target.value} type='radio' name=${s} value=${s} ?checked=${s == S.radio.value}>${s}</input>`)}</td>
    </tr>

    <tr>
      <td>select</td>
      <td><select onchange=${e => P.select.value = e.target.selectedOptions[0].value}>
        ${S.select.options.map(s => html`<option ?selected=${s == S.select.value}>${s}</option>`)}
      </select></td>
    </tr>

    <tr>
      <td>range</td>
      <td>
        <span>min:${S.range.min}</span>
        <input type='range' oninput=${e => P.range.value = e.target.value} min=${S.range.min} max=${S.range.max} value=${S.range.value}></input>
        <span>max:${S.range.max}</span>
        <span> (value:${S.range.value})</span>
      </td>
    </tr>

    <tr>
      <td>inverse</td>
      <td>
        <span>min:${S.range.min}</span>
        <input disabled type='range' min=${S.range.min} max=${S.range.max} value=${S.range.max - (S.range.value)}></input>
        <span>max:${S.range.max}</span>
        <span> (value:${100 - S.range.value})</span>
      </td>
    </tr>

    <tr>
      <td>repeat</td>
      <td>
        <span>min:${S.repeat.min}</span>
        <input disabled type='range' oninput=${e => P.repeat.value = e.target.value} min=${S.repeat.min} max=${S.repeat.max} value=${S.repeat.value}></input>
        <span>max:${S.repeat.max}</span>
        <span> (value:${S.repeat.value})</span>
      </td>
    </tr>
    </table>
  `);
};
