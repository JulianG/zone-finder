"use strict";exports.getZonesInGrid=function(t,n=function([t,n]){return[[t-1,n],[t+1,n],[t,n-1],[t,n+1]]}){const e=t.length,r=t[0].length,s=([n,e])=>t[n][e],c=([t,n])=>t>=0&&n>=0&&t<e&&n<r,u=[],o=[],l=([t,n])=>o.some(([e,r])=>e===t&&r===n),f=(t,e)=>{o.push(t);const r=s(t);e=e||(t=>{const n={type:t,cells:[]};return u.push(n),n})(r),e.cells.push(t);const h=n(t).filter(c).filter(t=>s(t)===r);h.forEach(t=>{l(t)||f(t,e)})};return function(t){return t.reduce((t,n,e)=>[...t,...n.map((t,n)=>[e,n])],[])}(t).forEach(t=>{l(t)||f(t,null)}),u};
//# sourceMappingURL=zone-finder.cjs.production.js.map
