(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?t():'function'==typeof define&&define.amd?define(t):t()})(this,function(){'use strict';function e(e,t){e.title=t.title,t.published&&(t.published instanceof Date?e.publishedDate=t.published:t.published.constructor===String&&(e.publishedDate=new Date(t.published))),t.publishedDate&&(t.publishedDate instanceof Date?e.publishedDate=t.publishedDate:t.publishedDate.constructor===String?e.publishedDate=new Date(t.publishedDate):console.error('Don\'t know what to do with published date: '+t.publishedDate)),e.description=t.description,e.authors=t.authors.map((e)=>new Qn(e)),e.editors=t.editors.map((e)=>new Gn(e)),e.lecturers=t.lecturers.map((e)=>new ei(e)),e.katex=t.katex,e.password=t.password,t.doi&&(e.doi=t.doi)}function t(e=document){const t=new Set,n=e.querySelectorAll('d-cite');for(const i of n){const e=i.getAttribute('key').split(',');for(const n of e)t.add(n)}return[...t]}function n(e,t,n,i){if(null==e.author)return'';var a=e.author.split(' and ');let d=a.map((e)=>{if(e=e.trim(),-1!=e.indexOf(','))var n=e.split(',')[0].trim(),i=e.split(',')[1];else if(-1!=e.indexOf(' '))var n=e.split(' ').slice(-1)[0].trim(),i=e.split(' ').slice(0,-1).join(' ');else var n=e.trim();var a='';return void 0!=i&&(a=i.trim().split(' ').map((e)=>e.trim()[0]),a=a.join('.')+'.'),t.replace('${F}',i).replace('${L}',n).replace('${I}',a).trim()});if(1<a.length){var r=d.slice(0,a.length-1).join(n);return r+=(i||n)+d[a.length-1],r}return d[0]}function i(e){var t=e.journal||e.booktitle||'';if('volume'in e){var n=e.issue||e.number;n=void 0==n?'':'('+n+')',t+=', Vol '+e.volume+n}return'pages'in e&&(t+=', pp. '+e.pages),''!=t&&(t+='. '),'publisher'in e&&(t+=e.publisher,'.'!=t[t.length-1]&&(t+='.')),t}function a(e){if('url'in e){var t=e.url,n=/arxiv\.org\/abs\/([0-9\.]*)/.exec(t);if(null!=n&&(t=`http://arxiv.org/pdf/${n[1]}.pdf`),'.pdf'==t.slice(-4))var i='PDF';else if('.html'==t.slice(-5))var i='HTML';return` &ensp;<a href="${t}">[${i||'link'}]</a>`}return''}function d(e,t){return'doi'in e?`${t?'<br>':''} <a href="https://doi.org/${e.doi}" style="text-decoration:inherit;">DOI: ${e.doi}</a>`:''}function r(e){return'<span class="title">'+e.title+'</span> '}function o(e){if(e){var t=r(e);return t+=a(e)+'<br>',e.author&&(t+=n(e,'${L}, ${I}',', ',' and '),(e.year||e.date)&&(t+=', ')),t+=e.year||e.date?(e.year||e.date)+'. ':'. ',t+=i(e),t+=d(e),t}return'?'}function l(e){if(e){var t='';t+='<strong>'+e.title+'</strong>',t+=a(e),t+='<br>';var r=n(e,'${I} ${L}',', ')+'.',o=i(e).trim()+' '+e.year+'. '+d(e,!0);return t+=(r+o).length<Hn(40,e.title.length)?r+' '+o:r+'<br>'+o,t}return'?'}function s(){return-1!==['interactive','complete'].indexOf(document.readyState)}function c(e){for(let t of e.authors){const e=!!t.affiliation,n=!!t.affiliations;if(e)if(n)console.warn(`Author ${t.author} has both old-style ("affiliation" & "affiliationURL") and new style ("affiliations") affiliation information!`);else{let e={name:t.affiliation};t.affiliationURL&&(e.url=t.affiliationURL),t.affiliations=[e]}}return e}function u(e){const t=e.firstElementChild;if(t){const e=t.getAttribute('type');if('json'==e.split('/')[1]){const e=t.textContent,n=JSON.parse(e);return c(n)}console.error('Distill only supports JSON frontmatter tags anymore; no more YAML.')}else console.error('You added a frontmatter tag but did not provide a script tag with front matter data in it. Please take a look at our templates.');return{}}function p(e){const t='distill-prerendered-styles',n=e.getElementById(t);if(!n){const n=e.createElement('style');n.id=t,n.type='text/css';const i=e.createTextNode(yi);n.appendChild(i);const a=e.head.querySelector('script');e.head.insertBefore(n,a)}}function g(e,t){console.debug('Runlevel 0: Polyfill required: '+e.name);const n=document.createElement('script');n.src=e.url,n.async=!1,t&&(n.onload=function(){t(e)}),n.onerror=function(){new Error('Runlevel 0: Polyfills failed to load script '+e.name)},document.head.appendChild(n)}function f(e,t){return t={exports:{}},e(t,t.exports),t.exports}function h(e){return e.replace(/[\t\n ]+/g,' ').replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g,(e,t,n)=>n).replace(/{\\([a-zA-Z])}/g,(e,t)=>t)}function b(e){const t=new Map,n=Ai.toJSON(e);for(const i of n){for(const[e,t]of Object.entries(i.entryTags))i.entryTags[e.toLowerCase()]=h(t);i.entryTags.type=i.entryType,t.set(i.citationKey,i.entryTags)}return t}function m(e){return`@article{${e.slug},
  author = {${e.bibtexAuthors}},
  title = {${e.title}},
  journal = {${e.journal.title}},
  year = {${e.publishedYear}},
  note = {${e.url}},
  doi = {${e.doi}}
}`}function y(e){return`
  <div class="byline grid">
    <div>
      <h3>Lecturers</h3>
      ${e.lecturers.map((e)=>`
        <p class="lecturer">
          ${e.personalURL?`
            <a class="name" href="${e.personalURL}" target="_blank">${e.name}</a>`:`
            <span class="name">${e.name}</span>`}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Authors</h3>
      ${e.authors.map((e)=>`
        <p class="author">
          ${e.personalURL?`
            <a class="name" href="${e.personalURL}" target="_blank">${e.name}</a>`:`
            <span class="name">${e.name}</span>`}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Editors</h3>
      ${e.editors.map((e)=>`
        <p class="editor">
          ${e.personalURL?`
            <a class="name" href="${e.personalURL}" target="_blank">${e.name}</a>`:`
            <span class="name">${e.name}</span>`}
        </p>
      `).join('')}
    </div>
    <div>
      <h3>Published</h3>
      ${e.publishedDate?`
        <p>${e.publishedMonth} ${e.publishedDay}, ${e.publishedYear}</p> `:`
        <p><em>Not published yet.</em></p>`}
    </div>
  </div>
`}function x(e,t,n=document){if(0<t.size){e.style.display='';let i=e.querySelector('.references');if(i)i.innerHTML='';else{const t=n.createElement('style');t.innerHTML=Oi,e.appendChild(t);const a=n.createElement('h3');a.id='references',a.textContent='References',e.appendChild(a),i=n.createElement('ol'),i.id='references-list',i.className='references',e.appendChild(i)}for(const[e,a]of t){const t=n.createElement('li');t.id=e,t.innerHTML=o(a),i.appendChild(t)}}else e.style.display='none'}function k(e,t){let n=`
  <style>

  d-toc {
    contain: layout style;
    display: block;
  }

  d-toc ul {
    padding-left: 0;
  }

  d-toc ul > ul {
    padding-left: 24px;
  }

  d-toc a {
    border-bottom: none;
    text-decoration: none;
  }

  </style>
  <nav role="navigation" class="table-of-contents"></nav>
  <h2>Table of contents</h2>
  <ul>`;for(const i of t){const e='D-TITLE'==i.parentElement.tagName,t=i.getAttribute('no-toc');if(e||t)continue;const a=i.textContent,d='#'+i.getAttribute('id');let r='<li><a href="'+d+'">'+a+'</a></li>';'H3'==i.tagName?r='<ul>'+r+'</ul>':r+='<br>',n+=r}n+='</ul></nav>',e.innerHTML=n}function w(e){return function(t,n){return Qi(e(t),n)}}function v(e,t,n){var i=(t-e)/jn(0,n),a=Fn(Rn(i)/In),d=i/Nn(10,a);return 0<=a?(d>=ta?10:d>=na?5:d>=ia?2:1)*Nn(10,a):-Nn(10,-a)/(d>=ta?10:d>=na?5:d>=ia?2:1)}function S(e,t,n){var i=On(t-e)/jn(0,n),a=Nn(10,Fn(Rn(i)/In)),d=i/a;return d>=ta?a*=10:d>=na?a*=5:d>=ia&&(a*=2),t<e?-a:a}function _(e,t){var n=Object.create(e.prototype);for(var i in t)n[i]=t[i];return n}function L(){}function U(e){var t;return e=(e+'').trim().toLowerCase(),(t=ua.exec(e))?(t=parseInt(t[1],16),new R(15&t>>8|240&t>>4,15&t>>4|240&t,(15&t)<<4|15&t,1)):(t=pa.exec(e))?M(parseInt(t[1],16)):(t=ga.exec(e))?new R(t[1],t[2],t[3],1):(t=fa.exec(e))?new R(255*t[1]/100,255*t[2]/100,255*t[3]/100,1):(t=ha.exec(e))?O(t[1],t[2],t[3],t[4]):(t=ba.exec(e))?O(255*t[1]/100,255*t[2]/100,255*t[3]/100,t[4]):(t=ma.exec(e))?j(t[1],t[2]/100,t[3]/100,1):(t=ya.exec(e))?j(t[1],t[2]/100,t[3]/100,t[4]):xa.hasOwnProperty(e)?M(xa[e]):'transparent'===e?new R(NaN,NaN,NaN,0):null}function M(e){return new R(255&e>>16,255&e>>8,255&e,1)}function O(e,t,n,i){return 0>=i&&(e=t=n=NaN),new R(e,t,n,i)}function N(e){return(e instanceof L||(e=U(e)),!e)?new R:(e=e.rgb(),new R(e.r,e.g,e.b,e.opacity))}function I(e,t,n,i){return 1===arguments.length?N(e):new R(e,t,n,null==i?1:i)}function R(e,t,n,i){this.r=+e,this.g=+t,this.b=+n,this.opacity=+i}function j(e,t,n,i){return 0>=i?e=t=n=NaN:0>=n||1<=n?e=t=NaN:0>=t&&(e=NaN),new F(e,t,n,i)}function q(e){if(e instanceof F)return new F(e.h,e.s,e.l,e.opacity);if(e instanceof L||(e=U(e)),!e)return new F;if(e instanceof F)return e;e=e.rgb();var t=e.r/255,n=e.g/255,i=e.b/255,a=Hn(t,n,i),d=jn(t,n,i),r=NaN,c=d-a,s=(d+a)/2;return c?(r=t===d?(n-i)/c+6*(n<i):n===d?(i-t)/c+2:(t-n)/c+4,c/=0.5>s?d+a:2-d-a,r*=60):c=0<s&&1>s?0:r,new F(r,c,s,e.opacity)}function F(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}function P(e,t,n){return 255*(60>e?t+(n-t)*e/60:180>e?n:240>e?t+(n-t)*(240-e)/60:t)}function H(e){if(e instanceof Y)return new Y(e.l,e.a,e.b,e.opacity);if(e instanceof X){var t=e.h*ka;return new Y(e.l,Un(t)*e.c,Dn(t)*e.c,e.opacity)}e instanceof R||(e=N(e));var n=$(e.r),i=$(e.g),a=$(e.b),d=W((0.4124564*n+0.3575761*i+0.1804375*a)/Kn),r=W((0.2126729*n+0.7151522*i+0.072175*a)/Xn),o=W((0.0193339*n+0.119192*i+0.9503041*a)/Yn);return new Y(116*r-16,500*(d-r),200*(r-o),e.opacity)}function Y(e,t,n,i){this.l=+e,this.a=+t,this.b=+n,this.opacity=+i}function W(e){return e>Ta?Nn(e,1/3):e/Sa+Zn}function V(e){return e>Ca?e*e*e:Sa*(e-Zn)}function K(e){return 255*(0.0031308>=e?12.92*e:1.055*Nn(e,1/2.4)-0.055)}function $(e){return 0.04045>=(e/=255)?e/12.92:Nn((e+0.055)/1.055,2.4)}function z(e){if(e instanceof X)return new X(e.h,e.c,e.l,e.opacity);e instanceof Y||(e=H(e));var t=En(e.b,e.a)*wa;return new X(0>t?t+360:t,An(e.a*e.a+e.b*e.b),e.l,e.opacity)}function X(e,t,n,i){this.h=+e,this.c=+t,this.l=+n,this.opacity=+i}function J(e){if(e instanceof Z)return new Z(e.h,e.s,e.l,e.opacity);e instanceof R||(e=N(e));var t=e.r/255,n=e.g/255,i=e.b/255,a=(Aa*i+E*t-La*n)/(Aa+E-La),d=i-a,r=(D*(n-a)-B*d)/C,o=An(r*r+d*d)/(D*a*(1-a)),l=o?En(r,d)*wa-120:NaN;return new Z(0>l?l+360:l,o,a,e.opacity)}function Q(e,t,n,i){return 1===arguments.length?J(e):new Z(e,t,n,null==i?1:i)}function Z(e,t,n,i){this.h=+e,this.s=+t,this.l=+n,this.opacity=+i}function G(e,n){return function(i){return e+i*n}}function ee(e,n,i){return e=Nn(e,i),n=Nn(n,i)-e,i=1/i,function(a){return Nn(e+a*n,i)}}function te(e){return 1==(e=+e)?ne:function(t,n){return n-t?ee(t,n,e):Ea(isNaN(t)?n:t)}}function ne(e,t){var n=t-e;return n?G(e,n):Ea(isNaN(e)?t:e)}function ie(e){return function(){return e}}function ae(e){return function(n){return e(n)+''}}function de(e){return function t(n){function i(i,t){var a=e((i=Q(i)).h,(t=Q(t)).h),d=ne(i.s,t.s),r=ne(i.l,t.l),o=ne(i.opacity,t.opacity);return function(e){return i.h=a(e),i.s=d(e),i.l=r(Nn(e,n)),i.opacity=o(e),i+''}}return n=+n,i.gamma=t,i}(1)}function oe(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:za(t)}function le(e){return function(t,n){var i=e(t=+t,n=+n);return function(e){return e<=t?0:e>=n?1:i(e)}}}function se(e){return function(n,i){var d=e(n=+n,i=+i);return function(e){return 0>=e?n:1<=e?i:d(e)}}}function ce(e,t,n,i){var a=e[0],d=e[1],r=t[0],o=t[1];return d<a?(a=n(d,a),r=i(o,r)):(a=n(a,d),r=i(r,o)),function(e){return r(a(e))}}function ue(e,t,n,a){var o=Hn(e.length,t.length)-1,l=Array(o),d=Array(o),r=-1;for(e[o]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++r<o;)l[r]=n(e[r],e[r+1]),d[r]=a(t[r],t[r+1]);return function(t){var n=Gi(e,t,1,o)-1;return d[n](l[n](t))}}function pe(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp())}function ge(e,t){function n(){return a=2<Hn(o.length,l.length)?ue:ce,d=r=null,i}function i(t){return(d||(d=a(o,l,c?le(e):e,s)))(+t)}var a,d,r,o=Ba,l=Ba,s=qa,c=!1;return i.invert=function(e){return(r||(r=a(l,o,oe,c?se(t):t)))(+e)},i.domain=function(e){return arguments.length?(o=ra.call(e,Ya),n()):o.slice()},i.range=function(e){return arguments.length?(l=oa.call(e),n()):l.slice()},i.rangeRound=function(e){return l=oa.call(e),s=Fa,n()},i.clamp=function(e){return arguments.length?(c=!!e,n()):c},i.interpolate=function(e){return arguments.length?(s=e,n()):s},n()}function fe(e){return new he(e)}function he(e){if(!(t=Qa.exec(e)))throw new Error('invalid format: '+e);var t,n=t[1]||' ',i=t[2]||'>',a=t[3]||'-',d=t[4]||'',r=!!t[5],o=t[6]&&+t[6],l=!!t[7],s=t[8]&&+t[8].slice(1),c=t[9]||'';'n'===c?(l=!0,c='g'):!Ja[c]&&(c=''),(r||'0'===n&&'='===i)&&(r=!0,n='0',i='='),this.fill=n,this.align=i,this.sign=a,this.symbol=d,this.zero=r,this.width=o,this.comma=l,this.precision=s,this.type=c}function be(e){var t=e.domain;return e.ticks=function(e){var n=t();return aa(n[0],n[n.length-1],null==e?10:e)},e.tickFormat=function(e,n){return rd(t(),e,n)},e.nice=function(n){null==n&&(n=10);var i,a=t(),d=0,r=a.length-1,o=a[d],l=a[r];return l<o&&(i=o,o=l,l=i,i=d,d=r,r=i),i=v(o,l,n),0<i?(o=Fn(o/i)*i,l=qn(l/i)*i,i=v(o,l,n)):0>i&&(o=qn(o*i)/i,l=Fn(l*i)/i,i=v(o,l,n)),0<i?(a[d]=Fn(o/i)*i,a[r]=qn(l/i)*i,t(a)):0>i&&(a[d]=qn(o*i)/i,a[r]=Fn(l*i)/i,t(a)),e},e}function me(){var e=ge(oe,Oa);return e.copy=function(){return pe(e,me())},be(e)}function ye(e,t,n,i){function a(t){return e(t=new Date(+t)),t}return a.floor=a,a.ceil=function(n){return e(n=new Date(n-1)),t(n,1),e(n),n},a.round=function(e){var t=a(e),n=a.ceil(e);return e-t<n-e?t:n},a.offset=function(e,n){return t(e=new Date(+e),null==n?1:Fn(n)),e},a.range=function(n,i,d){var r=[];if(n=a.ceil(n),d=null==d?1:Fn(d),!(n<i)||!(0<d))return r;do r.push(new Date(+n));while((t(n,d),e(n),n<i));return r},a.filter=function(n){return ye(function(t){if(t>=t)for(;e(t),!n(t);)t.setTime(t-1)},function(e,i){if(e>=e)if(0>i)for(;0>=++i;)for(;t(e,-1),!n(e););else for(;0<=--i;)for(;t(e,1),!n(e););})},n&&(a.count=function(t,i){return od.setTime(+t),ld.setTime(+i),e(od),e(ld),Fn(n(od,ld))},a.every=function(e){return e=Fn(e),isFinite(e)&&0<e?1<e?a.filter(i?function(t){return 0==i(t)%e}:function(t){return 0==a.count(0,t)%e}):a:null}),a}function xe(e){return ye(function(t){t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)},function(e,t){e.setDate(e.getDate()+7*t)},function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*ud)/fd})}function ke(e){return ye(function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)},function(e,t){e.setUTCDate(e.getUTCDate()+7*t)},function(e,t){return(t-e)/fd})}function we(e){if(0<=e.y&&100>e.y){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function ve(e){if(0<=e.y&&100>e.y){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function Ce(e){return{y:e,m:0,d:1,H:0,M:0,S:0,L:0}}function Se(e){function t(e,t){return function(a){var d,r,o,l=[],s=-1,i=0,c=e.length;for(a instanceof Date||(a=new Date(+a));++s<c;)37===e.charCodeAt(s)&&(l.push(e.slice(i,s)),null==(r=Yd[d=e.charAt(++s)])?r='e'===d?' ':'0':d=e.charAt(++s),(o=t[d])&&(d=o(a,r)),l.push(d),i=s+1);return l.push(e.slice(i,s)),l.join('')}}function n(e,t){return function(n){var r=Ce(1900),d=a(r,e,n+='',0);if(d!=n.length)return null;if('p'in r&&(r.H=r.H%12+12*r.p),'W'in r||'U'in r){'w'in r||(r.w='W'in r?1:0);var i='Z'in r?ve(Ce(r.y)).getUTCDay():t(Ce(r.y)).getDay();r.m=0,r.d='W'in r?(r.w+6)%7+7*r.W-(i+5)%7:r.w+7*r.U-(i+6)%7}return'Z'in r?(r.H+=0|r.Z/100,r.M+=r.Z%100,ve(r)):t(r)}}function a(e,t,a,d){for(var r,o,l=0,i=t.length,n=a.length;l<i;){if(d>=n)return-1;if(r=t.charCodeAt(l++),37===r){if(r=t.charAt(l++),o=S[r in Yd?t.charAt(l++):r],!o||0>(d=o(e,a,d)))return-1;}else if(r!=a.charCodeAt(d++))return-1}return d}var r=e.dateTime,o=e.date,l=e.time,i=e.periods,s=e.days,c=e.shortDays,u=e.months,p=e.shortMonths,g=Le(i),f=Ae(i),h=Le(s),b=Ae(s),m=Le(c),y=Ae(c),x=Le(u),k=Ae(u),w=Le(p),v=Ae(p),d={a:function(e){return c[e.getDay()]},A:function(e){return s[e.getDay()]},b:function(e){return p[e.getMonth()]},B:function(e){return u[e.getMonth()]},c:null,d:Ye,e:Ye,H:Be,I:We,j:Ve,L:Ke,m:$e,M:Xe,p:function(e){return i[+(12<=e.getHours())]},S:Je,U:Qe,w:Ze,W:Ge,x:null,X:null,y:et,Y:tt,Z:nt,"%":mt},C={a:function(e){return c[e.getUTCDay()]},A:function(e){return s[e.getUTCDay()]},b:function(e){return p[e.getUTCMonth()]},B:function(e){return u[e.getUTCMonth()]},c:null,d:it,e:it,H:at,I:dt,j:rt,L:ot,m:lt,M:st,p:function(e){return i[+(12<=e.getUTCHours())]},S:ct,U:ut,w:pt,W:gt,x:null,X:null,y:ft,Y:ht,Z:bt,"%":mt},S={a:function(e,t,a){var i=m.exec(t.slice(a));return i?(e.w=y[i[0].toLowerCase()],a+i[0].length):-1},A:function(e,t,a){var i=h.exec(t.slice(a));return i?(e.w=b[i[0].toLowerCase()],a+i[0].length):-1},b:function(e,t,a){var i=w.exec(t.slice(a));return i?(e.m=v[i[0].toLowerCase()],a+i[0].length):-1},B:function(e,t,a){var i=x.exec(t.slice(a));return i?(e.m=k[i[0].toLowerCase()],a+i[0].length):-1},c:function(e,t,n){return a(e,r,t,n)},d:Re,e:Re,H:qe,I:qe,j:je,L:He,m:Ie,M:Fe,p:function(e,t,a){var i=g.exec(t.slice(a));return i?(e.p=f[i[0].toLowerCase()],a+i[0].length):-1},S:Pe,U:De,w:Ee,W:Ue,x:function(e,t,n){return a(e,o,t,n)},X:function(e,t,n){return a(e,l,t,n)},y:Oe,Y:Me,Z:Ne,"%":ze};return d.x=t(o,d),d.X=t(l,d),d.c=t(r,d),C.x=t(o,C),C.X=t(l,C),C.c=t(r,C),{format:function(e){var n=t(e+='',d);return n.toString=function(){return e},n},parse:function(e){var t=n(e+='',we);return t.toString=function(){return e},t},utcFormat:function(e){var n=t(e+='',C);return n.toString=function(){return e},n},utcParse:function(e){var t=n(e,ve);return t.toString=function(){return e},t}}}function Te(e,t,n){var i=0>e?'-':'',a=(i?-e:e)+'',d=a.length;return i+(d<n?Array(n-d+1).join(t)+a:a)}function _e(e){return e.replace(Vd,'\\$&')}function Le(e){return new RegExp('^(?:'+e.map(_e).join('|')+')','i')}function Ae(e){for(var t={},a=-1,i=e.length;++a<i;)t[e[a].toLowerCase()]=a;return t}function Ee(e,t,a){var i=Bd.exec(t.slice(a,a+1));return i?(e.w=+i[0],a+i[0].length):-1}function De(e,t,a){var i=Bd.exec(t.slice(a));return i?(e.U=+i[0],a+i[0].length):-1}function Ue(e,t,a){var i=Bd.exec(t.slice(a));return i?(e.W=+i[0],a+i[0].length):-1}function Me(e,t,a){var i=Bd.exec(t.slice(a,a+4));return i?(e.y=+i[0],a+i[0].length):-1}function Oe(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.y=+i[0]+(68<+i[0]?1900:2e3),a+i[0].length):-1}function Ne(e,t,a){var i=/^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(t.slice(a,a+6));return i?(e.Z=i[1]?0:-(i[2]+(i[3]||'00')),a+i[0].length):-1}function Ie(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.m=i[0]-1,a+i[0].length):-1}function Re(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.d=+i[0],a+i[0].length):-1}function je(e,t,a){var i=Bd.exec(t.slice(a,a+3));return i?(e.m=0,e.d=+i[0],a+i[0].length):-1}function qe(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.H=+i[0],a+i[0].length):-1}function Fe(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.M=+i[0],a+i[0].length):-1}function Pe(e,t,a){var i=Bd.exec(t.slice(a,a+2));return i?(e.S=+i[0],a+i[0].length):-1}function He(e,t,a){var i=Bd.exec(t.slice(a,a+3));return i?(e.L=+i[0],a+i[0].length):-1}function ze(e,t,a){var i=Wd.exec(t.slice(a,a+1));return i?a+i[0].length:-1}function Ye(e,t){return Te(e.getDate(),t,2)}function Be(e,t){return Te(e.getHours(),t,2)}function We(e,t){return Te(e.getHours()%12||12,t,2)}function Ve(e,t){return Te(1+yd.count(Ld(e),e),t,3)}function Ke(e,t){return Te(e.getMilliseconds(),t,3)}function $e(e,t){return Te(e.getMonth()+1,t,2)}function Xe(e,t){return Te(e.getMinutes(),t,2)}function Je(e,t){return Te(e.getSeconds(),t,2)}function Qe(e,t){return Te(xd.count(Ld(e),e),t,2)}function Ze(e){return e.getDay()}function Ge(e,t){return Te(kd.count(Ld(e),e),t,2)}function et(e,t){return Te(e.getFullYear()%100,t,2)}function tt(e,t){return Te(e.getFullYear()%1e4,t,4)}function nt(e){var t=e.getTimezoneOffset();return(0<t?'-':(t*=-1,'+'))+Te(0|t/60,'0',2)+Te(t%60,'0',2)}function it(e,t){return Te(e.getUTCDate(),t,2)}function at(e,t){return Te(e.getUTCHours(),t,2)}function dt(e,t){return Te(e.getUTCHours()%12||12,t,2)}function rt(e,t){return Te(1+Dd.count(Fd(e),e),t,3)}function ot(e,t){return Te(e.getUTCMilliseconds(),t,3)}function lt(e,t){return Te(e.getUTCMonth()+1,t,2)}function st(e,t){return Te(e.getUTCMinutes(),t,2)}function ct(e,t){return Te(e.getUTCSeconds(),t,2)}function ut(e,t){return Te(Ud.count(Fd(e),e),t,2)}function pt(e){return e.getUTCDay()}function gt(e,t){return Te(Md.count(Fd(e),e),t,2)}function ft(e,t){return Te(e.getUTCFullYear()%100,t,2)}function ht(e,t){return Te(e.getUTCFullYear()%1e4,t,4)}function bt(){return'+0000'}function mt(){return'%'}function yt(e){var i=e.length;return function(n){return e[jn(0,Hn(i-1,Fn(n*i)))]}}function xt(){for(var e,t=0,i=arguments.length,n={};t<i;++t){if(!(e=arguments[t]+'')||e in n)throw new Error('illegal type: '+e);n[e]=[]}return new kt(n)}function kt(e){this._=e}function wt(e,n){return e.trim().split(/^|\s+/).map(function(e){var a='',d=e.indexOf('.');if(0<=d&&(a=e.slice(d+1),e=e.slice(0,d)),e&&!n.hasOwnProperty(e))throw new Error('unknown type: '+e);return{type:e,name:a}})}function vt(e,t){for(var a,d=0,i=e.length;d<i;++d)if((a=e[d]).name===t)return a.value}function Ct(e,t,a){for(var d=0,i=e.length;d<i;++d)if(e[d].name===t){e[d]=ir,e=e.slice(0,d).concat(e.slice(d+1));break}return null!=a&&e.push({name:t,value:a}),e}function St(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===ar&&t.documentElement.namespaceURI===ar?t.createElement(e):t.createElementNS(n,e)}}function Tt(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function _t(e,t,n){return e=Lt(e,t,n),function(t){var n=t.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||e.call(this,t)}}function Lt(e,t,n){return function(i){var a=gr;gr=i;try{e.call(this,this.__data__,t,n)}finally{gr=a}}}function At(e){return e.trim().split(/^|\s+/).map(function(e){var n='',a=e.indexOf('.');return 0<=a&&(n=e.slice(a+1),e=e.slice(0,a)),{type:e,name:n}})}function Et(e){return function(){var t=this.__on;if(t){for(var n,a=0,d=-1,i=t.length;a<i;++a)(n=t[a],(!e.type||n.type===e.type)&&n.name===e.name)?this.removeEventListener(n.type,n.listener,n.capture):t[++d]=n;++d?t.length=d:delete this.__on}}}function Dt(e,t,n){var a=pr.hasOwnProperty(e.type)?_t:Lt;return function(r,d,i){var l,o=this.__on,s=a(t,d,i);if(o)for(var c=0,u=o.length;c<u;++c)if((l=o[c]).type===e.type&&l.name===e.name)return this.removeEventListener(l.type,l.listener,l.capture),this.addEventListener(l.type,l.listener=s,l.capture=n),void(l.value=t);this.addEventListener(e.type,s,n),l={type:e.type,name:e.name,value:t,listener:s,capture:n},o?o.push(l):this.__on=[l]}}function Ut(e,t,n,i){var a=gr;e.sourceEvent=gr,gr=e;try{return t.apply(n,i)}finally{gr=a}}function Mt(){}function Ot(){return[]}function Nt(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}function It(e,t,n,a,d,r){for(var o,l=0,i=t.length,s=r.length;l<s;++l)(o=t[l])?(o.__data__=r[l],a[l]=o):n[l]=new Nt(e,r[l]);for(;l<i;++l)(o=t[l])&&(d[l]=o)}function Rt(e,t,n,a,d,r,o){var l,i,s,c={},u=t.length,p=r.length,g=Array(u);for(l=0;l<u;++l)(i=t[l])&&(g[l]=s=vr+o.call(i,i.__data__,l,t),s in c?d[l]=i:c[s]=i);for(l=0;l<p;++l)s=vr+o.call(e,r[l],l,r),(i=c[s])?(a[l]=i,i.__data__=r[l],c[s]=null):n[l]=new Nt(e,r[l]);for(l=0;l<u;++l)(i=t[l])&&c[g[l]]===i&&(d[l]=i)}function jt(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function qt(e){return function(){this.removeAttribute(e)}}function Ft(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Pt(e,t){return function(){this.setAttribute(e,t)}}function Ht(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function zt(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttribute(e):this.setAttribute(e,n)}}function Yt(e,t){return function(){var n=t.apply(this,arguments);null==n?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function Bt(e){return function(){this.style.removeProperty(e)}}function Wt(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Vt(e,t,n){return function(){var i=t.apply(this,arguments);null==i?this.style.removeProperty(e):this.style.setProperty(e,i,n)}}function Kt(e,t){return e.style.getPropertyValue(t)||Cr(e).getComputedStyle(e,null).getPropertyValue(t)}function $t(e){return function(){delete this[e]}}function Xt(e,t){return function(){this[e]=t}}function Jt(e,t){return function(){var n=t.apply(this,arguments);null==n?delete this[e]:this[e]=n}}function Qt(e){return e.trim().split(/^|\s+/)}function Zt(e){return e.classList||new Gt(e)}function Gt(e){this._node=e,this._names=Qt(e.getAttribute('class')||'')}function en(e,t){for(var a=Zt(e),d=-1,i=t.length;++d<i;)a.add(t[d])}function tn(e,t){for(var a=Zt(e),d=-1,i=t.length;++d<i;)a.remove(t[d])}function nn(e){return function(){en(this,e)}}function an(e){return function(){tn(this,e)}}function dn(e,t){return function(){(t.apply(this,arguments)?en:tn)(this,e)}}function rn(){this.textContent=''}function on(e){return function(){this.textContent=e}}function ln(e){return function(){var t=e.apply(this,arguments);this.textContent=null==t?'':t}}function sn(){this.innerHTML=''}function cn(e){return function(){this.innerHTML=e}}function un(e){return function(){var t=e.apply(this,arguments);this.innerHTML=null==t?'':t}}function pn(){this.nextSibling&&this.parentNode.appendChild(this)}function gn(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function fn(){return null}function hn(){var e=this.parentNode;e&&e.removeChild(this)}function bn(e,t,n){var i=Cr(e),a=i.CustomEvent;'function'==typeof a?a=new a(t,n):(a=i.document.createEvent('Event'),n?(a.initEvent(t,n.bubbles,n.cancelable),a.detail=n.detail):a.initEvent(t,!1,!1)),e.dispatchEvent(a)}function mn(e,t){return function(){return bn(this,e,t)}}function yn(e,t){return function(){return bn(this,e,t.apply(this,arguments))}}function xn(e,t){this._groups=e,this._parents=t}function kn(){gr.stopImmediatePropagation()}function wn(e,t){var n=e.document.documentElement,i=Tr(e).on('dragstart.drag',null);t&&(i.on('click.drag',Lr,!0),setTimeout(function(){i.on('click.drag',null)},0)),'onselectstart'in n?i.on('selectstart.drag',null):(n.style.MozUserSelect=n.__noselect,delete n.__noselect)}function vn(e,t,n,i,a,d,r,o,l,s){this.target=e,this.type=t,this.subject=n,this.identifier=i,this.active=a,this.x=d,this.y=r,this.dx=o,this.dy=l,this._=s}function Cn(){return!gr.button}function Sn(){return this.parentNode}function Tn(e){return null==e?{x:gr.x,y:gr.y}:e}function _n(){return'ontouchstart'in this}function Ln(e){let t=jr;'undefined'!=typeof e.githubUrl&&(t+=`
    <h3 id="updates-and-corrections">Updates and Corrections</h3>
    <p>`,e.githubCompareUpdatesUrl&&(t+=`<a href="${e.githubCompareUpdatesUrl}">View all changes</a> to this article since it was first published.`),t+=`
    If you see mistakes or want to suggest changes, please <a href="${e.githubUrl+'/issues/new'}">create an issue on GitHub</a>. </p>
    `);const n=e.journal;return'undefined'!=typeof n&&'Distill'===n.title&&(t+=`
    <h3 id="reuse">Reuse</h3>
    <p>Diagrams and text are licensed under Creative Commons Attribution <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a> with the <a class="github" href="${e.githubUrl}">source available on GitHub</a>, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.</p>
    `),'undefined'!=typeof e.publishedDate&&(t+=`
    <h3 id="citation">Citation</h3>
    <p>For attribution in academic contexts, please cite this work as</p>
    <pre class="citation short">${e.concatenatedAuthors}, "${e.title}", Distill, ${e.publishedYear}.</pre>
    <p>BibTeX citation</p>
    <pre class="citation long">${m(e)}</pre>
    `),t}var An=Math.sqrt,En=Math.atan2,Dn=Math.sin,Un=Math.cos,Mn=Math.PI,On=Math.abs,Nn=Math.pow,In=Math.LN10,Rn=Math.log,jn=Math.max,qn=Math.ceil,Fn=Math.floor,Pn=Math.round,Hn=Math.min;const zn=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],Bn=['Jan.','Feb.','March','April','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'],Wn=(e)=>10>e?'0'+e:e,Vn=function(e){const t=zn[e.getDay()].substring(0,3),n=Wn(e.getDate()),i=Bn[e.getMonth()].substring(0,3),a=e.getFullYear().toString(),d=e.getUTCHours().toString(),r=e.getUTCMinutes().toString(),o=e.getUTCSeconds().toString();return`${t}, ${n} ${i} ${a} ${d}:${r}:${o} Z`},$n=function(e){const t=Array.from(e).reduce((e,[t,n])=>Object.assign(e,{[t]:n}),{});return t},Jn=function(e){const t=new Map;for(var n in e)e.hasOwnProperty(n)&&t.set(n,e[n]);return t};class Qn{constructor(e){this.name=e.author,this.personalURL=e.authorURL,this.affiliation=e.affiliation,this.affiliationURL=e.affiliationURL,this.affiliations=e.affiliations||[]}get firstName(){const e=this.name.split(' ');return e.slice(0,e.length-1).join(' ')}get lastName(){const e=this.name.split(' ');return e[e.length-1]}}class Gn{constructor(e){this.name=e.editor,this.personalURL=e.editorURL,this.affiliation=e.affiliation,this.affiliationURL=e.affiliationURL,this.affiliations=e.affiliations||[]}get firstName(){const e=this.name.split(' ');return e.slice(0,e.length-1).join(' ')}get lastName(){const e=this.name.split(' ');return e[e.length-1]}}class ei{constructor(e){this.name=e.lecturer,this.personalURL=e.lecturerURL,this.affiliation=e.affiliation,this.affiliationURL=e.affiliationURL,this.affiliations=e.affiliations||[]}get firstName(){const e=this.name.split(' ');return e.slice(0,e.length-1).join(' ')}get lastName(){const e=this.name.split(' ');return e[e.length-1]}}class ti{constructor(){this.title='unnamed article',this.description='',this.authors=[],this.editors=[],this.lecturers=[],this.bibliography=new Map,this.bibliographyParsed=!1,this.citations=[],this.citationsCollected=!1,this.journal={},this.katex={},this.doi=void 0,this.publishedDate=void 0}set url(e){this._url=e}get url(){if(this._url)return this._url;return this.distillPath&&this.journal.url?this.journal.url+'/'+this.distillPath:this.journal.url?this.journal.url:void 0}get githubUrl(){return this.githubPath?'https://github.com/'+this.githubPath:void 0}set previewURL(e){this._previewURL=e}get previewURL(){return this._previewURL?this._previewURL:this.url+'/thumbnail.jpg'}get publishedDateRFC(){return Vn(this.publishedDate)}get updatedDateRFC(){return Vn(this.updatedDate)}get publishedYear(){return this.publishedDate.getFullYear()}get publishedMonth(){return Bn[this.publishedDate.getMonth()]}get publishedDay(){return this.publishedDate.getDate()}get publishedMonthPadded(){return Wn(this.publishedDate.getMonth()+1)}get publishedDayPadded(){return Wn(this.publishedDate.getDate())}get publishedISODateOnly(){return this.publishedDate.toISOString().split('T')[0]}get volume(){const e=this.publishedYear-2015;if(1>e)throw new Error('Invalid publish date detected during computing volume');return e}get issue(){return this.publishedDate.getMonth()+1}get concatenatedAuthors(){if(2<this.authors.length)return this.authors[0].lastName+', et al.';return 2===this.authors.length?this.authors[0].lastName+' & '+this.authors[1].lastName:1===this.authors.length?this.authors[0].lastName:void 0}get bibtexAuthors(){return this.authors.map((e)=>{return e.lastName+', '+e.firstName}).join(' and ')}get slug(){let e='';return this.authors.length&&(e+=this.authors[0].lastName.toLowerCase(),e+=this.publishedYear,e+=this.title.split(' ')[0].toLowerCase()),e||'Untitled'}get bibliographyEntries(){return new Map(this.citations.map((e)=>{const t=this.bibliography.get(e);return[e,t]}))}set bibliography(e){e instanceof Map?this._bibliography=e:'object'==typeof e&&(this._bibliography=Jn(e))}get bibliography(){return this._bibliography}static fromObject(e){const t=new ti;return Object.assign(t,e),t}assignToObject(e){Object.assign(e,this),e.bibliography=$n(this.bibliographyEntries),e.url=this.url,e.doi=this.doi,e.githubUrl=this.githubUrl,e.previewURL=this.previewURL,this.publishedDate&&(e.volume=this.volume,e.issue=this.issue,e.publishedDateRFC=this.publishedDateRFC,e.publishedYear=this.publishedYear,e.publishedMonth=this.publishedMonth,e.publishedDay=this.publishedDay,e.publishedMonthPadded=this.publishedMonthPadded,e.publishedDayPadded=this.publishedDayPadded),this.updatedDate&&(e.updatedDateRFC=this.updatedDateRFC),e.concatenatedAuthors=this.concatenatedAuthors,e.bibtexAuthors=this.bibtexAuthors,e.slug=this.slug}}const ni=(e)=>{return class extends e{constructor(){super();const e={childList:!0,characterData:!0,subtree:!0},t=new MutationObserver(()=>{t.disconnect(),this.renderIfPossible(),t.observe(this,e)});t.observe(this,e)}connectedCallback(){super.connectedCallback(),this.renderIfPossible()}renderIfPossible(){this.textContent&&this.root&&this.renderContent()}renderContent(){console.error(`Your class ${this.constructor.name} must provide a custom renderContent() method!`)}}},ii=(e,t,n=!0)=>{return(i)=>{const a=document.createElement('template');return a.innerHTML=t,n&&'ShadyCSS'in window&&ShadyCSS.prepareTemplate(a,e),class extends i{static get is(){return e}constructor(){super(),this.clone=document.importNode(a.content,!0),n&&(this.attachShadow({mode:'open'}),this.shadowRoot.appendChild(this.clone))}connectedCallback(){n?'ShadyCSS'in window&&ShadyCSS.styleElement(this):this.insertBefore(this.clone,this.firstChild)}get root(){return n?this.shadowRoot:this}$(e){return this.root.querySelector(e)}$$(e){return this.root.querySelectorAll(e)}}}};var ai='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nspan.katex-display {\n  text-align: center;\n  padding: 8px 0 8px 0;\n  margin: 0.5em 0 0.5em 1em;\n  max-width: 100%;\n}\n\nspan.katex {\n  -webkit-font-smoothing: antialiased;\n  color: rgba(0, 0, 0, 0.8);\n  font-size: 1.18em;\n}\n';const di=function(e,t,n){let i=n,a=0;for(const d=e.length;i<t.length;){const n=t[i];if(0>=a&&t.slice(i,i+d)===e)return i;'\\'===n?i++:'{'===n?a++:'}'===n&&a--;i++}return-1},ri=function(e,t,n,i){const a=[];for(let d=0;d<e.length;d++)if('text'===e[d].type){const r=e[d].data;let o,l=!0,s=0;for(o=r.indexOf(t),-1!==o&&(s=o,a.push({type:'text',data:r.slice(0,s)}),l=!1);;){if(l){if(o=r.indexOf(t,s),-1===o)break;a.push({type:'text',data:r.slice(s,o)}),s=o}else{if(o=di(n,r,s+t.length),-1===o)break;a.push({type:'math',data:r.slice(s+t.length,o),rawData:r.slice(s,o+n.length),display:i}),s=o+n.length}l=!l}a.push({type:'text',data:r.slice(s)})}else a.push(e[d]);return a},oi=function(e,t){let n=[{type:'text',data:e}];for(let a=0;a<t.length;a++){const e=t[a];n=ri(n,e.left,e.right,e.display||!1)}return n},li=function(e,t){const n=oi(e,t.delimiters),a=document.createDocumentFragment();for(let d=0;d<n.length;d++)if('text'===n[d].type)a.appendChild(document.createTextNode(n[d].data));else{const e=document.createElement('d-math'),i=n[d].data;t.displayMode=n[d].display;try{e.textContent=i,t.displayMode&&e.setAttribute('block','')}catch(i){if(!(i instanceof katex.ParseError))throw i;t.errorCallback('KaTeX auto-render: Failed to parse `'+n[d].data+'` with ',i),a.appendChild(document.createTextNode(n[d].rawData));continue}a.appendChild(e)}return a},si=function(e,t){for(let n=0;n<e.childNodes.length;n++){const i=e.childNodes[n];if(3===i.nodeType){const a=li(i.textContent,t);n+=a.childNodes.length-1,e.replaceChild(a,i)}else if(1===i.nodeType){const e=-1===t.ignoredTags.indexOf(i.nodeName.toLowerCase());e&&si(i,t)}}},ci={delimiters:[{left:'$$',right:'$$',display:!0},{left:'\\[',right:'\\]',display:!0},{left:'\\(',right:'\\)',display:!1}],ignoredTags:['script','noscript','style','textarea','pre','code','svg'],errorCallback:function(e,t){console.error(e,t)}},ui=function(e,t){if(!e)throw new Error('No element provided to render');const n=Object.assign({},ci,t);si(e,n)},pi='<link rel="stylesheet" href="https://distill.pub/third-party/katex/katex.min.css" crossorigin="anonymous">',gi=ii('d-math',`
${pi}
<style>

:host {
  display: inline-block;
  contain: style;
}

:host([block]) {
  display: block;
}

${ai}
</style>
<span id='katex-container'></span>
`);class T extends ni(gi(HTMLElement)){static set katexOptions(e){T._katexOptions=e,T.katexOptions.delimiters&&(T.katexAdded?T.katexLoadedCallback():T.addKatex())}static get katexOptions(){return T._katexOptions||(T._katexOptions={delimiters:[{left:'$$',right:'$$',display:!1}]}),T._katexOptions}static katexLoadedCallback(){const e=document.querySelectorAll('d-math');for(const t of e)t.renderContent();T.katexOptions.delimiters&&ui(document.body,T.katexOptions)}static addKatex(){document.head.insertAdjacentHTML('beforeend',pi);const e=document.createElement('script');e.src='https://distill.pub/third-party/katex/katex.min.js',e.async=!0,e.onload=T.katexLoadedCallback,e.crossorigin='anonymous',document.head.appendChild(e),T.katexAdded=!0}get options(){const e={displayMode:this.hasAttribute('block')};return Object.assign(e,T.katexOptions)}connectedCallback(){super.connectedCallback(),T.katexAdded||T.addKatex()}renderContent(){if('undefined'!=typeof katex){const e=this.root.querySelector('#katex-container');katex.render(this.textContent,e,this.options)}}}T.katexAdded=!1,T.inlineMathRendered=!1,window.DMath=T;class fi extends HTMLElement{static get is(){return'd-front-matter'}constructor(){super();const e=new MutationObserver((e)=>{for(const t of e)if('SCRIPT'===t.target.nodeName||'characterData'===t.type){const e=u(this);this.notify(e)}});e.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(e){const t=new CustomEvent('onFrontMatterChanged',{detail:e,bubbles:!0});document.dispatchEvent(t)}}var hi=function(e,t){const n=e.body,i=n.querySelector('d-article');if(!i)return void console.warn('No d-article tag found; skipping adding optional components!');let a=e.querySelector('d-byline');a||(t.authors?(a=e.createElement('d-byline'),n.insertBefore(a,i)):console.warn('No authors found in front matter; please add them before submission!'));let d=e.querySelector('d-title');d||(d=e.createElement('d-title'),n.insertBefore(d,a));let r=d.querySelector('h1');r||(r=e.createElement('h1'),r.textContent=t.title,d.insertBefore(r,d.firstChild));const o='undefined'!=typeof t.password;let l=n.querySelector('d-interstitial');if(o&&!l){const i='undefined'!=typeof window,a=i&&window.location.hostname.includes('localhost');i&&a||(l=e.createElement('d-interstitial'),l.password=t.password,n.insertBefore(l,n.firstChild))}else!o&&l&&l.parentElement.removeChild(this);let s=e.querySelector('d-appendix');s||(s=e.createElement('d-appendix'),e.body.appendChild(s));let c=e.querySelector('d-footnote-list');c||(c=e.createElement('d-footnote-list'),s.appendChild(c));let u=e.querySelector('d-citation-list');u||(u=e.createElement('d-citation-list'),s.appendChild(u))};const bi=new ti,mi={frontMatter:bi,waitingOn:{bibliography:[],citations:[]},listeners:{onCiteKeyCreated(e){const[t,n]=e.detail;if(!bi.citationsCollected)return void mi.waitingOn.citations.push(()=>mi.listeners.onCiteKeyCreated(e));if(!bi.bibliographyParsed)return void mi.waitingOn.bibliography.push(()=>mi.listeners.onCiteKeyCreated(e));const i=n.map((e)=>bi.citations.indexOf(e));t.numbers=i;const a=n.map((e)=>bi.bibliography.get(e));t.entries=a},onCiteKeyChanged(){bi.citations=t(),bi.citationsCollected=!0;for(const e of mi.waitingOn.citations.slice())e();const e=document.querySelector('d-citation-list'),n=new Map(bi.citations.map((e)=>{return[e,bi.bibliography.get(e)]}));e.citations=n;const i=document.querySelectorAll('d-cite');for(const e of i){const t=e.keys,n=t.map((e)=>bi.citations.indexOf(e));e.numbers=n;const i=t.map((e)=>bi.bibliography.get(e));e.entries=i}},onCiteKeyRemoved(e){mi.listeners.onCiteKeyChanged(e)},onBibliographyChanged(e){const t=document.querySelector('d-citation-list'),n=e.detail;bi.bibliography=n,bi.bibliographyParsed=!0;for(const t of mi.waitingOn.bibliography.slice())t();if(!bi.citationsCollected)return void mi.waitingOn.citations.push(function(){mi.listeners.onBibliographyChanged({target:e.target,detail:e.detail})});if(t.hasAttribute('distill-prerendered'))console.debug('Citation list was prerendered; not updating it.');else{const e=new Map(bi.citations.map((e)=>{return[e,bi.bibliography.get(e)]}));t.citations=e}},onFootnoteChanged(){const e=document.querySelector('d-footnote-list');if(e){const t=document.querySelectorAll('d-footnote');e.footnotes=t}},onFrontMatterChanged(t){const n=t.detail;e(bi,n);const i=document.querySelector('d-interstitial');i&&('undefined'==typeof bi.password?i.parentElement.removeChild(i):i.password=bi.password);const a=document.body.hasAttribute('distill-prerendered');if(!a&&s()){hi(document,bi);const e=document.querySelector('distill-appendix');e&&(e.frontMatter=bi);const t=document.querySelector('d-byline');t&&(t.frontMatter=bi),n.katex&&(T.katexOptions=n.katex)}},DOMContentLoaded(){if(mi.loaded)return void console.warn('Controller received DOMContentLoaded but was already loaded!');if(!s())return void console.warn('Controller received DOMContentLoaded at document.readyState: '+document.readyState+'!');mi.loaded=!0,console.debug('Runlevel 4: Controller running DOMContentLoaded');const e=document.querySelector('d-front-matter'),n=u(e);mi.listeners.onFrontMatterChanged({detail:n}),bi.citations=t(),bi.citationsCollected=!0;for(const e of mi.waitingOn.citations.slice())e();if(bi.bibliographyParsed)for(const e of mi.waitingOn.bibliography.slice())e();const i=document.querySelector('d-footnote-list');if(i){const e=document.querySelectorAll('d-footnote');i.footnotes=e}}}};const yi='/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nhtml {\n  font-size: 14px;\n\tline-height: 1.6em;\n  /* font-family: "Libre Franklin", "Helvetica Neue", sans-serif; */\n  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;\n  /*, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/\n  text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n@media(min-width: 768px) {\n  html {\n    font-size: 16px;\n  }\n}\n\nbody {\n  margin: 0;\n}\n\n/* a {\n  color: #004276;\n} */\n\nfigure {\n  margin: 0;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\ntable th {\n\ttext-align: left;\n}\n\ntable thead {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\ntable thead th {\n  padding-bottom: 0.5em;\n}\n\ntable tbody :first-child td {\n  padding-top: 0.5em;\n}\n\npre {\n  overflow: auto;\n  max-width: 100%;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1em;\n}\n\nsup, sub {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n  line-height: 1em;\n}\n\nsub {\n  top: 0.4em;\n}\n\n.kicker,\n.marker {\n  font-size: 15px;\n  font-weight: 600;\n  color: rgba(0, 0, 0, 0.5);\n}\n\n\n/* Headline */\n\n@media(min-width: 1024px) {\n  d-title h1 span {\n    display: block;\n  }\n}\n\n/* Figure */\n\nfigure {\n  position: relative;\n  margin-bottom: 2.5em;\n  margin-top: 1.5em;\n}\n\nfigcaption+figure {\n\n}\n\nfigure img {\n  width: 100%;\n}\n\nfigure svg text,\nfigure svg tspan {\n}\n\nfigcaption,\n.figcaption {\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 12px;\n  line-height: 1.5em;\n}\n\n@media(min-width: 1024px) {\nfigcaption,\n.figcaption {\n    font-size: 13px;\n  }\n}\n\nfigure.external img {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);\n  padding: 18px;\n  box-sizing: border-box;\n}\n\nfigcaption a {\n  color: rgba(0, 0, 0, 0.6);\n}\n\nfigcaption b,\nfigcaption strong, {\n  font-weight: 600;\n  color: rgba(0, 0, 0, 1.0);\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@supports not (display: grid) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    display: block;\n    padding: 8px;\n  }\n}\n\n.base-grid,\ndistill-header,\nd-title,\nd-abstract,\nd-article,\nd-appendix,\ndistill-appendix,\nd-byline,\nd-footnote-list,\nd-citation-list,\ndistill-footer {\n  display: grid;\n  justify-items: stretch;\n  grid-template-columns: [screen-start] 8px [page-start kicker-start text-start gutter-start middle-start] 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr [text-end page-end gutter-end kicker-end middle-end] 8px [screen-end];\n  grid-column-gap: 8px;\n}\n\n.grid {\n  display: grid;\n  grid-column-gap: 8px;\n}\n\n@media(min-width: 768px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start middle-start text-start] 45px 45px 45px 45px 45px 45px 45px 45px [ kicker-end text-end gutter-start] 45px [middle-end] 45px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1000px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 50px [middle-start] 50px [text-start kicker-end] 50px 50px 50px 50px 50px 50px 50px 50px [text-end gutter-start] 50px [middle-end] 50px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 16px;\n  }\n\n  .grid {\n    grid-column-gap: 16px;\n  }\n}\n\n@media(min-width: 1180px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 60px [middle-start] 60px [text-start kicker-end] 60px 60px 60px 60px 60px 60px 60px 60px [text-end gutter-start] 60px [middle-end] 60px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n@media(min-width: 1280px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 70px [middle-start] 70px [text-start kicker-end] 70px 70px 70px 70px 70px 70px 70px 70px [text-end gutter-start] 70px [middle-end] 70px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n@media(min-width: 1320px) {\n  .base-grid,\n  distill-header,\n  d-title,\n  d-abstract,\n  d-article,\n  d-appendix,\n  distill-appendix,\n  d-byline,\n  d-footnote-list,\n  d-citation-list,\n  distill-footer {\n    grid-template-columns: [screen-start] 1fr [page-start kicker-start] 75px [middle-start] 75px [text-start kicker-end] 75px 75px 75px 75px 75px 75px 75px 75px [text-end gutter-start] 75px [middle-end] 75px [page-end gutter-end] 1fr [screen-end];\n    grid-column-gap: 32px;\n  }\n\n  .grid {\n    grid-column-gap: 32px;\n  }\n}\n\n\n\n\n.base-grid {\n  grid-column: screen;\n}\n\n/* .l-body,\nd-article > *  {\n  grid-column: text;\n}\n\n.l-page,\nd-title > *,\nd-figure {\n  grid-column: page;\n} */\n\n.l-gutter {\n  grid-column: gutter;\n}\n\n.l-text,\n.l-body {\n  grid-column: text;\n}\n\n.l-page {\n  grid-column: page;\n}\n\n.l-body-outset {\n  grid-column: middle;\n}\n\n.l-page-outset {\n  grid-column: page;\n}\n\n.l-screen {\n  grid-column: screen;\n}\n\n.l-screen-inset {\n  grid-column: screen;\n  padding-left: 16px;\n  padding-left: 16px;\n}\n\n\n/* Aside */\n\nd-article aside {\n  grid-column: gutter;\n  font-size: 12px;\n  line-height: 1.6em;\n  color: rgba(0, 0, 0, 0.6)\n}\n\n@media(min-width: 768px) {\n  aside {\n    grid-column: gutter;\n  }\n\n  .side {\n    grid-column: gutter;\n  }\n}\n\nd-article .fake-img {\n    background: #bbb;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);\n    margin-bottom: 12px;\n}\n\nd-article .fake-img > p {\n    font-family: monospace;\n    color: white;\n    text-align: left;\n    margin: 12px 0;\n    text-align: center;\n    font-size: 16px;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-title {\n  padding: 2rem 0 1.5rem;\n  contain: layout style;\n  overflow-x: hidden;\n}\n\n@media(min-width: 768px) {\n  d-title {\n    padding: 4rem 0 1.5rem;\n  }\n}\n\nd-title h1 {\n  grid-column: text;\n  font-size: 40px;\n  font-weight: 700;\n  line-height: 1.1em;\n  margin: 0 0 0.5rem;\n}\n\n@media(min-width: 768px) {\n  d-title h1 {\n    font-size: 50px;\n  }\n}\n\nd-title p {\n  font-weight: 300;\n  font-size: 1.2rem;\n  line-height: 1.55em;\n  grid-column: text;\n}\n\nd-title .status {\n  margin-top: 0px;\n  font-size: 12px;\n  color: #009688;\n  opacity: 0.8;\n  grid-column: kicker;\n}\n\nd-title .status span {\n  line-height: 1;\n  display: inline-block;\n  padding: 6px 0;\n  border-bottom: 1px solid #80cbc4;\n  font-size: 11px;\n  text-transform: uppercase;\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-byline {\n  contain: style;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  font-size: 0.8rem;\n  line-height: 1.8em;\n  padding: 1.5rem 0;\n  min-height: 1.8em;\n}\n\n\nd-byline .byline {\n  grid-template-columns: 1fr 1fr;\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-byline .byline {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n\nd-byline .authors-affiliations {\n  grid-column-end: span 2;\n  grid-template-columns: 1fr 1fr;\n  margin-bottom: 1em;\n}\n\n@media(min-width: 768px) {\n  d-byline .authors-affiliations {\n    margin-bottom: 0;\n  }\n}\n\nd-byline h3 {\n  font-size: 0.6rem;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.5);\n  margin: 0;\n  text-transform: uppercase;\n}\n\nd-byline p {\n  margin: 0;\n}\n\nd-byline a,\nd-article d-byline a {\n  color: rgba(0, 0, 0, 0.8);\n  text-decoration: none;\n  border-bottom: none;\n}\n\nd-article d-byline a:hover {\n  text-decoration: underline;\n  border-bottom: none;\n}\n\nd-byline p.author,\nd-byline p.editor,\nd-byline p.lecturer {\n  font-weight: 500;\n}\n\nd-byline .affiliations {\n\n}\n'+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\nd-article {\n  contain: layout style;\n  overflow-x: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  padding-top: 2rem;\n  color: rgba(0, 0, 0, 0.8);\n}\n\nd-article > * {\n  grid-column: text;\n}\n\n@media(min-width: 768px) {\n  d-article {\n    font-size: 16px;\n  }\n}\n\n@media(min-width: 1024px) {\n  d-article {\n    font-size: 1.06rem;\n    line-height: 1.7em;\n  }\n}\n\n\n/* H2 */\n\n\nd-article .marker {\n  text-decoration: none;\n  border: none;\n  counter-reset: section;\n  grid-column: kicker;\n  line-height: 1.7em;\n}\n\nd-article .marker:hover {\n  border: none;\n}\n\nd-article .marker span {\n  padding: 0 3px 4px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  position: relative;\n  top: 4px;\n}\n\nd-article .marker:hover span {\n  color: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.7);\n}\n\nd-article h2 {\n  font-weight: 600;\n  font-size: 24px;\n  line-height: 1.25em;\n  margin: 2rem 0 1.5rem 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding-bottom: 1rem;\n}\n\n@media(min-width: 1024px) {\n  d-article h2 {\n    font-size: 36px;\n  }\n}\n\n/* H3 */\n\nd-article h3 {\n  font-weight: 700;\n  font-size: 18px;\n  line-height: 1.4em;\n  margin-bottom: 1em;\n  margin-top: 2em;\n}\n\n@media(min-width: 1024px) {\n  d-article h3 {\n    font-size: 20px;\n  }\n}\n\n/* H4 */\n\nd-article h4 {\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 14px;\n  line-height: 1.4em;\n}\n\nd-article a {\n  color: inherit;\n}\n\nd-article p,\nd-article ul,\nd-article ol,\nd-article blockquote {\n  margin-top: 0;\n  margin-bottom: 1em;\n  margin-left: 0;\n  margin-right: 0;\n}\n\nd-article blockquote {\n  border-left: 2px solid rgba(0, 0, 0, 0.2);\n  padding-left: 2em;\n  font-style: italic;\n  color: rgba(0, 0, 0, 0.6);\n}\n\nd-article a {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.4);\n  text-decoration: none;\n}\n\nd-article a:hover {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.8);\n}\n\nd-article .link {\n  text-decoration: underline;\n  cursor: pointer;\n}\n\nd-article ul,\nd-article ol {\n  padding-left: 24px;\n}\n\nd-article li {\n  margin-bottom: 1em;\n  margin-left: 0;\n  padding-left: 0;\n}\n\nd-article li:last-child {\n  margin-bottom: 0;\n}\n\nd-article pre {\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\nd-article hr {\n  grid-column: screen;\n  width: 100%;\n  border: none;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article section {\n  margin-top: 60px;\n  margin-bottom: 60px;\n}\n\nd-article span.equation-mimic {\n  font-family: georgia;\n  font-size: 115%;\n  font-style: italic;\n}\n\nd-article > d-code,\nd-article section > d-code  {\n  display: block;\n}\n\nd-article > d-math[block],\nd-article section > d-math[block]  {\n  display: block;\n}\n\n@media (max-width: 768px) {\n  d-article > d-code,\n  d-article section > d-code,\n  d-article > d-math[block],\n  d-article section > d-math[block] {\n      overflow-x: scroll;\n      -ms-overflow-style: none;  // IE 10+\n      overflow: -moz-scrollbars-none;  // Firefox\n  }\n\n  d-article > d-code::-webkit-scrollbar,\n  d-article section > d-code::-webkit-scrollbar,\n  d-article > d-math[block]::-webkit-scrollbar,\n  d-article section > d-math[block]::-webkit-scrollbar {\n    display: none;  // Safari and Chrome\n  }\n}\n\nd-article .citation {\n  color: #668;\n  cursor: pointer;\n}\n\nd-include {\n  width: auto;\n  display: block;\n}\n\nd-figure {\n  contain: layout style;\n}\n\n/* KaTeX */\n\n.katex, .katex-prerendered {\n  contain: style;\n  display: inline-block;\n}\n\n/* Tables */\n\nd-article table {\n  border-collapse: collapse;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table th {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n\nd-article table td {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\nd-article table tr:last-of-type td {\n  border-bottom: none;\n}\n\nd-article table th,\nd-article table td {\n  font-size: 15px;\n  padding: 2px 8px;\n}\n\nd-article table tbody :first-child td {\n  padding-top: 2px;\n}\n'+ai+'/*\n * Copyright 2018 The Distill Template Authors\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an "AS IS" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n@media print {\n\n  @page {\n    size: 8in 11in;\n    @bottom-right {\n      content: counter(page) " of " counter(pages);\n    }\n  }\n\n  html {\n    /* no general margins -- CSS Grid takes care of those */\n    color: black;\n  }\n\n  header {\n    /* no need to display the header */\n    display: none;\n  }\n\n  .page-content {\n    /* removes superfluous padding */\n    padding: 0;\n  }\n\n  p, code, ul, ol, li, img, d-math, div.equation {\n    page-break-inside: avoid;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    page-break-after: avoid;\n    page-break-inside: avoid;\n  }\n\n  d-appendix {\n    page-break-before: always;\n  }\n\n  d-article hr {\n    margin-top: 20px;\n    margin-bottom: 20px;\n  }\n\n  d-header {\n    visibility: hidden;\n  }\n\n  d-footer {\n    display: none!important;\n  }\n\n}\n',xi=[{name:'WebComponents',support:function(){return'customElements'in window&&'attachShadow'in Element.prototype&&'getRootNode'in Element.prototype&&'content'in document.createElement('template')&&'Promise'in window&&'from'in Array},url:'https://distill.pub/third-party/polyfills/webcomponents-lite.js'},{name:'IntersectionObserver',support:function(){return'IntersectionObserver'in window&&'IntersectionObserverEntry'in window},url:'https://distill.pub/third-party/polyfills/intersection-observer.js'}];class ki{static browserSupportsAllFeatures(){return xi.every((e)=>e.support())}static load(e){const t=function(t){t.loaded=!0,console.debug('Runlevel 0: Polyfill has finished loading: '+t.name),ki.neededPolyfills.every((e)=>e.loaded)&&(console.debug('Runlevel 0: All required polyfills have finished loading.'),console.debug('Runlevel 0->1.'),window.distillRunlevel=1,e())};for(const n of ki.neededPolyfills)g(n,t)}static get neededPolyfills(){return ki._neededPolyfills||(ki._neededPolyfills=xi.filter((e)=>!e.support())),ki._neededPolyfills}}const wi=ii('d-abstract',`
<style>
  :host {
    font-size: 1.25rem;
    line-height: 1.6em;
    color: rgba(0, 0, 0, 0.7);
    -webkit-font-smoothing: antialiased;
  }

  ::slotted(p) {
    margin-top: 0;
    margin-bottom: 1em;
    grid-column: text-start / middle-end;
  }
  ${function(e){return`${e} {
      grid-column: left / text;
    }
  `}('d-abstract')}
</style>

<slot></slot>
`);class vi extends wi(HTMLElement){}const Ci=ii('d-appendix',`
<style>

d-appendix {
  contain: layout style;
  font-size: 0.8em;
  line-height: 1.7em;
  margin-top: 60px;
  margin-bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  color: rgba(0,0,0,0.5);
  padding-top: 60px;
  padding-bottom: 48px;
}

d-appendix h3 {
  grid-column: page-start / text-start;
  font-size: 15px;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0;
  color: rgba(0,0,0,0.65);
}

d-appendix h3 + * {
  margin-top: 1em;
}

d-appendix ol {
  padding: 0 0 0 15px;
}

@media (min-width: 768px) {
  d-appendix ol {
    padding: 0 0 0 30px;
    margin-left: -30px;
  }
}

d-appendix li {
  margin-bottom: 1em;
}

d-appendix a {
  color: rgba(0, 0, 0, 0.6);
}

d-appendix > * {
  grid-column: text;
}

d-appendix > d-footnote-list,
d-appendix > d-citation-list,
d-appendix > distill-appendix {
  grid-column: screen;
}

</style>

`,!1);class Si extends Ci(HTMLElement){}const Ti=/^\s*$/;class _i extends HTMLElement{static get is(){return'd-article'}constructor(){super(),new MutationObserver((e)=>{for(const t of e)for(const e of t.addedNodes)switch(e.nodeName){case'#text':{const t=e.nodeValue;if(!Ti.test(t)){console.warn('Use of unwrapped text in distill articles is discouraged as it breaks layout! Please wrap any text in a <span> or <p> tag. We found the following text: '+t);const n=document.createElement('span');n.innerHTML=e.nodeValue,e.parentNode.insertBefore(n,e),e.parentNode.removeChild(e)}}}}).observe(this,{childList:!0})}}var Li='undefined'==typeof window?'undefined'==typeof global?'undefined'==typeof self?{}:self:global:window,Ai=f(function(e,t){(function(e){function t(){this.months=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'],this.notKey=[',','{','}',' ','='],this.pos=0,this.input='',this.entries=[],this.currentEntry='',this.setInput=function(e){this.input=e},this.getEntries=function(){return this.entries},this.isWhitespace=function(e){return' '==e||'\r'==e||'\t'==e||'\n'==e},this.match=function(e,t){if((void 0==t||null==t)&&(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)==e)this.pos+=e.length;else throw'Token mismatch, expected '+e+', found '+this.input.substring(this.pos);this.skipWhitespace(t)},this.tryMatch=function(e,t){return(void 0==t||null==t)&&(t=!0),this.skipWhitespace(t),this.input.substring(this.pos,this.pos+e.length)==e},this.matchAt=function(){for(;this.input.length>this.pos&&'@'!=this.input[this.pos];)this.pos++;return!('@'!=this.input[this.pos])},this.skipWhitespace=function(e){for(;this.isWhitespace(this.input[this.pos]);)this.pos++;if('%'==this.input[this.pos]&&!0==e){for(;'\n'!=this.input[this.pos];)this.pos++;this.skipWhitespace(e)}},this.value_braces=function(){var e=0;this.match('{',!1);for(var t=this.pos,n=!1;;){if(!n)if('}'==this.input[this.pos]){if(0<e)e--;else{var i=this.pos;return this.match('}',!1),this.input.substring(t,i)}}else if('{'==this.input[this.pos])e++;else if(this.pos>=this.input.length-1)throw'Unterminated value';n='\\'==this.input[this.pos]&&!1==n,this.pos++}},this.value_comment=function(){for(var e='',t=0;!(this.tryMatch('}',!1)&&0==t);){if(e+=this.input[this.pos],'{'==this.input[this.pos]&&t++,'}'==this.input[this.pos]&&t--,this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(start);this.pos++}return e},this.value_quotes=function(){this.match('"',!1);for(var e=this.pos,t=!1;;){if(!t){if('"'==this.input[this.pos]){var n=this.pos;return this.match('"',!1),this.input.substring(e,n)}if(this.pos>=this.input.length-1)throw'Unterminated value:'+this.input.substring(e)}t='\\'==this.input[this.pos]&&!1==t,this.pos++}},this.single_value=function(){var e=this.pos;if(this.tryMatch('{'))return this.value_braces();if(this.tryMatch('"'))return this.value_quotes();var t=this.key();if(t.match('^[0-9]+$'))return t;if(0<=this.months.indexOf(t.toLowerCase()))return t.toLowerCase();throw'Value expected:'+this.input.substring(e)+' for key: '+t},this.value=function(){for(var e=[this.single_value()];this.tryMatch('#');)this.match('#'),e.push(this.single_value());return e.join('')},this.key=function(){for(var e=this.pos;;){if(this.pos>=this.input.length)throw'Runaway key';if(0<=this.notKey.indexOf(this.input[this.pos]))return this.input.substring(e,this.pos);this.pos++}},this.key_equals_value=function(){var e=this.key();if(this.tryMatch('=')){this.match('=');var t=this.value();return[e,t]}throw'... = value expected, equals sign missing:'+this.input.substring(this.pos)},this.key_value_list=function(){var e=this.key_equals_value();for(this.currentEntry.entryTags={},this.currentEntry.entryTags[e[0]]=e[1];this.tryMatch(',')&&(this.match(','),!this.tryMatch('}'));)e=this.key_equals_value(),this.currentEntry.entryTags[e[0]]=e[1]},this.entry_body=function(e){this.currentEntry={},this.currentEntry.citationKey=this.key(),this.currentEntry.entryType=e.substring(1),this.match(','),this.key_value_list(),this.entries.push(this.currentEntry)},this.directive=function(){return this.match('@'),'@'+this.key()},this.preamble=function(){this.currentEntry={},this.currentEntry.entryType='PREAMBLE',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.comment=function(){this.currentEntry={},this.currentEntry.entryType='COMMENT',this.currentEntry.entry=this.value_comment(),this.entries.push(this.currentEntry)},this.entry=function(e){this.entry_body(e)},this.bibtex=function(){for(;this.matchAt();){var e=this.directive();this.match('{'),'@STRING'==e?this.string():'@PREAMBLE'==e?this.preamble():'@COMMENT'==e?this.comment():this.entry(e),this.match('}')}}}e.toJSON=function(e){var n=new t;return n.setInput(e),n.bibtex(),n.entries},e.toBibtex=function(e){var t='';for(var n in e){if(t+='@'+e[n].entryType,t+='{',e[n].citationKey&&(t+=e[n].citationKey+', '),e[n].entry&&(t+=e[n].entry),e[n].entryTags){var i='';for(var a in e[n].entryTags)0!=i.length&&(i+=', '),i+=a+'= {'+e[n].entryTags[a]+'}';t+=i}t+='}\n\n'}return t}})(t)});class Ei extends HTMLElement{static get is(){return'd-bibliography'}constructor(){super();const e=new MutationObserver((e)=>{for(const t of e)('SCRIPT'===t.target.nodeName||'characterData'===t.type)&&this.parseIfPossible()});e.observe(this,{childList:!0,characterData:!0,subtree:!0})}connectedCallback(){requestAnimationFrame(()=>{this.parseIfPossible()})}parseIfPossible(){const e=this.querySelector('script');if(e)if('text/bibtex'==e.type){const t=e.textContent;if(this.bibtex!==t){this.bibtex=t;const e=b(this.bibtex);this.notify(e)}}else if('text/json'==e.type){const t=new Map(JSON.parse(e.textContent));this.notify(t)}else console.warn('Unsupported bibliography script tag type: '+e.type)}notify(e){const t=new CustomEvent('onBibliographyChanged',{detail:e,bubbles:!0});this.dispatchEvent(t)}static get observedAttributes(){return['src']}receivedBibtex(e){const t=b(e.target.response);this.notify(t)}attributeChangedCallback(e,t,n){var i=new XMLHttpRequest;i.onload=(t)=>this.receivedBibtex(t),i.onerror=()=>console.warn(`Could not load Bibtex! (tried ${n})`),i.responseType='text',i.open('GET',n,!0),i.send()}}class Di extends HTMLElement{static get is(){return'd-byline'}set frontMatter(e){this.innerHTML=y(e)}}const Ui=ii('d-cite',`
<style>

:host {
  display: inline-block;
}

.citation {
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 15px 10px 15px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.1)
}

ul li:last-of-type {
  border-bottom: none;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation">
  <span class="citation-number"></span>
</div>
`);class Mi extends Ui(HTMLElement){constructor(){super(),this._numbers=[],this._entries=[]}connectedCallback(){this.outerSpan=this.root.querySelector('#citation-'),this.innerSpan=this.root.querySelector('.citation-number'),this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),this.numbers&&this.displayNumbers(this.numbers),this.entries&&this.displayEntries(this.entries)}static get observedAttributes(){return['key']}attributeChangedCallback(e,t,n){const i=t?'onCiteKeyChanged':'onCiteKeyCreated',a=n.split(',').map((e)=>e.trim()),d={detail:[this,a],bubbles:!0},r=new CustomEvent(i,d);document.dispatchEvent(r)}set key(e){this.setAttribute('key',e)}get key(){return this.getAttribute('key')}get keys(){return this.getAttribute('key').split(',')}set numbers(e){this._numbers=e,this.displayNumbers(e)}get numbers(){return this._numbers}displayNumbers(e){if(this.innerSpan){const t=e.map((e)=>{return-1==e?'?':e+1+''}),n='['+t.join(', ')+']';this.innerSpan.textContent=n}}set entries(e){this._entries=e,this.displayEntries(e)}get entries(){return this._entries}displayEntries(e){this.hoverBox&&(this.hoverBox.innerHTML=`<ul>
      ${e.map(l).map((e)=>`<li>${e}</li>`).join('\n')}
    </ul>`)}}const Oi=`
d-citation-list {
  contain: style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;class Ni extends HTMLElement{static get is(){return'd-citation-list'}connectedCallback(){this.hasAttribute('distill-prerendered')||(this.style.display='none')}set citations(e){x(this,e)}}var Ii=f(function(e){var t='undefined'==typeof window?'undefined'!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{}:window,n=function(){var e=/\blang(?:uage)?-(\w+)\b/i,n=0,a=t.Prism={util:{encode:function(e){return e instanceof i?new i(e.type,a.util.encode(e.content),e.alias):'Array'===a.util.type(e)?e.map(a.util.encode):e.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\u00a0/g,' ')},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,'__id',{value:++n}),e.__id},clone:function(e){var t=a.util.type(e);switch(t){case'Object':var n={};for(var i in e)e.hasOwnProperty(i)&&(n[i]=a.util.clone(e[i]));return n;case'Array':return e.map&&e.map(function(e){return a.util.clone(e)});}return e}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var i in t)n[i]=t[i];return n},insertBefore:function(e,t,n,i){i=i||a.languages;var d=i[e];if(2==arguments.length){for(var r in n=arguments[1],n)n.hasOwnProperty(r)&&(d[r]=n[r]);return d}var o={};for(var l in d)if(d.hasOwnProperty(l)){if(l==t)for(var r in n)n.hasOwnProperty(r)&&(o[r]=n[r]);o[l]=d[l]}return a.languages.DFS(a.languages,function(t,n){n===i[e]&&t!=e&&(this[t]=o)}),i[e]=o},DFS:function(e,t,n,d){for(var r in d=d||{},e)e.hasOwnProperty(r)&&(t.call(e,r,e[r],n||r),'Object'!==a.util.type(e[r])||d[a.util.objId(e[r])]?'Array'===a.util.type(e[r])&&!d[a.util.objId(e[r])]&&(d[a.util.objId(e[r])]=!0,a.languages.DFS(e[r],t,r,d)):(d[a.util.objId(e[r])]=!0,a.languages.DFS(e[r],t,null,d)))}},plugins:{},highlightAll:function(e,t){var n={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run('before-highlightall',n);for(var d,r=n.elements||document.querySelectorAll(n.selector),o=0;d=r[o++];)a.highlightElement(d,!0===e,n.callback)},highlightElement:function(n,i,d){for(var r,o,l=n;l&&!e.test(l.className);)l=l.parentNode;l&&(r=(l.className.match(e)||[,''])[1].toLowerCase(),o=a.languages[r]),n.className=n.className.replace(e,'').replace(/\s+/g,' ')+' language-'+r,l=n.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,'').replace(/\s+/g,' ')+' language-'+r);var s=n.textContent,c={element:n,language:r,grammar:o,code:s};if(a.hooks.run('before-sanity-check',c),!c.code||!c.grammar)return c.code&&(c.element.textContent=c.code),void a.hooks.run('complete',c);if(a.hooks.run('before-highlight',c),i&&t.Worker){var u=new Worker(a.filename);u.onmessage=function(e){c.highlightedCode=e.data,a.hooks.run('before-insert',c),c.element.innerHTML=c.highlightedCode,d&&d.call(c.element),a.hooks.run('after-highlight',c),a.hooks.run('complete',c)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else c.highlightedCode=a.highlight(c.code,c.grammar,c.language),a.hooks.run('before-insert',c),c.element.innerHTML=c.highlightedCode,d&&d.call(n),a.hooks.run('after-highlight',c),a.hooks.run('complete',c)},highlight:function(e,t,n){var d=a.tokenize(e,t);return i.stringify(a.util.encode(d),n)},tokenize:function(e,t){var n=a.Token,d=[e],r=t.rest;if(r){for(var o in r)t[o]=r[o];delete t.rest}tokenloop:for(var o in t)if(t.hasOwnProperty(o)&&t[o]){var l=t[o];l='Array'===a.util.type(l)?l:[l];for(var s=0;s<l.length;++s){var c=l[s],u=c.inside,g=!!c.lookbehind,f=!!c.greedy,h=0,b=c.alias;if(f&&!c.pattern.global){var m=c.pattern.toString().match(/[imuy]*$/)[0];c.pattern=RegExp(c.pattern.source,m+'g')}c=c.pattern||c;for(var y,x=0,i=0;x<d.length;i+=d[x].length,++x){if(y=d[x],d.length>e.length)break tokenloop;if(!(y instanceof n)){c.lastIndex=0;var w=c.exec(y),v=1;if(!w&&f&&x!=d.length-1){if(c.lastIndex=i,w=c.exec(e),!w)break;for(var C=w.index+(g?w[1].length:0),S=w.index+w[0].length,T=x,k=i,p=d.length;T<p&&k<S;++T)k+=d[T].length,C>=k&&(++x,i=k);if(d[x]instanceof n||d[T-1].greedy)continue;v=T-x,y=e.slice(i,k),w.index-=i}if(w){g&&(h=w[1].length);var C=w.index+h,w=w[0].slice(h),S=C+w.length,_=y.slice(0,C),L=y.slice(S),A=[x,v];_&&A.push(_);var E=new n(o,u?a.tokenize(w,u):w,b,w,f);A.push(E),L&&A.push(L),Array.prototype.splice.apply(d,A)}}}}}return d},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var d,r=0;d=n[r++];)d(t)}}},i=a.Token=function(e,t,n,i,a){this.type=e,this.content=t,this.alias=n,this.length=0|(i||'').length,this.greedy=!!a};if(i.stringify=function(e,t,n){if('string'==typeof e)return e;if('Array'===a.util.type(e))return e.map(function(n){return i.stringify(n,t,e)}).join('');var d={type:e.type,content:i.stringify(e.content,t,n),tag:'span',classes:['token',e.type],attributes:{},language:t,parent:n};if('comment'==d.type&&(d.attributes.spellcheck='true'),e.alias){var r='Array'===a.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(d.classes,r)}a.hooks.run('wrap',d);var l=Object.keys(d.attributes).map(function(e){return e+'="'+(d.attributes[e]||'').replace(/"/g,'&quot;')+'"'}).join(' ');return'<'+d.tag+' class="'+d.classes.join(' ')+'"'+(l?' '+l:'')+'>'+d.content+'</'+d.tag+'>'},!t.document)return t.addEventListener?(t.addEventListener('message',function(e){var n=JSON.parse(e.data),i=n.language,d=n.code,r=n.immediateClose;t.postMessage(a.highlight(d,a.languages[i],i)),r&&t.close()},!1),t.Prism):t.Prism;var d=document.currentScript||[].slice.call(document.getElementsByTagName('script')).pop();return d&&(a.filename=d.src,document.addEventListener&&!d.hasAttribute('data-manual')&&('loading'===document.readyState?document.addEventListener('DOMContentLoaded',a.highlightAll):window.requestAnimationFrame?window.requestAnimationFrame(a.highlightAll):window.setTimeout(a.highlightAll,16))),t.Prism}();e.exports&&(e.exports=n),'undefined'!=typeof Li&&(Li.Prism=n),n.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/i,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},n.hooks.add('wrap',function(e){'entity'===e.type&&(e.attributes.title=e.content.replace(/&amp;/,'&'))}),n.languages.xml=n.languages.markup,n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},n.languages.css.atrule.inside.rest=n.util.clone(n.languages.css),n.languages.markup&&(n.languages.insertBefore('markup','tag',{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:n.languages.css,alias:'language-css'}}),n.languages.insertBefore('inside','attr-value',{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:n.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:n.languages.css}},alias:'language-css'}},n.languages.markup.tag)),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend('clike',{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,function:/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),n.languages.insertBefore('javascript','keyword',{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),n.languages.insertBefore('javascript','string',{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:'punctuation'},rest:n.languages.javascript}},string:/[\s\S]+/}}}),n.languages.markup&&n.languages.insertBefore('markup','tag',{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:n.languages.javascript,alias:'language-javascript'}}),n.languages.js=n.languages.javascript,function(){'undefined'!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:'javascript',py:'python',rb:'ruby',ps1:'powershell',psm1:'powershell',sh:'bash',bat:'batch',h:'c',tex:'latex'};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function(t){for(var i,a=t.getAttribute('data-src'),d=t,r=/\blang(?:uage)?-(?!\*)(\w+)\b/i;d&&!r.test(d.className);)d=d.parentNode;if(d&&(i=(t.className.match(r)||[,''])[1]),!i){var o=(a.match(/\.(\w+)$/)||[,''])[1];i=e[o]||o}var l=document.createElement('code');l.className='language-'+i,t.textContent='',l.textContent='Loading\u2026',t.appendChild(l);var s=new XMLHttpRequest;s.open('GET',a,!0),s.onreadystatechange=function(){4==s.readyState&&(400>s.status&&s.responseText?(l.textContent=s.responseText,n.highlightElement(l)):400<=s.status?l.textContent='\u2716 Error '+s.status+' while fetching file: '+s.statusText:l.textContent='\u2716 Error: File does not exist or is empty')},s.send(null)})},document.addEventListener('DOMContentLoaded',self.Prism.fileHighlight))}()});Prism.languages.python={"triple-quoted-string":{pattern:/"""[\s\S]+?"""|'''[\s\S]+?'''/,alias:'string'},comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:{pattern:/("|')(?:\\\\|\\?[^\\\r\n])*?\1/,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)[a-z0-9_]+/i,lookbehind:!0},keyword:/\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,boolean:/\b(?:True|False)\b/,number:/\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,operator:/[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,punctuation:/[{}[\];(),.:]/},Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/},function(e){var t={variable:[{pattern:/\$?\(\([\w\W]+?\)\)/,inside:{variable:[{pattern:/(^\$\(\([\w\W]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\([^)]+\)|`[^`]+`/,inside:{variable:/^\$\(|^`|\)$|`$/}},/\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]};e.languages.bash={shebang:{pattern:/^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,alias:'important'},comment:{pattern:/(^|[^"{\\])#.*/,lookbehind:!0},string:[{pattern:/((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,lookbehind:!0,greedy:!0,inside:t},{pattern:/(["'])(?:\\\\|\\?[^\\])*?\1/g,greedy:!0,inside:t}],variable:t.variable,function:{pattern:/(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|npm|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,lookbehind:!0},keyword:{pattern:/(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,lookbehind:!0},boolean:{pattern:/(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,lookbehind:!0},operator:/&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];]/};var n=t.variable[1].inside;n['function']=e.languages.bash['function'],n.keyword=e.languages.bash.keyword,n.boolean=e.languages.bash.boolean,n.operator=e.languages.bash.operator,n.punctuation=e.languages.bash.punctuation}(Prism),Prism.languages.go=Prism.languages.extend('clike',{keyword:/\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,builtin:/\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/,boolean:/\b(_|iota|nil|true|false)\b/,operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,number:/\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,string:/("|'|`)(\\?.|\r|\n)*?\1/}),delete Prism.languages.go['class-name'],Prism.languages.markdown=Prism.languages.extend('markup',{}),Prism.languages.insertBefore('markdown','prolog',{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:'punctuation'},code:[{pattern:/^(?: {4}|\t).+/m,alias:'keyword'},{pattern:/``.+?``|`[^`\n]+`/,alias:'keyword'}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:'important',inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:'important',inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:'punctuation'},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:'punctuation'},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:'url'},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold),Prism.languages.julia={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0},string:/"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(\\?.)*?\1/,keyword:/\b(abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|let|local|macro|module|print|println|quote|return|try|type|typealias|using|while)\b/,boolean:/\b(true|false)\b/,number:/\b-?(0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?\b/i,operator:/\+=?|-=?|\*=?|\/[\/=]?|\\=?|\^=?|%=?|÷=?|!=?=?|&=?|\|[=>]?|\$=?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,punctuation:/[{}[\];(),.:]/};const Ri=ii('d-code',`
<style>

code {
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.6);
}

pre code {
  display: block;
  border-left: 2px solid rgba(0, 0, 0, .1);
  padding: 0 0 0 36px;
}

${'/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*="language-"],\npre[class*="language-"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, \'Andale Mono\', \'Ubuntu Mono\', monospace;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,\ncode[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*="language-"]::selection, pre[class*="language-"] ::selection,\ncode[class*="language-"]::selection, code[class*="language-"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*="language-"],\n\tpre[class*="language-"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*="language-"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*="language-"],\npre[class*="language-"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*="language-"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #a67f59;\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n'}
</style>

<code id="code-container"></code>

`);class ji extends ni(Ri(HTMLElement)){renderContent(){if(this.languageName=this.getAttribute('language'),!this.languageName)return void console.warn('You need to provide a language attribute to your <d-code> block to let us know how to highlight your code; e.g.:\n <d-code language="python">zeros = np.zeros(shape)</d-code>.');const e=Ii.languages[this.languageName];if(void 0==e)return void console.warn(`Distill does not yet support highlighting your code block in "${this.languageName}'.`);let t=this.textContent;const n=this.shadowRoot.querySelector('#code-container');if(this.hasAttribute('block')){t=t.replace(/\n/,'');const e=t.match(/\s*/);if(t=t.replace(new RegExp('\n'+e,'g'),'\n'),t=t.trim(),n.parentNode instanceof ShadowRoot){const e=document.createElement('pre');this.shadowRoot.removeChild(n),e.appendChild(n),this.shadowRoot.appendChild(e)}}n.className=`language-${this.languageName}`,n.innerHTML=Ii.highlight(t,e)}}const qi=ii('d-footnote',`
<style>

d-math[block] {
  display: block;
}

:host {

}

sup {
  line-height: 1em;
  font-size: 0.75em;
  position: relative;
  top: -.5em;
  vertical-align: baseline;
}

span {
  color: hsla(206, 90%, 20%, 0.7);
  cursor: default;
}

.footnote-container {
  padding: 10px;
}

</style>

<d-hover-box>
  <div class="footnote-container">
    <slot id="slot"></slot>
  </div>
</d-hover-box>

<sup>
  <span id="fn-" data-hover-ref=""></span>
</sup>

`);class Fi extends qi(HTMLElement){constructor(){super();const e=new MutationObserver(this.notify);e.observe(this,{childList:!0,characterData:!0,subtree:!0})}notify(){const e={detail:this,bubbles:!0},t=new CustomEvent('onFootnoteChanged',e);document.dispatchEvent(t)}connectedCallback(){this.hoverBox=this.root.querySelector('d-hover-box'),window.customElements.whenDefined('d-hover-box').then(()=>{this.hoverBox.listen(this)}),Fi.currentFootnoteId+=1;const e=Fi.currentFootnoteId.toString();this.root.host.id='d-footnote-'+e;const t='dt-fn-hover-box-'+e;this.hoverBox.id=t;const n=this.root.querySelector('#fn-');n.setAttribute('id','fn-'+e),n.setAttribute('data-hover-ref',t),n.textContent=e}}Fi.currentFootnoteId=0;const Pi=ii('d-footnote-list',`
<style>

d-footnote-list {
  contain: layout style;
}

d-footnote-list > * {
  grid-column: text;
}

d-footnote-list a.footnote-backlink {
  color: rgba(0,0,0,0.3);
  padding-left: 0.5em;
}

</style>

<h3>Footnotes</h3>
<ol></ol>
`,!1);class Hi extends Pi(HTMLElement){connectedCallback(){super.connectedCallback(),this.list=this.root.querySelector('ol'),this.root.style.display='none'}set footnotes(e){if(this.list.innerHTML='',e.length){this.root.style.display='';for(const t of e){const e=document.createElement('li');e.id=t.id+'-listing',e.innerHTML=t.innerHTML;const n=document.createElement('a');n.setAttribute('class','footnote-backlink'),n.textContent='[\u21A9]',n.href='#'+t.id,e.appendChild(n),this.list.appendChild(e)}}else this.root.style.display='none'}}const zi=ii('d-hover-box',`
<style>

:host {
  position: absolute;
  width: 100%;
  left: 0px;
  z-index: 10000;
  display: none;
  white-space: normal
}

.container {
  position: relative;
  width: 704px;
  max-width: 100vw;
  margin: 0 auto;
}

.panel {
  position: absolute;
  font-size: 1rem;
  line-height: 1.5em;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(250, 250, 250, 0.95);
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

</style>

<div class="container">
  <div class="panel">
    <slot></slot>
  </div>
</div>
`);class Yi extends zi(HTMLElement){constructor(){super()}connectedCallback(){}listen(e){this.bindDivEvents(this),this.bindTriggerEvents(e)}bindDivEvents(e){e.addEventListener('mouseover',()=>{this.visible||this.showAtNode(e),this.stopTimeout()}),e.addEventListener('mouseout',()=>{this.extendTimeout(500)}),e.addEventListener('touchstart',(e)=>{e.stopPropagation()},{passive:!0}),document.body.addEventListener('touchstart',()=>{this.hide()},{passive:!0})}bindTriggerEvents(e){e.addEventListener('mouseover',()=>{this.visible||this.showAtNode(e),this.stopTimeout()}),e.addEventListener('mouseout',()=>{this.extendTimeout(300)}),e.addEventListener('touchstart',(t)=>{this.visible?this.hide():this.showAtNode(e),t.stopPropagation()},{passive:!0})}show(e){this.visible=!0,this.style.display='block',this.style.top=Pn(e[1]+10)+'px'}showAtNode(e){const t=e.getBoundingClientRect();this.show([e.offsetLeft+t.width,e.offsetTop+t.height])}hide(){this.visible=!1,this.style.display='none',this.stopTimeout()}stopTimeout(){this.timeout&&clearTimeout(this.timeout)}extendTimeout(e){this.stopTimeout(),this.timeout=setTimeout(()=>{this.hide()},e)}}class Bi extends HTMLElement{static get is(){return'd-title'}}const Wi=ii('d-references',`
<style>
d-references {
  display: block;
}
</style>
`,!1);class Vi extends Wi(HTMLElement){}class Ki extends HTMLElement{static get is(){return'd-toc'}connectedCallback(){this.getAttribute('prerendered')||(window.onload=()=>{const e=document.querySelector('d-article'),t=e.querySelectorAll('h2, h3');k(this,t)})}}class $i extends HTMLElement{static get is(){return'd-figure'}static get readyQueue(){return $i._readyQueue||($i._readyQueue=[]),$i._readyQueue}static addToReadyQueue(e){-1===$i.readyQueue.indexOf(e)&&($i.readyQueue.push(e),$i.runReadyQueue())}static runReadyQueue(){const e=$i.readyQueue.sort((e,t)=>e._seenOnScreen-t._seenOnScreen).filter((e)=>!e._ready).pop();e&&(e.ready(),requestAnimationFrame($i.runReadyQueue))}constructor(){super(),this._ready=!1,this._onscreen=!1,this._offscreen=!0}connectedCallback(){this.loadsWhileScrolling=this.hasAttribute('loadsWhileScrolling'),$i.marginObserver.observe(this),$i.directObserver.observe(this)}disconnectedCallback(){$i.marginObserver.unobserve(this),$i.directObserver.unobserve(this)}static get marginObserver(){if(!$i._marginObserver){const e=window.innerHeight,t=Fn(2*e),n=$i.didObserveMarginIntersection,i=new IntersectionObserver(n,{rootMargin:t+'px 0px '+t+'px 0px',threshold:0.01});$i._marginObserver=i}return $i._marginObserver}static didObserveMarginIntersection(e){for(const t of e){const e=t.target;t.isIntersecting&&!e._ready&&$i.addToReadyQueue(e)}}static get directObserver(){return $i._directObserver||($i._directObserver=new IntersectionObserver($i.didObserveDirectIntersection,{rootMargin:'0px',threshold:[0,1]})),$i._directObserver}static didObserveDirectIntersection(e){for(const t of e){const e=t.target;t.isIntersecting?(e._seenOnScreen=new Date,e._offscreen&&e.onscreen()):e._onscreen&&e.offscreen()}}addEventListener(e,t){super.addEventListener(e,t),'ready'===e&&-1!==$i.readyQueue.indexOf(this)&&(this._ready=!1,$i.runReadyQueue()),'onscreen'===e&&this.onscreen()}ready(){this._ready=!0,$i.marginObserver.unobserve(this);const e=new CustomEvent('ready');this.dispatchEvent(e)}onscreen(){this._onscreen=!0,this._offscreen=!1;const e=new CustomEvent('onscreen');this.dispatchEvent(e)}offscreen(){this._onscreen=!1,this._offscreen=!0;const e=new CustomEvent('offscreen');this.dispatchEvent(e)}}if('undefined'!=typeof window){$i.isScrolling=!1;let e;window.addEventListener('scroll',()=>{$i.isScrolling=!0,clearTimeout(e),e=setTimeout(()=>{$i.isScrolling=!1,$i.runReadyQueue()},500)},!0)}const Xi=ii('d-interstitial',`
<style>

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;

  opacity: 1;
  visibility: visible;

  display: flex;
  flex-flow: column;
  justify-content: center;
  z-index: 2147483647 /* MaxInt32 */

}

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  padding: 2em;
}

h1 {
  text-decoration: underline;
  text-decoration-color: hsl(0,100%,40%);
  -webkit-text-decoration-color: hsl(0,100%,40%);
  margin-bottom: 1em;
  line-height: 1.5em;
}

input[type="password"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  -webkit-border-radius: none;
  -moz-border-radius: none;
  -ms-border-radius: none;
  -o-border-radius: none;
  border-radius: none;
  outline: none;

  font-size: 18px;
  background: none;
  width: 25%;
  padding: 10px;
  border: none;
  border-bottom: solid 2px #999;
  transition: border .3s;
}

input[type="password"]:focus {
  border-bottom: solid 2px #333;
}

input[type="password"].wrong {
  border-bottom: solid 2px hsl(0,100%,40%);
}

p small {
  color: #888;
}

.logo {
  position: relative;
  font-size: 1.5em;
  margin-bottom: 3em;
}

.logo svg {
  width: 36px;
  position: relative;
  top: 6px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: black;
  stroke-width: 2px;
}

</style>

<div class="overlay">
  <div class="container">
    <h1>This article is in review.</h1>
    <p>Do not share this URL or the contents of this article. Thank you!</p>
    <input id="interstitial-password-input" type="password" name="password" autofocus/>
    <p><small>Enter the password we shared with you as part of the review process to view the article.</small></p>
  </div>
</div>
`);class Ji extends Xi(HTMLElement){connectedCallback(){if(this.shouldRemoveSelf())this.parentElement.removeChild(this);else{const e=this.root.querySelector('#interstitial-password-input');e.oninput=(e)=>this.passwordChanged(e)}}passwordChanged(e){const t=e.target.value;t===this.password&&(console.log('Correct password entered.'),this.parentElement.removeChild(this),'undefined'!=typeof Storage&&(console.log('Saved that correct password was entered.'),localStorage.setItem(this.localStorageIdentifier(),'true')))}shouldRemoveSelf(){return window&&window.location.hostname==='distill.pub'?(console.warn('Interstitial found on production, hiding it.'),!0):'undefined'!=typeof Storage&&'true'===localStorage.getItem(this.localStorageIdentifier())&&(console.log('Loaded that correct password was entered before; skipping interstitial.'),!0)}localStorageIdentifier(){return'distill-drafts'+(window?window.location.pathname:'-')+'interstitial-password-correct'}}var Qi=function(e,t){return e<t?-1:e>t?1:e>=t?0:NaN},Zi=function(e){return 1===e.length&&(e=w(e)),{left:function(t,n,i,a){for(null==i&&(i=0),null==a&&(a=t.length);i<a;){var d=i+a>>>1;0>e(t[d],n)?i=d+1:a=d}return i},right:function(t,n,i,a){for(null==i&&(i=0),null==a&&(a=t.length);i<a;){var d=i+a>>>1;0<e(t[d],n)?a=d:i=d+1}return i}}}(Qi),Gi=Zi.right,ea=function(e,t,a){e=+e,t=+t,a=2>(i=arguments.length)?(t=e,e=0,1):3>i?1:+a;for(var d=-1,i=0|jn(0,qn((t-e)/a)),n=Array(i);++d<i;)n[d]=e+d*a;return n},ta=7.0710678118654755,na=3.1622776601683795,ia=1.4142135623730951,aa=function(e,t,a){var d,r,n,o,l=-1;if(t=+t,e=+e,a=+a,e===t&&0<a)return[e];if((d=t<e)&&(r=e,e=t,t=r),0===(o=v(e,t,a))||!isFinite(o))return[];if(0<o)for(e=qn(e/o),t=Fn(t/o),n=Array(r=qn(t-e+1));++l<r;)n[l]=(e+l)*o;else for(e=Fn(e*o),t=qn(t*o),n=Array(r=qn(e-t+1));++l<r;)n[l]=(e-l)/o;return d&&n.reverse(),n},da=Array.prototype,ra=da.map,oa=da.slice,la=function(e,t,n){e.prototype=t.prototype=n,n.constructor=e},sa=0.7,ca=1/sa,ua=/^#([0-9a-f]{3})$/,pa=/^#([0-9a-f]{6})$/,ga=/^rgb\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*\)$/,fa=/^rgb\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,ha=/^rgba\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,ba=/^rgba\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,ma=/^hsl\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*\)$/,ya=/^hsla\(\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)%\s*,\s*([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*\)$/,xa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};la(L,U,{displayable:function(){return this.rgb().displayable()},toString:function(){return this.rgb()+''}}),la(R,I,_(L,{brighter:function(e){return e=null==e?ca:Nn(ca,e),new R(this.r*e,this.g*e,this.b*e,this.opacity)},darker:function(e){return e=null==e?sa:Nn(sa,e),new R(this.r*e,this.g*e,this.b*e,this.opacity)},rgb:function(){return this},displayable:function(){return 0<=this.r&&255>=this.r&&0<=this.g&&255>=this.g&&0<=this.b&&255>=this.b&&0<=this.opacity&&1>=this.opacity},toString:function(){var e=this.opacity;return e=isNaN(e)?1:jn(0,Hn(1,e)),(1===e?'rgb(':'rgba(')+jn(0,Hn(255,Pn(this.r)||0))+', '+jn(0,Hn(255,Pn(this.g)||0))+', '+jn(0,Hn(255,Pn(this.b)||0))+(1===e?')':', '+e+')')}})),la(F,function(e,t,n,i){return 1===arguments.length?q(e):new F(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return e=null==e?ca:Nn(ca,e),new F(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?sa:Nn(sa,e),new F(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=this.h%360+360*(0>this.h),t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,i=n+(0.5>n?n:1-n)*t,a=2*n-i;return new R(P(240<=e?e-240:e+120,a,i),P(e,a,i),P(120>e?e+240:e-120,a,i),this.opacity)},displayable:function(){return(0<=this.s&&1>=this.s||isNaN(this.s))&&0<=this.l&&1>=this.l&&0<=this.opacity&&1>=this.opacity}}));var ka=Mn/180,wa=180/Mn,va=18,Kn=0.95047,Xn=1,Yn=1.08883,Zn=4/29,Ca=6/29,Sa=3*Ca*Ca,Ta=Ca*Ca*Ca;la(Y,function(e,t,n,i){return 1===arguments.length?H(e):new Y(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return new Y(this.l+va*(null==e?1:e),this.a,this.b,this.opacity)},darker:function(e){return new Y(this.l-va*(null==e?1:e),this.a,this.b,this.opacity)},rgb:function(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return e=Xn*V(e),t=Kn*V(t),n=Yn*V(n),new R(K(3.2404542*t-1.5371385*e-0.4985314*n),K(-0.969266*t+1.8760108*e+0.041556*n),K(0.0556434*t-0.2040259*e+1.0572252*n),this.opacity)}})),la(X,function(e,t,n,i){return 1===arguments.length?z(e):new X(e,t,n,null==i?1:i)},_(L,{brighter:function(e){return new X(this.h,this.c,this.l+va*(null==e?1:e),this.opacity)},darker:function(e){return new X(this.h,this.c,this.l-va*(null==e?1:e),this.opacity)},rgb:function(){return H(this).rgb()}}));var _a=-0.14861,A=+1.78277,B=-0.29227,C=-0.90649,D=+1.97294,E=D*C,La=D*A,Aa=A*B-C*_a;la(Z,Q,_(L,{brighter:function(e){return e=null==e?ca:Nn(ca,e),new Z(this.h,this.s,this.l*e,this.opacity)},darker:function(e){return e=null==e?sa:Nn(sa,e),new Z(this.h,this.s,this.l*e,this.opacity)},rgb:function(){var e=isNaN(this.h)?0:(this.h+120)*ka,t=+this.l,n=isNaN(this.s)?0:this.s*t*(1-t),i=Un(e),a=Dn(e);return new R(255*(t+n*(_a*i+A*a)),255*(t+n*(B*i+C*a)),255*(t+n*(D*i)),this.opacity)}}));var Ea=function(e){return function(){return e}},Da=function e(t){function n(e,t){var n=i((e=I(e)).r,(t=I(t)).r),a=i(e.g,t.g),d=i(e.b,t.b),r=ne(e.opacity,t.opacity);return function(i){return e.r=n(i),e.g=a(i),e.b=d(i),e.opacity=r(i),e+''}}var i=te(t);return n.gamma=e,n}(1),Ua=function(e,t){var n,i=t?t.length:0,a=e?Hn(i,e.length):0,d=Array(i),r=Array(i);for(n=0;n<a;++n)d[n]=qa(e[n],t[n]);for(;n<i;++n)r[n]=t[n];return function(e){for(n=0;n<a;++n)r[n]=d[n](e);return r}},Ma=function(e,n){var i=new Date;return e=+e,n-=e,function(a){return i.setTime(e+n*a),i}},Oa=function(e,n){return e=+e,n-=e,function(i){return e+n*i}},Na=function(e,t){var n,d={},i={};for(n in(null===e||'object'!=typeof e)&&(e={}),(null===t||'object'!=typeof t)&&(t={}),t)n in e?d[n]=qa(e[n],t[n]):i[n]=t[n];return function(e){for(n in d)i[n]=d[n](e);return i}},Ia=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ra=new RegExp(Ia.source,'g'),ja=function(e,n){var t,a,d,r=Ia.lastIndex=Ra.lastIndex=0,o=-1,l=[],s=[];for(e+='',n+='';(t=Ia.exec(e))&&(a=Ra.exec(n));)(d=a.index)>r&&(d=n.slice(r,d),l[o]?l[o]+=d:l[++o]=d),(t=t[0])===(a=a[0])?l[o]?l[o]+=a:l[++o]=a:(l[++o]=null,s.push({i:o,x:Oa(t,a)})),r=Ra.lastIndex;return r<n.length&&(d=n.slice(r),l[o]?l[o]+=d:l[++o]=d),2>l.length?s[0]?ae(s[0].x):ie(n):(n=s.length,function(e){for(var t,a=0;a<n;++a)l[(t=s[a]).i]=t.x(e);return l.join('')})},qa=function(e,n){var i,a=typeof n;return null==n||'boolean'==a?Ea(n):('number'==a?Oa:'string'==a?(i=U(n))?(n=i,Da):ja:n instanceof U?Da:n instanceof Date?Ma:Array.isArray(n)?Ua:'function'!=typeof n.valueOf&&'function'!=typeof n.toString||isNaN(n)?Na:Oa)(e,n)},Fa=function(e,n){return e=+e,n-=e,function(i){return Pn(e+n*i)}};de(function(e,t){var n=t-e;return n?G(e,180<n||-180>n?n-360*Pn(n/360):n):Ea(isNaN(e)?t:e)});var Pa,Ha=de(ne),za=function(e){return function(){return e}},Ya=function(e){return+e},Ba=[0,1],Wa=function(e,t){if(0>(n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf('e')))return null;var n,i=e.slice(0,n);return[1<i.length?i[0]+i.slice(2):i,+e.slice(n+1)]},Va=function(e){return e=Wa(On(e)),e?e[1]:NaN},Ka=function(e,n){return function(a,d){for(var r=a.length,i=[],t=0,o=e[0],l=0;0<r&&0<o&&(l+o+1>d&&(o=jn(1,d-l)),i.push(a.substring(r-=o,r+o)),!((l+=o+1)>d));)o=e[t=(t+1)%e.length];return i.reverse().join(n)}},$a=function(e){return function(t){return t.replace(/[0-9]/g,function(t){return e[+t]})}},Xa=function(e,t){var n=Wa(e,t);if(!n)return e+'';var i=n[0],a=n[1];return 0>a?'0.'+Array(-a).join('0')+i:i.length>a+1?i.slice(0,a+1)+'.'+i.slice(a+1):i+Array(a-i.length+2).join('0')},Ja={"":function(e,t){e=e.toPrecision(t);out:for(var a,d=e.length,n=1,i=-1;n<d;++n)switch(e[n]){case'.':i=a=n;break;case'0':0===i&&(i=n),a=n;break;case'e':break out;default:0<i&&(i=0);}return 0<i?e.slice(0,i)+e.slice(a+1):e},"%":function(e,t){return(100*e).toFixed(t)},b:function(e){return Pn(e).toString(2)},c:function(e){return e+''},d:function(e){return Pn(e).toString(10)},e:function(e,t){return e.toExponential(t)},f:function(e,t){return e.toFixed(t)},g:function(e,t){return e.toPrecision(t)},o:function(e){return Pn(e).toString(8)},p:function(e,t){return Xa(100*e,t)},r:Xa,s:function(e,t){var a=Wa(e,t);if(!a)return e+'';var r=a[0],o=a[1],l=o-(Pa=3*jn(-8,Hn(8,Fn(o/3))))+1,i=r.length;return l===i?r:l>i?r+Array(l-i+1).join('0'):0<l?r.slice(0,l)+'.'+r.slice(l):'0.'+Array(1-l).join('0')+Wa(e,jn(0,t+l-1))[0]},X:function(e){return Pn(e).toString(16).toUpperCase()},x:function(e){return Pn(e).toString(16)}},Qa=/^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;fe.prototype=he.prototype,he.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?'0':'')+(null==this.width?'':jn(1,0|this.width))+(this.comma?',':'')+(null==this.precision?'':'.'+jn(0,0|this.precision))+this.type};var re,Za,Ga,ed=function(e){return e},td=['y','z','a','f','p','n','\xB5','m','','k','M','G','T','P','E','Z','Y'],nd=function(e){function t(e){function t(e){var t,i,n,c=b,k=m;if('c'===h)k=y(e)+k,e='';else{e=+e;var w=0>e;if(e=y(On(e),f),w&&0==+e&&(w=!1),c=(w?'('===s?s:'-':'-'===s||'('===s?'':s)+c,k=k+('s'===h?td[8+Pa/3]:'')+(w&&'('===s?')':''),x)for(t=-1,i=e.length;++t<i;)if(n=e.charCodeAt(t),48>n||57<n){k=(46===n?d+e.slice(t+1):e.slice(t))+k,e=e.slice(0,t);break}}g&&!u&&(e=a(e,Infinity));var v=c.length+e.length+k.length,C=v<p?Array(p-v+1).join(o):'';switch(g&&u&&(e=a(C+e,C.length?p-k.length:Infinity),C=''),l){case'<':e=c+e+k+C;break;case'=':e=c+C+e+k;break;case'^':e=C.slice(0,v=C.length>>1)+c+e+k+C.slice(v);break;default:e=C+c+e+k;}return r(e)}e=fe(e);var o=e.fill,l=e.align,s=e.sign,c=e.symbol,u=e.zero,p=e.width,g=e.comma,f=e.precision,h=e.type,b='$'===c?n[0]:'#'===c&&/[boxX]/.test(h)?'0'+h.toLowerCase():'',m='$'===c?n[1]:/[%p]/.test(h)?i:'',y=Ja[h],x=!h||/[defgprs%]/.test(h);return f=null==f?h?6:12:/[gprs]/.test(h)?jn(1,Hn(21,f)):jn(0,Hn(20,f)),t.toString=function(){return e+''},t}var a=e.grouping&&e.thousands?Ka(e.grouping,e.thousands):ed,n=e.currency,d=e.decimal,r=e.numerals?$a(e.numerals):ed,i=e.percent||'%';return{format:t,formatPrefix:function(n,i){var a=t((n=fe(n),n.type='f',n)),d=3*jn(-8,Hn(8,Fn(Va(i)/3))),r=Nn(10,-d),o=td[8+d/3];return function(e){return a(r*e)+o}}}};(function(e){return re=nd(e),Za=re.format,Ga=re.formatPrefix,re})({decimal:'.',thousands:',',grouping:[3],currency:['$','']});var id=function(e){return jn(0,-Va(On(e)))},ad=function(e,t){return jn(0,3*jn(-8,Hn(8,Fn(Va(t)/3)))-Va(On(e)))},dd=function(e,t){return e=On(e),t=On(t)-e,jn(0,Va(t)-Va(e))+1},rd=function(e,t,n){var i,a=e[0],d=e[e.length-1],r=S(a,d,null==t?10:t);switch(n=fe(null==n?',f':n),n.type){case's':{var o=jn(On(a),On(d));return null!=n.precision||isNaN(i=ad(r,o))||(n.precision=i),Ga(n,o)}case'':case'e':case'g':case'p':case'r':{null!=n.precision||isNaN(i=dd(r,jn(On(a),On(d))))||(n.precision=i-('e'===n.type));break}case'f':case'%':{null!=n.precision||isNaN(i=id(r))||(n.precision=i-2*('%'===n.type));break}}return Za(n)},od=new Date,ld=new Date,sd=ye(function(){},function(e,t){e.setTime(+e+t)},function(e,t){return t-e});sd.every=function(e){return e=Fn(e),isFinite(e)&&0<e?1<e?ye(function(t){t.setTime(Fn(t/e)*e)},function(t,n){t.setTime(+t+n*e)},function(t,n){return(n-t)/e}):sd:null};var cd=1e3,ud=6e4,pd=36e5,gd=864e5,fd=6048e5,hd=ye(function(e){e.setTime(Fn(e/cd)*cd)},function(e,t){e.setTime(+e+t*cd)},function(e,t){return(t-e)/cd},function(e){return e.getUTCSeconds()}),bd=ye(function(e){e.setTime(Fn(e/ud)*ud)},function(e,t){e.setTime(+e+t*ud)},function(e,t){return(t-e)/ud},function(e){return e.getMinutes()}),md=ye(function(e){var t=e.getTimezoneOffset()*ud%pd;0>t&&(t+=pd),e.setTime(Fn((+e-t)/pd)*pd+t)},function(e,t){e.setTime(+e+t*pd)},function(e,t){return(t-e)/pd},function(e){return e.getHours()}),yd=ye(function(e){e.setHours(0,0,0,0)},function(e,t){e.setDate(e.getDate()+t)},function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*ud)/gd},function(e){return e.getDate()-1}),xd=xe(0),kd=xe(1),wd=xe(2),vd=xe(3),Cd=xe(4),Sd=xe(5),Td=xe(6),_d=ye(function(e){e.setDate(1),e.setHours(0,0,0,0)},function(e,t){e.setMonth(e.getMonth()+t)},function(e,t){return t.getMonth()-e.getMonth()+12*(t.getFullYear()-e.getFullYear())},function(e){return e.getMonth()}),Ld=ye(function(e){e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,t){e.setFullYear(e.getFullYear()+t)},function(e,t){return t.getFullYear()-e.getFullYear()},function(e){return e.getFullYear()});Ld.every=function(e){return isFinite(e=Fn(e))&&0<e?ye(function(t){t.setFullYear(Fn(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,n){t.setFullYear(t.getFullYear()+n*e)}):null};var Ad=ye(function(e){e.setUTCSeconds(0,0)},function(e,t){e.setTime(+e+t*ud)},function(e,t){return(t-e)/ud},function(e){return e.getUTCMinutes()}),Ed=ye(function(e){e.setUTCMinutes(0,0,0)},function(e,t){e.setTime(+e+t*pd)},function(e,t){return(t-e)/pd},function(e){return e.getUTCHours()}),Dd=ye(function(e){e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCDate(e.getUTCDate()+t)},function(e,t){return(t-e)/gd},function(e){return e.getUTCDate()-1}),Ud=ke(0),Md=ke(1),Od=ke(2),Nd=ke(3),Id=ke(4),Rd=ke(5),jd=ke(6),qd=ye(function(e){e.setUTCDate(1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCMonth(e.getUTCMonth()+t)},function(e,t){return t.getUTCMonth()-e.getUTCMonth()+12*(t.getUTCFullYear()-e.getUTCFullYear())},function(e){return e.getUTCMonth()}),Fd=ye(function(e){e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t)},function(e,t){return t.getUTCFullYear()-e.getUTCFullYear()},function(e){return e.getUTCFullYear()});Fd.every=function(e){return isFinite(e=Fn(e))&&0<e?ye(function(t){t.setUTCFullYear(Fn(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n*e)}):null};var Pd,Hd,zd,Yd={0:'0',"-":'',_:' '},Bd=/^\s*\d+/,Wd=/^%/,Vd=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;(function(e){return Pd=Se(e),Hd=Pd.utcFormat,zd=Pd.utcParse,Pd})({dateTime:'%x, %X',date:'%-m/%-d/%Y',time:'%-I:%M:%S %p',periods:['AM','PM'],days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],shortDays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],months:['January','February','March','April','May','June','July','August','September','October','November','December'],shortMonths:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']});var Kd='%Y-%m-%dT%H:%M:%S.%LZ',$d=Date.prototype.toISOString?function(e){return e.toISOString()}:Hd(Kd),Xd=+new Date('2000-01-01T00:00:00.000Z')?function(e){var t=new Date(e);return isNaN(t)?null:t}:zd(Kd),Jd=function(e){return e.match(/.{6}/g).map(function(e){return'#'+e})};Jd('1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf'),Jd('393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6'),Jd('3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9'),Jd('1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5'),Ha(Q(300,0.5,0),Q(-240,0.5,1));var Qd=Ha(Q(-100,0.75,0.35),Q(80,1.5,0.8)),Zd=Ha(Q(260,0.75,0.35),Q(80,1.5,0.8)),Gd=Q();yt(Jd('44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725'));var er=yt(Jd('00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf')),tr=yt(Jd('00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4')),nr=yt(Jd('0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921')),ir={value:function(){}};kt.prototype=xt.prototype={constructor:kt,on:function(e,a){var d,t=this._,r=wt(e+'',t),o=-1,i=r.length;if(2>arguments.length){for(;++o<i;)if((d=(e=r[o]).type)&&(d=vt(t[d],e.name)))return d;return}if(null!=a&&'function'!=typeof a)throw new Error('invalid callback: '+a);for(;++o<i;)if(d=(e=r[o]).type)t[d]=Ct(t[d],e.name,a);else if(null==a)for(d in t)t[d]=Ct(t[d],e.name,null);return this},copy:function(){var e={},n=this._;for(var i in n)e[i]=n[i].slice();return new kt(e)},call:function(e,a){if(0<(d=arguments.length-2))for(var d,n,t=Array(d),r=0;r<d;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error('unknown type: '+e);for(n=this._[e],r=0,d=n.length;r<d;++r)n[r].value.apply(a,t)},apply:function(e,a,d){if(!this._.hasOwnProperty(e))throw new Error('unknown type: '+e);for(var r=this._[e],t=0,i=r.length;t<i;++t)r[t].value.apply(a,d)}};var ar='http://www.w3.org/1999/xhtml',dr={svg:'http://www.w3.org/2000/svg',xhtml:ar,xlink:'http://www.w3.org/1999/xlink',xml:'http://www.w3.org/XML/1998/namespace',xmlns:'http://www.w3.org/2000/xmlns/'},rr=function(e){var t=e+='',n=t.indexOf(':');return 0<=n&&'xmlns'!==(t=e.slice(0,n))&&(e=e.slice(n+1)),dr.hasOwnProperty(t)?{space:dr[t],local:e}:e},or=function(e){var t=rr(e);return(t.local?Tt:St)(t)},lr=function(e){return function(){return this.matches(e)}};if('undefined'!=typeof document){var sr=document.documentElement;if(!sr.matches){var cr=sr.webkitMatchesSelector||sr.msMatchesSelector||sr.mozMatchesSelector||sr.oMatchesSelector;lr=function(e){return function(){return cr.call(this,e)}}}}var ur=lr,pr={},gr=null;if('undefined'!=typeof document){var fr=document.documentElement;'onmouseenter'in fr||(pr={mouseenter:'mouseover',mouseleave:'mouseout'})}var hr=function(){for(var e,t=gr;e=t.sourceEvent;)t=e;return t},br=function(e,t){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,i=i.matrixTransform(e.getScreenCTM().inverse()),[i.x,i.y]}var a=e.getBoundingClientRect();return[t.clientX-a.left-e.clientLeft,t.clientY-a.top-e.clientTop]},mr=function(e){var t=hr();return t.changedTouches&&(t=t.changedTouches[0]),br(e,t)},yr=function(e){return null==e?Mt:function(){return this.querySelector(e)}},xr=function(e){return null==e?Ot:function(){return this.querySelectorAll(e)}},kr=function(e){return Array(e.length)};Nt.prototype={constructor:Nt,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};var wr=function(e){return function(){return e}},vr='$',Cr=function(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView};Gt.prototype={add:function(e){var t=this._names.indexOf(e);0>t&&(this._names.push(e),this._node.setAttribute('class',this._names.join(' ')))},remove:function(e){var t=this._names.indexOf(e);0<=t&&(this._names.splice(t,1),this._node.setAttribute('class',this._names.join(' ')))},contains:function(e){return 0<=this._names.indexOf(e)}};var Sr=[null];xn.prototype=function(){return new xn([[document.documentElement]],Sr)}.prototype={constructor:xn,select:function(e){'function'!=typeof e&&(e=yr(e));for(var t=this._groups,a=t.length,d=Array(a),r=0;r<a;++r)for(var o,l,s=t[r],c=s.length,n=d[r]=Array(c),u=0;u<c;++u)(o=s[u])&&(l=e.call(o,o.__data__,u,s))&&('__data__'in o&&(l.__data__=o.__data__),n[u]=l);return new xn(d,this._parents)},selectAll:function(e){'function'!=typeof e&&(e=xr(e));for(var t=this._groups,a=t.length,d=[],r=[],o=0;o<a;++o)for(var l,s=t[o],c=s.length,n=0;n<c;++n)(l=s[n])&&(d.push(e.call(l,l.__data__,n,s)),r.push(l));return new xn(d,r)},filter:function(e){'function'!=typeof e&&(e=ur(e));for(var t=this._groups,a=t.length,d=Array(a),r=0;r<a;++r)for(var o,l=t[r],s=l.length,n=d[r]=[],c=0;c<s;++c)(o=l[c])&&e.call(o,o.__data__,c,l)&&n.push(o);return new xn(d,this._parents)},data:function(e,t){if(!e)return g=Array(this.size()),s=-1,this.each(function(e){g[++s]=e}),g;var n=t?Rt:It,i=this._parents,a=this._groups;'function'!=typeof e&&(e=wr(e));for(var d=a.length,r=Array(d),o=Array(d),l=Array(d),s=0;s<d;++s){var c=i[s],u=a[s],p=u.length,g=e.call(c,c&&c.__data__,s,i),f=g.length,h=o[s]=Array(f),b=r[s]=Array(f),m=l[s]=Array(p);n(c,u,h,b,m,g,t);for(var y,x,k=0,w=0;k<f;++k)if(y=h[k]){for(k>=w&&(w=k+1);!(x=b[w])&&++w<f;);y._next=x||null}}return r=new xn(r,i),r._enter=o,r._exit=l,r},enter:function(){return new xn(this._enter||this._groups.map(kr),this._parents)},exit:function(){return new xn(this._exit||this._groups.map(kr),this._parents)},merge:function(e){for(var t=this._groups,a=e._groups,d=t.length,r=a.length,o=Hn(d,r),l=Array(d),s=0;s<o;++s)for(var c,u=t[s],p=a[s],g=u.length,n=l[s]=Array(g),f=0;f<g;++f)(c=u[f]||p[f])&&(n[f]=c);for(;s<d;++s)l[s]=t[s];return new xn(l,this._parents)},order:function(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var a,d=e[t],r=d.length-1,i=d[r];0<=--r;)(a=d[r])&&(i&&i!==a.nextSibling&&i.parentNode.insertBefore(a,i),i=a);return this},sort:function(e){function t(t,n){return t&&n?e(t.__data__,n.__data__):!t-!n}e||(e=jt);for(var a=this._groups,d=a.length,r=Array(d),o=0;o<d;++o){for(var l,s=a[o],c=s.length,n=r[o]=Array(c),u=0;u<c;++u)(l=s[u])&&(n[u]=l);n.sort(t)}return new xn(r,this._parents).order()},call:function(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this},nodes:function(){var e=Array(this.size()),t=-1;return this.each(function(){e[++t]=this}),e},node:function(){for(var e=this._groups,t=0,a=e.length;t<a;++t)for(var d,r=e[t],o=0,i=r.length;o<i;++o)if(d=r[o],d)return d;return null},size:function(){var e=0;return this.each(function(){++e}),e},empty:function(){return!this.node()},each:function(e){for(var t=this._groups,a=0,d=t.length;a<d;++a)for(var r,o=t[a],l=0,i=o.length;l<i;++l)(r=o[l])&&e.call(r,r.__data__,l,o);return this},attr:function(e,t){var n=rr(e);if(2>arguments.length){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((null==t?n.local?Ft:qt:'function'==typeof t?n.local?Yt:zt:n.local?Ht:Pt)(n,t))},style:function(e,t,n){return 1<arguments.length?this.each((null==t?Bt:'function'==typeof t?Vt:Wt)(e,t,null==n?'':n)):Kt(this.node(),e)},property:function(e,t){return 1<arguments.length?this.each((null==t?$t:'function'==typeof t?Jt:Xt)(e,t)):this.node()[e]},classed:function(e,t){var a=Qt(e+'');if(2>arguments.length){for(var d=Zt(this.node()),r=-1,i=a.length;++r<i;)if(!d.contains(a[r]))return!1;return!0}return this.each(('function'==typeof t?dn:t?nn:an)(a,t))},text:function(e){return arguments.length?this.each(null==e?rn:('function'==typeof e?ln:on)(e)):this.node().textContent},html:function(e){return arguments.length?this.each(null==e?sn:('function'==typeof e?un:cn)(e)):this.node().innerHTML},raise:function(){return this.each(pn)},lower:function(){return this.each(gn)},append:function(e){var t='function'==typeof e?e:or(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})},insert:function(e,t){var n='function'==typeof e?e:or(e),i=null==t?fn:'function'==typeof t?t:yr(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})},remove:function(){return this.each(hn)},datum:function(e){return arguments.length?this.property('__data__',e):this.node().__data__},on:function(e,a,d){var r,i,t=At(e+''),l=t.length;if(2>arguments.length){var n=this.node().__on;if(n)for(var s,o=0,c=n.length;o<c;++o)for(r=0,s=n[o];r<l;++r)if((i=t[r]).type===s.type&&i.name===s.name)return s.value;return}for(n=a?Dt:Et,null==d&&(d=!1),r=0;r<l;++r)this.each(n(t[r],a,d));return this},dispatch:function(e,t){return this.each(('function'==typeof t?yn:mn)(e,t))}};var Tr=function(e){return'string'==typeof e?new xn([[document.querySelector(e)]],[document.documentElement]):new xn([[e]],Sr)},_r=function(e,t,a){3>arguments.length&&(a=t,t=hr().changedTouches);for(var d,r=0,i=t?t.length:0;r<i;++r)if((d=t[r]).identifier===a)return br(e,d);return null},Lr=function(){gr.preventDefault(),gr.stopImmediatePropagation()},Ar=function(e){var t=e.document.documentElement,n=Tr(e).on('dragstart.drag',Lr,!0);'onselectstart'in t?n.on('selectstart.drag',Lr,!0):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect='none')},Er=function(e){return function(){return e}};vn.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};var Dr=function(){function e(e){e.on('mousedown.drag',t).filter(h).on('touchstart.drag',a).on('touchmove.drag',d).on('touchend.drag touchcancel.drag',r).style('touch-action','none').style('-webkit-tap-highlight-color','rgba(0,0,0,0)')}function t(){if(!u&&p.apply(this,arguments)){var e=o('mouse',g.apply(this,arguments),mr,this,arguments);e&&(Tr(gr.view).on('mousemove.drag',n,!0).on('mouseup.drag',i,!0),Ar(gr.view),kn(),c=!1,l=gr.clientX,s=gr.clientY,e('start'))}}function n(){if(Lr(),!c){var e=gr.clientX-l,t=gr.clientY-s;c=e*e+t*t>x}b.mouse('drag')}function i(){Tr(gr.view).on('mousemove.drag mouseup.drag',null),wn(gr.view,c),Lr(),b.mouse('end')}function a(){if(p.apply(this,arguments)){var e,t,i=gr.changedTouches,a=g.apply(this,arguments),d=i.length;for(e=0;e<d;++e)(t=o(i[e].identifier,a,_r,this,arguments))&&(kn(),t('start'))}}function d(){var e,t,i=gr.changedTouches,a=i.length;for(e=0;e<a;++e)(t=b[i[e].identifier])&&(Lr(),t('drag'))}function r(){var e,t,i=gr.changedTouches,a=i.length;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),e=0;e<a;++e)(t=b[i[e].identifier])&&(kn(),t('end'))}function o(t,i,a,d,r){var o,l,s,c=a(i,t),u=m.copy();return Ut(new vn(e,'beforestart',o,t,y,c[0],c[1],0,0,u),function(){return null!=(gr.subject=o=f.apply(d,r))&&(l=o.x-c[0]||0,s=o.y-c[1]||0,!0)})?function p(g){var f,n=c;switch(g){case'start':b[t]=p,f=y++;break;case'end':delete b[t],--y;case'drag':c=a(i,t),f=y;}Ut(new vn(e,g,o,t,f,c[0]+l,c[1]+s,c[0]-n[0],c[1]-n[1],u),u.apply,u,[g,d,r])}:void 0}var l,s,c,u,p=Cn,g=Sn,f=Tn,h=_n,b={},m=xt('start','drag','end'),y=0,x=0;return e.filter=function(t){return arguments.length?(p='function'==typeof t?t:Er(!!t),e):p},e.container=function(t){return arguments.length?(g='function'==typeof t?t:Er(t),e):g},e.subject=function(t){return arguments.length?(f='function'==typeof t?t:Er(t),e):f},e.touchable=function(t){return arguments.length?(h='function'==typeof t?t:Er(!!t),e):h},e.on=function(){var t=m.on.apply(m,arguments);return t===m?e:t},e.clickDistance=function(t){return arguments.length?(x=(t=+t)*t,e):An(x)},e};const Ur=ii('d-slider',`
<style>
  :host {
    position: relative;
    display: inline-block;
  }

  :host(:focus) {
    outline: none;
  }

  .background {
    padding: 9px 0;
    color: white;
    position: relative;
  }

  .track {
    height: 3px;
    width: 100%;
    border-radius: 2px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .track-fill {
    position: absolute;
    top: 9px;
    height: 3px;
    border-radius: 4px;
    background-color: hsl(24, 100%, 50%);
  }

  .knob-container {
    position: absolute;
    top: 10px;
  }

  .knob {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsl(24, 100%, 50%);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }
  .mousedown .knob {
    transform: scale(1.5);
  }

  .knob-highlight {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 13px;
    height: 13px;
    background-color: hsla(0, 0%, 0%, 0.1);
    border-radius: 50%;
    transition-property: transform;
    transition-duration: 0.18s;
    transition-timing-function: ease;
  }

  .focus .knob-highlight {
    transform: scale(2);
  }

  .ticks {
    position: absolute;
    top: 16px;
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .ticks .tick {
    position: absolute;
    height: 100%;
    border-left: 1px solid hsla(0, 0%, 0%, 0.2);
  }

</style>

  <div class='background'>
    <div class='track'></div>
    <div class='track-fill'></div>
    <div class='knob-container'>
      <div class='knob-highlight'></div>
      <div class='knob'></div>
    </div>
    <div class='ticks'></div>
  </div>
`),Mr={left:37,up:38,right:39,down:40,pageUp:33,pageDown:34,end:35,home:36};class Or extends Ur(HTMLElement){connectedCallback(){this.connected=!0,this.setAttribute('role','slider'),this.hasAttribute('tabindex')||this.setAttribute('tabindex',0),this.mouseEvent=!1,this.knob=this.root.querySelector('.knob-container'),this.background=this.root.querySelector('.background'),this.trackFill=this.root.querySelector('.track-fill'),this.track=this.root.querySelector('.track'),this.min=this.min?this.min:0,this.max=this.max?this.max:100,this.scale=me().domain([this.min,this.max]).range([0,1]).clamp(!0),this.origin=this.origin===void 0?this.min:this.origin,this.step=this.step?this.step:1,this.update(this.value?this.value:0),this.ticks=!!this.ticks&&this.ticks,this.renderTicks(),this.drag=Dr().container(this.background).on('start',()=>{this.mouseEvent=!0,this.background.classList.add('mousedown'),this.changeValue=this.value,this.dragUpdate()}).on('drag',()=>{this.dragUpdate()}).on('end',()=>{this.mouseEvent=!1,this.background.classList.remove('mousedown'),this.dragUpdate(),this.changeValue!==this.value&&this.dispatchChange(),this.changeValue=this.value}),this.drag(Tr(this.background)),this.addEventListener('focusin',()=>{this.mouseEvent||this.background.classList.add('focus')}),this.addEventListener('focusout',()=>{this.background.classList.remove('focus')}),this.addEventListener('keydown',this.onKeyDown)}static get observedAttributes(){return['min','max','value','step','ticks','origin','tickValues','tickLabels']}attributeChangedCallback(e,t,n){isNaN(n)||void 0===n||null===n||('min'==e&&(this.min=+n,this.setAttribute('aria-valuemin',this.min)),'max'==e&&(this.max=+n,this.setAttribute('aria-valuemax',this.max)),'value'==e&&this.update(+n),'origin'==e&&(this.origin=+n),'step'==e&&0<n&&(this.step=+n),'ticks'==e&&(this.ticks=!(''!==n)||n))}onKeyDown(e){this.changeValue=this.value;let t=!1;switch(e.keyCode){case Mr.left:case Mr.down:this.update(this.value-this.step),t=!0;break;case Mr.right:case Mr.up:this.update(this.value+this.step),t=!0;break;case Mr.pageUp:this.update(this.value+10*this.step),t=!0;break;case Mr.pageDown:this.update(this.value+10*this.step),t=!0;break;case Mr.home:this.update(this.min),t=!0;break;case Mr.end:this.update(this.max),t=!0;break;default:}t&&(this.background.classList.add('focus'),e.preventDefault(),e.stopPropagation(),this.changeValue!==this.value&&this.dispatchChange())}validateValueRange(e,t,n){return jn(Hn(t,n),e)}quantizeValue(e,t){return Pn(e/t)*t}dragUpdate(){const e=this.background.getBoundingClientRect(),t=gr.x,n=e.width;this.update(this.scale.invert(t/n))}update(e){let t=e;'any'!==this.step&&(t=this.quantizeValue(e,this.step)),t=this.validateValueRange(this.min,this.max,t),this.connected&&(this.knob.style.left=100*this.scale(t)+'%',this.trackFill.style.width=100*this.scale(this.min+On(t-this.origin))+'%',this.trackFill.style.left=100*this.scale(Hn(t,this.origin))+'%'),this.value!==t&&(this.value=t,this.setAttribute('aria-valuenow',this.value),this.dispatchInput())}dispatchChange(){const t=new Event('change');this.dispatchEvent(t,{})}dispatchInput(){const t=new Event('input');this.dispatchEvent(t,{})}renderTicks(){const e=this.root.querySelector('.ticks');if(!1!==this.ticks){let t=[];t=0<this.ticks?this.scale.ticks(this.ticks):'any'===this.step?this.scale.ticks():ea(this.min,this.max+1e-6,this.step),t.forEach((t)=>{const n=document.createElement('div');n.classList.add('tick'),n.style.left=100*this.scale(t)+'%',e.appendChild(n)})}else e.style.display='none'}}var Nr='<svg viewBox="-607 419 64 64">\n  <path d="M-573.4,478.9c-8,0-14.6-6.4-14.6-14.5s14.6-25.9,14.6-40.8c0,14.9,14.6,32.8,14.6,40.8S-565.4,478.9-573.4,478.9z"/>\n</svg>\n';const Ir=ii('distill-header',`
<style>
distill-header {
  position: relative;
  height: 60px;
  background-color: hsl(200, 60%, 15%);
  width: 100%;
  box-sizing: border-box;
  z-index: 2;
  color: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}
distill-header .content {
  height: 70px;
  grid-column: page;
}
distill-header a {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 22px 0;
}
distill-header a:hover {
  color: rgba(255, 255, 255, 1);
}
distill-header svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}
@media(min-width: 1080px) {
  distill-header {
    height: 70px;
  }
  distill-header a {
    height: 70px;
    line-height: 70px;
    padding: 28px 0;
  }
  distill-header .logo {
  }
}
distill-header svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}
distill-header .logo {
  font-size: 17px;
  font-weight: 200;
}
distill-header .nav {
  float: right;
  font-weight: 300;
}
distill-header .nav a {
  font-size: 12px;
  margin-left: 24px;
  text-transform: uppercase;
}
</style>
<div class="content">
  <a href="/" class="logo">
    ${Nr}
    Distill
  </a>
  <nav class="nav">
    <a href="/about/">About</a>
    <a href="/prize/">Prize</a>
    <a href="/journal/">Submit</a>
  </nav>
</div>
`,!1);class Rr extends Ir(HTMLElement){}const jr=`
<style>
  distill-appendix {
    contain: layout style;
  }

  distill-appendix .citation {
    font-size: 11px;
    line-height: 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 18px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0, 0, 0, 0.02);
    padding: 10px 18px;
    border-radius: 3px;
    color: rgba(150, 150, 150, 1);
    overflow: hidden;
    margin-top: -12px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  distill-appendix > * {
    grid-column: text;
  }
</style>
`;class qr extends HTMLElement{static get is(){return'distill-appendix'}set frontMatter(e){this.innerHTML=Ln(e)}}const Fr=ii('distill-footer',`
<style>

:host {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: hsl(180, 5%, 15%); /*hsl(200, 60%, 15%);*/
  text-align: left;
  contain: content;
}

.logo svg {
  width: 24px;
  position: relative;
  top: 4px;
  margin-right: 2px;
}

.logo svg path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 3px;
}

.logo {
  font-size: 17px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-right: 6px;
}

.container {
  grid-column: text;
}

.nav {
  font-size: 0.9em;
  margin-top: 1.5em;
}

.nav a {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 6px;
  text-decoration: none;
}

</style>

<div class='container'>

  <a href="/" class="logo">
    ${Nr}
    Distill
  </a> is dedicated to clear explanations of machine learning

  <div class="nav">
    <a href="https://distill.pub/about/">About</a>
    <a href="https://distill.pub/journal/">Submit</a>
    <a href="https://distill.pub/prize/">Prize</a>
    <a href="https://distill.pub/archive/">Archive</a>
    <a href="https://distill.pub/rss.xml">RSS</a>
    <a href="https://github.com/distillpub">GitHub</a>
    <a href="https://twitter.com/distillpub">Twitter</a>
    &nbsp;&nbsp;&nbsp;&nbsp; ISSN 2476-0757
  </div>

</div>

`);class Pr extends Fr(HTMLElement){}const Hr=function(){if(1>window.distillRunlevel)throw new Error('Insufficient Runlevel for Distill Template!');if('distillTemplateIsLoading'in window&&window.distillTemplateIsLoading)throw new Error('Runlevel 1: Distill Template is getting loaded more than once, aborting!');else window.distillTemplateIsLoading=!0,console.debug('Runlevel 1: Distill Template has started loading.');p(document),console.debug('Runlevel 1: Static Distill styles have been added.'),console.debug('Runlevel 1->2.'),window.distillRunlevel+=1;for(const[e,t]of Object.entries(mi.listeners))'function'==typeof t?document.addEventListener(e,t):console.error('Runlevel 2: Controller listeners need to be functions!');console.debug('Runlevel 2: We can now listen to controller events.'),console.debug('Runlevel 2->3.'),window.distillRunlevel+=1;if(2>window.distillRunlevel)throw new Error('Insufficient Runlevel for adding custom elements!');const e=[vi,Si,_i,Ei,Di,Mi,Ni,ji,Fi,Hi,fi,Yi,Bi,T,Vi,Ki,$i,Or,Ji].concat([Rr,qr,Pr]);for(const t of e)console.debug('Runlevel 2: Registering custom element: '+t.is),customElements.define(t.is,t);console.debug('Runlevel 3: Distill Template finished registering custom elements.'),console.debug('Runlevel 3->4.'),window.distillRunlevel+=1,s()&&mi.listeners.DOMContentLoaded(),console.debug('Runlevel 4: Distill Template initialisation complete.')};window.distillRunlevel=0,ki.browserSupportsAllFeatures()?(console.debug('Runlevel 0: No need for polyfills.'),console.debug('Runlevel 0->1.'),window.distillRunlevel+=1,Hr()):(console.debug('Runlevel 0: Distill Template is loading polyfills.'),ki.load(Hr))});
//# sourceMappingURL=template.v2.js.map
