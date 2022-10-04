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
      <td>${S.radio.options.map(s => html`<input onchange=${e => P.radio.value = e.target.value} type='radio' name=${s} value=${s} ?checked=${s == S.radio.value}>${s} />`)}</td>
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
        <input type='range' oninput=${e => P.range.value = e.target.value} min=${S.range.min} max=${S.range.max} value=${S.range.value} />
        <span>max:${S.range.max}</span>
        <span> (value:${S.range.value})</span>
      </td>
    </tr>

    <tr>
      <td>inverse</td>
      <td>
        <span>min:${S.range.min}</span>
        <input disabled type='range' min=${S.range.min} max=${S.range.max} value=${S.range.max - (S.range.value)} />
        <span>max:${S.range.max}</span>
        <span> (value:${100 - S.range.value})</span>
      </td>
    </tr>

    <tr>
      <td>repeat</td>
      <td>
        <span>min:${S.repeat.min}</span>
        <input disabled type='range' oninput=${e => P.repeat.value = e.target.value} min=${S.repeat.min} max=${S.repeat.max} value=${S.repeat.value} />
        <span>max:${S.repeat.max}</span>
        <span> (value:${S.repeat.value})</span>
      </td>
    </tr>
    </table>
  `);
};
