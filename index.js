/* empty css                      */import{i as c,S as u}from"./assets/vendor-5ObWk2rO.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p=s=>`
    <li class="gallery-card">
        <a class = "js-gallery-link" href = "${s.largeImageURL}"> <img class="gallery-img" src="${s.webformatURL}" alt="${s.tags}"/></a>
        <div class="stats-container">
            <ul class="stats-list">
                <li class="gallery-item">
                    <span class="label">Likes</span>
                    <span class="value">${s.likes}</span>
                </li>
                <li class="gallery-item">
                    <span class="label">Views</span>
                    <span class="value">${s.views}</span>
                </li>
                <li class="gallery-item">
                    <span class="label">Comments</span>
                    <span class="value">${s.comments}</span>
                </li>
                <li class="gallery-item">
                    <span class="label">Downloads</span>
                    <span class="value">${s.downloads}</span>
                </li>
            </ul>
        </div>
    </li>`,m=s=>{const a=new URLSearchParams({key:"53227460-8ffef261ea458fd0efa7b626a",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${a}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})};let n=null;const d=()=>{n?n.refresh():n=new u(".js-gallery a",{captionDelay:250,captionsData:"alt"})},o={searchForm:document.querySelector(".js-search-form"),gallery:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader")},y=s=>{s.preventDefault();const{target:a}=s,r=a.elements.user_query.value.trim();if(r.length===0){c.show({title:"WARNING",message:"Search query cannot be empty!",color:"red",position:"topCenter"});return}o.gallery.innerHTML="",o.loader.classList.add("is-active"),m(r).then(l=>{if(l.hits.length===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topCenter"});return}const e=l.hits.map(t=>p(t)).join("");o.gallery.innerHTML=e,d()}).catch(l=>{console.log(l)}).finally(()=>{o.loader.classList.remove("is-active")})};o.searchForm.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
