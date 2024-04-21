var b=Object.defineProperty;var S=(t,e,s)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var g=(t,e,s)=>(S(t,typeof e!="symbol"?e+"":e,s),s);import{i as c,a as E,S as x}from"./assets/vendor-f736e62a.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function P(t){return t.map(e=>`<li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" loading="lazy" alt="${e.tags}" width="360"
height="282"/>
        <ul class="card-info">
          <li class="text-span">Likes
            <p class="text">${e.likes}</p>
          </li>
          <li class="text-span"> Views
            <p class="text">${e.views}</p>
          </li>
          <li class="text-span"> Comments
            <p class="text">${e.comments}</p>
          </li>
           <li class="text-span"> Downloads
           <p class="text">${e.downloads}</p>
           </li>
        </ul>
      </a>
    </li>`).join("")}const n=class n{static show(){n.spinner.classList.remove("hidden")}static hide(){n.spinner.classList.add("hidden")}};g(n,"spinner",document.querySelector(".loader-backdrop"));let m=n;const q="43490794-44764587ca88d9eedc273b8a9",v="https://pixabay.com/api/",d=15,f=document.querySelector(".gallery"),R=document.querySelector(".search-form"),a=document.querySelector(".load-more"),h=document.querySelector(".loader-backdrop");let p="",i=1,y=0;R.addEventListener("submit",A);a.addEventListener("click",H);async function A(t){t.preventDefault(),p=t.currentTarget.elements.query.value.trim(),i=1,f.innerHTML="",a.hidden=!0;try{const e=await w(p,i);L(e),a.hidden=e.totalHits<=d,y=e.totalHits}catch(e){console.log("catch",e),c.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}}async function H(){i+=1;try{const t=await w(p,i);L(t),a.hidden=i*d>=y,$()}catch(t){console.log("catch",t),c.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}}function L(t){if(t.hits.length===0){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}i===1&&t.totalHits>0&&(a.hidden=!1),i*d>=t.totalHits&&(c.info({title:"End of search results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.hidden=!0);const e=P(t.hits);f.insertAdjacentHTML("beforeend",e),I.refresh()}async function w(t,e){try{h.classList.remove("hidden");const l=(await E.get(v,{params:{key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:d}})).data;return h.classList.add("hidden"),l}catch(s){console.log("catch",s),c.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"}),h.classList.add("hidden")}}const I=new x(".gallery-item a",{captionsData:"alt",captionDelay:200});function $(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
