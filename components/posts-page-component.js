import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage,likeEventListener } from "../index.js";
import {currentDate} from "../index.js";
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api +
  console.log("Актуальный список постов:", posts);
  
  // получаем строку, содержащую разметку для каждого поста из массива posts
  const postsHtml = posts.map((post, index) => {
  //   const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('ru');
    return `<li class="post">
    <div class="post-header" data-user-id="${post.id}">
        <img src=${post.userImg} class="post-header__user-image">
        <p class="post-header__user-name">${post.name}</p>
    </div>
    <div class="post-image-container">
      <img class="post-image" src=${post.postImg}>
    </div>
    <div class="post-likes">
      <button data-post-id="${post.idPost}" data-index="${index}" class="like-button">
        <img src="${post.isLiked? `./assets/images/like-active.svg` : `./assets/images/like-not-active.svg` }">
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${post.whoseLike? `${post.whoseLike}`: `0`} ${post.likes > 1? `и еще ${post.likes - 1}` : `` }</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${post.name}</span>
      ${post.description}
    </p>
    <p class="post-date">
    ${formattedDate} 
    </p>
  </li>`
  })
// получаем строку, содержащую разметку для всего компонента страницы постов
  const appHtml = `
    <div class="page-container">
    <div class="header-container"></div>
      <ul class="posts">
        ${postsHtml}
      </ul>
      // <button class="scroll-top-button">UP</button>
      <a href="#" class="scroll-top-button"><span class="arrow"></span></a> 
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  likeEventListener();
// обработчики событий на кнопки лайков
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

 // обработчик события на кнопку перехода на верх страницы
 const scrollTopButton = document.querySelector(".scroll-top-button");
 scrollTopButton.addEventListener("click", () => {
   window.scrollTo({ top: 0, behavior: "smooth" });
 });

}
