export function createMarkup(images) {
    return images.map(elem => {
        return  `<li class="gallery-item">
      <a href="${elem.largeImageURL}">
        <img src="${elem.webformatURL}" loading="lazy" alt="${elem.tags}" width="360"
height="282"/>
        <ul class="card-info">
          <li class="text-span">Likes
            <p class="text">${elem.likes}</p>
          </li>
          <li class="text-span"> Views
            <p class="text">${elem.views}</p>
          </li>
          <li class="text-span"> Comments
            <p class="text">${elem.comments}</p>
          </li>
           <li class="text-span"> Downloads
           <p class="text">${elem.downloads}</p>
           </li>
        </ul>
      </a>
    </li>`
    })
.join("");
};

export class Loader {
static spinner = document.querySelector('.loader-backdrop');
  static show() {
    Loader.spinner.classList.remove('hidden');
  }

 static hide() {
    Loader.spinner.classList.add('hidden');
  }
}