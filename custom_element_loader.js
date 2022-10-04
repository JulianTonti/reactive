/*
Detect and load/mount custom components at runtime. This is achieved by hooking the DOM mutation
observer and watching for injection of specific custom-types, names by a recognised prefix. 
*/

// const uce_template = customElements.get('uce-template');
// document.body.appendChild(uce_template);

function load(name) {
  if (name == 'uce_template') return;
  fetch('components/' + name + '.uce')
  .then(r => r.text())
  .then(s => document.body.appendChild(uce_template.from(s)));
}

// custom tag management
const state = {
  prefix_tag : 'ce-', // prefix for custom element tags
  prefix_url : './tags/ce_', // prefix for custom element source code files
  active     : false, // set to false if the observer is inactive
  tags       : {},    // a set of custom tags definitions that have been loaded (or are loading)
  observer   : null   // the DOM mutation observer (detects addition of custom tags)
};

// activate the mutation observer to watch for incoming custom elements
// see: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
function watch() {
  if (state.active) return;
  state.active = true;
  state.observer = new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(load)));
  state.observer.observe(document.body, { childList:true, subtree:true });
}
// deactivate the mutation observer
function unwatch() {
  if (!state.active) return;
  state.active = false;
  state.observer.disconnect();
}
// import the code for a custom element (if required)
function load(node) {
  const name = (node.getAttribute("is") || node.tagName).toLowerCase();
  if (!name.startsWith(state.prefix_tag)) return;
  if (state.tags[name] !== undefined ) return;
  state.tags[name] = true;
  fetch(state.prefix_url + name).then(res => res.text()).then(txt => {
    const s = document.createElement('script');
    s.innerText = txt;
    document.head.appendChild(s);
  });
}

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


// a custom element has state
