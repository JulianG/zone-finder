!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):(e=e||self,n(e["zone-finder"]={}))}(this,function(e){"use strict";e.getZonesInGrid=function(e,n=function([e,n]){return[[e-1,n],[e+1,n],[e,n-1],[e,n+1]]}){const t=e.length,o=e[0].length,f=([n,t])=>e[n][t],r=([e,n])=>e>=0&&n>=0&&e<t&&n<o,s=[],u=[],c=([e,n])=>u.some(([t,o])=>t===e&&o===n),i=(e,t)=>{u.push(e);const o=f(e);t=t||(e=>{const n={type:e,cells:[]};return s.push(n),n})(o),t.cells.push(e);const l=n(e).filter(r).filter(e=>f(e)===o);l.forEach(e=>{c(e)||i(e,t)})};return function(e){return e.reduce((e,n,t)=>[...e,...n.map((e,n)=>[t,n])],[])}(e).forEach(e=>{c(e)||i(e,null)}),s}});
//# sourceMappingURL=zone-finder.umd.production.js.map
