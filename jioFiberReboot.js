/*
CLI Options list
  ip
  ipAddress
    IP address of jio router.

  pwd
  password
  p
    Pasword of admin account.

  user
  username
  u
    Username of admin account. (Optional. Default: admin)

  url
    URL of router login page. (Optional. Default: http://${ip}/platform.cgi)

  tries
  t
    Maximum tries. (Optional. Default: 1)

  wait
  w
    Wait (in seconds) between tries. (Optional. Default: 1 second)

Example: 
  node jioFiberReboot.js ip=192.168.29.1 pwd=password t=2 w=5
*/

var oe=Object.create;var X=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var ge=Object.getOwnPropertyNames;var we=Object.getPrototypeOf,me=Object.prototype.hasOwnProperty;var ye=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of ge(t))!me.call(e,r)&&r!==n&&X(e,r,{get:()=>t[r],enumerable:!(i=be(t,r))||i.enumerable});return e};var V=(e,t,n)=>(n=e!=null?oe(we(e)):{},ye(t||!e||!e.__esModule?X(n,"default",{value:e,enumerable:!0}):n,e));function k(e,t,n=!0){(!c(e)||!c(t))&&u(["c79e853f-72b6-49ca-9c11-322b160f2173",e,t]);let i=!1,r=t.length;return r===0||(e=e.trim(),n?i=e.slice(-r)===t:i=e.slice(-r).toLowerCase()===t.toLowerCase(),i)?e:e+t}function ee(e,t,n=!0){(!c(e)||!c(t))&&u(["c79e853f-72b6-49ca-9c11-322b160f2173",e,t]);let i=!1,r=t.length;return r===0||(e=e.trim(),n?i=e.slice(0,r)===t:i=e.slice(0,r).toLowerCase()===t.toLowerCase(),i)?e:t+e}function T(e){return c(e)&&!!e.match(/^[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}$/)}function P({local:e=!0,timestampMs:t=null,timestampS:n=null,dateTimeArgs:i=[],timeInHMS:r="",isUTC:b=!1,nativeDate:d="",prependZero:o=!0,format:a="y-mm-d h:mins:ss",propPassed:s=""}={}){if(c(a)||u([a,"267ba1a9-6857-5ffb-ad3d-abbabdfd1e8e"]),w(s))if(s==="dateTimeArgs"&&!y(i))u([s,"698ead3f-89c4-5725-bcd7-3341b995e268",i]);else if(s==="timestampMs"&&!j(t))u([s,"c58611c6-b46c-5242-b66e-7e329375fd42",t]);else if(s==="timestampS"&&!j(n*1e3))u([s,"11b7af58-27d6-56fd-973b-e4b35a410a88",n]);else if(s==="timeInHMS"&&!T(r))u([s,"1d164080-6a74-58e8-82db-3dd1af3a6942",r]);else if(s==="nativeDate")try{new Date(d)}catch{u(["1fac154c-71f8-4b4c-b526-d4270b0dd744",s,d])}else["timestampMs","timestampS","dateTimeArgs","timeInHMS","nativeDate"].includes(s)||u(["48ee4db8-2f06-59a9-b9f6-cf794a5a1003",s]);let l,F="";try{t?(t=parseInt(t),l=new Date(t)):n?(n=parseInt(n),l=new Date(n*1e3)):y(i)?(i.length>1&&(i[1]=parseInt(i[1])-1),i=i.map(f=>""+f),b?l=new Date(Date.UTC(...i)):l=new Date(...i)):T(r)?(b&&(r+="Z"),l=new Date(r)):d?l=new Date(d):l=new Date}catch(f){u(["05b09945-5040-51c4-97fc-b041d60d5a6e",f])}if(a.includes("y")){let f=e?l.getFullYear():l.getUTCFullYear();f=f.toString(),a=a.split("y").join(f)}if(a.includes("mm")){let f=e?l.getMonth()+1:l.getUTCMonth()+1;f=f.toString(),o&&f.length===1&&(f="0"+f),a=a.split("mm").join(f)}if(a.includes("d")){let f=e?l.getDate():l.getUTCDate();f=f.toString(),o&&f.length===1&&(f="0"+f),a=a.split("d").join(f)}if(a.includes("h")){let f=e?l.getHours():l.getUTCHours();(a.includes("ap")||a.includes("AP"))&&(F=f>=12?"pm":"am",f=f%12,f=f||12),f=f.toString(),o&&f.length===1&&(f="0"+f),a=a.split("h").join(f)}if(a.includes("mins")){let f=e?l.getMinutes():l.getUTCMinutes();f=f.toString(),o&&f.length===1&&(f="0"+f),a=a.split("mins").join(f)}if(a.includes("ss")){let f=e?l.getSeconds():l.getUTCSeconds();f=f.toString(),o&&f.length===1&&(f="0"+f),a=a.split("ss").join(f)}return a.includes("ap")&&(a=a.split("ap").join(F)),a.includes("AP")&&(a=a.split("AP").join(F.toUpperCase())),a}function A(e){return typeof e=="object"&&e!==null}function m(e){return Array.isArray(e)}function y(e){return m(e)&&e.length>0}function h(e,{checkInteger:t=!0,parse:n=!1,negative:i=!1}={}){return n&&c(e)&&(e=e.trim(),e.match(/^-?\d+(\.\d+)?$/)&&(e=parseFloat(e))),typeof e=="number"&&!isNaN(e)?!i&&e<0?!1:t?!!Number.isInteger(e):!0:!1}function q(e,{parse:t=!1,negative:n=!1}={}){return t&&c(e)&&(e=e.trim(),e.match(/^-?\d+(\.\d+)?$/)&&(e=parseFloat(e))),typeof e=="number"&&!isNaN(e)?!(!n&&e<0):!1}function te(e,t,n=!0){c(t)&&(t=[t]),(!c(e)||!x(t))&&u([e,t,"ae472ff3-f587-59de-aea5-205250606455"]),t=Ce(t,"d");let i=t.findIndex(r=>n?e.startsWith(r):Se(e,r));return i===-1?e:e.slice(t[i].length)}function v(e){return e<0&&(e=.001),new Promise(t=>{setTimeout(t,Math.round(e*1e3))})}function ne(e,t){return e.findIndex(n=>(t=c(t)?t.toLowerCase():t,n=c(n)?n.toLowerCase():n,t===n))}function he(e,t){return e.toLowerCase().indexOf(t.toLowerCase())}function Se(e,t){return e.toLowerCase().startsWith(t.toLowerCase())}function W(e,t){return he(e,t)!==-1}function p(e,t){return ne(e,t)!==-1}function J(e,t){return m(e)||u(["10d97e53-455f-44cb-80e4-0f23e36786d0",e]),t?e.filter((n,i,r)=>ne(r,n)===i):e.filter((n,i,r)=>r.indexOf(n)===i)}function c(e){return typeof e=="string"||e instanceof String}function w(e){return c(e)&&e.length>0}function Oe(e,t){return(!(w(t)||q(t))||!A(e))&&u(["01231b1a-77fc-41fa-ac08-a5bab19e6c0f",t,e]),Object.hasOwn(e,t)}function Ce(e,t="a",n=!1){return(!m(e)||!w(t))&&u(["f3bcd368-e4db-4417-93e5-77c865f31e20",e,t]),t=t.toLowerCase(),n&&(e=Q(e)),e.sort((i,r)=>{let b=h(i==null?void 0:i.length)?i.length:0,d=h(r==null?void 0:r.length)?r.length:0;return t==="a"?b-d:d-b})}function K(e){return e&&(e==null?void 0:e.stack)||e instanceof Error}function Fe(e){return c(e)&&e.match(/[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/)}function u(e,...t){let n=new Error,i=new Date().toLocaleString();if(n.time=i,y(t)&&(e=Le(e,t)),m(e)){n.message=n.errCode=e.find(d=>Fe(d))||e.find(d=>c(d))||"";let r=[...e.filter(d=>!K(d))];n.topInfo=[...r];let b=function(d){let o=d.find(a=>K(a));o&&(r.push("--",o),m(o.topInfo)&&(r=[...r,...o.topInfo],b(o.info)))};b(e),e=r}else(c(e)||q(e))&&(n.message=n.errCode=e);throw n.info=e,n}function x(e,{emptyStringAllowed:t=!0}={}){return m(e)&&e.every(n=>c(n)&&!t&&n.length===0?!1:c(n))}function ie(e,t,n=!0){return(!c(e)||!c(t))&&u([e,t,"75aed006-652c-5412-bcb8-d735046c1a52"]),e=ee(e,t,n),e=k(e,t,n),e}function j(e){if(!h(e,{checkInteger:!1,parse:!0}))return!1;e=parseInt(e);let t=new Date("1971").getTime(),n=new Date(""+(new Date().getUTCFullYear()+100)).getTime();return e>t&&e<n}function Q(e,t){if(!A(e))return e;if(w(t)&&(t=[t]),y(t)){x(t)||u(["aac95e2a-e2be-498e-bee5-711fa0493005",t]);let n={};for(let i in e)t.includes(i)||Oe(e,i)&&(n[i]=e[i]);e=n}try{return JSON.parse(JSON.stringify(e))}catch(n){u(["746a0a52-37d8-5477-b4b6-10ed37d36332",n])}}function fe(e,t,n=!0){return c(t)&&(t=[t]),(!c(e)||!m(t))&&u(["d17ff8b7-5bb9-4983-ae9b-a1c5fc3e42c1",e,t]),t.findIndex(i=>n?e.includes(i):W(e,i))!==-1}function re(e,t,n=!0){return c(t)&&(t=[t]),(!c(e)||!m(t))&&u(["a2f13891-5a48-58b6-b0a7-9ef012dcc0f2",e,t]),t.every(i=>n?e.includes(i):W(e,i))}function Le(...e){return[].concat(...e)}var ae=V(require("http"),1),ce=V(require("https"),1);var _=require("os"),$=require("child_process"),se=require("util");var E=require("url"),C=require("querystring");var _e=(0,se.promisify)($.exec),$e=process.platform==="win32";function Ne(){return $e}var ft=!Ne()&&Ae("rsync",{args:"--help",cmdInQuotes:!1,sync:!0,outputIncludes:"Copyright"});function Y(e=[],t=!1,n=1){if(m(e)||(e=[e]),e.length===1&&c(e[0])&&!e[0].includes(_.EOL))console.log(P()+" "+e[0]);else{console.log("-- "+P());for(let i of e)c(i)&&i.length<1||console.log(i);console.log("--")}t&&process.exit(n)}async function G(e,t,{timeoutS:n=60,headers:i={},rejectUnauthorized:r=!1}={}){(!w(e)||!A(i)||!h(n))&&u(["1e7f9925-530d-4c76-9f08-bac736d94c63",e,i,n]),n=n*1e3,i=Q(i);let b=J(Object.keys(i),!0);p(b,"Content-Type")||(i["Content-Type"]="application/json");let d=J(Object.values(i),!0);A(t)?p(d,"application/json")?t=JSON.stringify(t):t=(0,C.stringify)(t):t=t+"",p(b,"Content-Length")||(i["Content-Length"]=t.length);let{protocol:o,hostname:a,pathname:s,port:l}=new E.URL(e),F=ae.default;o.includes("https")&&(F=ce.default);let f={data:"",status:null,headers:null,statusMessage:"",statusCode:null};return await new Promise((de,B)=>{let L=F.request({rejectUnauthorized:r,hostname:a,port:l||80,path:s,method:"POST",headers:i,timeout:n},g=>{f.headers=g.headers,f.status=g.statusCode,f.statusCode=g.statusCode,f.statusMessage=g.statusMessage,g.on("data",H=>{f.data+=H}),g.on("end",()=>{de(f)}),g.on("error",H=>{g.destroy(),B(H)})});L.on("error",g=>{L.destroy(),B(g)}),L.on("timeout",g=>{L.destroy(),B(g)}),L.write(t),L.end()}),f}function Ae(e,{args:t,outputIncludes:n,matchCase:i=!1,matchAll:r=!0,cmdInQuotes:b=!0,sync:d=!1}={}){let o="";c(t)&&(t=[t]),c(n)&&(n=[n]),(!w(e)||!x(t,{emptyStringAllowed:!1})||!x(n,{emptyStringAllowed:!1}))&&u(["20c6703e-072b-4955-b827-3937bb7c6436",e,t,n]),b&&(e=ie(e,'"')),t.unshift(e);let a=function(s){if(y(n)){if(!w(s==null?void 0:s.stdout))return!1;if(s=s.stdout,r){if(!re(s,n,i))return!1}else if(!fe(s,n,i))return!1}return!0};if(d){try{o=(0,$.execSync)(t.join(" "))}catch{return!1}return a(o)}return(async()=>{try{o=await _e(t.join(" "))}catch{return!1}return a(o)})()}function ue(e){let t=process.argv.slice(2);if(e)return t;let n={};for(let i of t){i=te(i,["--","-"]),i=i.split("=");let r=i.shift(),b=!0;y(i)&&(b=i.join("=")),n[r]=b}return n}var{ip:N,ipAddress:xe,pwd:D,password:De,p:Ie,user:I,username:pe,u:Ee,url:U,tries:S,t:ze,wait:O,w:Me}=ue();D=D||De||Ie;N=N||xe;I=I||pe||Ee;S=S||ze;O=O||Me;w(I)||(I="admin");(!w(N)||!c(D))&&throwError(["90ca0991-d497-490d-9f25-d15b31da4df2",N,D,"IP or Password not given!"]);w(U)||(U=`http://${N}/platform.cgi`);S=parseInt(S);O=parseInt(O);(!h(S)||S<1)&&(S=1);(!h(O)||O<1)&&(O=1);var le={"Content-Type":"application/x-www-form-urlencoded",Referer:`http://${N}/`},Z=0,z=!1,R,M;(async()=>{for(;!z&&!(Z>=S);){if(Z++,!R)try{M=await G(U,{thispage:"index.html","users.username":I,"users.password":D,"button.login.users.dashboard":"Login"},{headers:le,timeoutS:120})}catch{continue}let{data:e}=M,t=e.match(/name=\"token\"\s*value=\"(\w+)/);if(!y(t)||!y(M.headers["set-cookie"]))continue;R=t[1];let n=M.headers["set-cookie"][0];try{e=(await G(U,{thispage:"factoryDefault.html",token:R,"button.reboot.statusPage":"Reboot"},{headers:{...le,Cookie:n},timeoutS:120})).data}catch{continue}z=/Router will be up in/.test(e),z||await v(O)}z?Y(["Jio Router restarted successfully!"]):Y(["Error restarting Jio Router!",`Tried ${Z} times. Ensure ip and password is correct`]),console.log(_.EOL+_.EOL)})();
