import { renderHeaderComponent } from "./header-component.js";
import { posts, likeEventListener, getId, getToken } from "../index.js";
import { deletePost } from "../api.js";

export function renderUserPageComponent({ appEl }) {

  const postsHtml = posts.map((post, index) => {
    return `<li class="post">
        <div class="post-header" data-user-id="${post.id}">
            <img src=${post.userImg} class="post-header__user-image">
            <p class="post-header__user-name">${post.name}</p>
        </div>
        <div class="post-image-container">
        <img class="post-image" src=${post.postImg}>
        </div>
        ${getId() === post.id ? `<div class="delete-button-container"> <button data-post-id="${post.idPost}" class="delete-button">Удалить пост</button></div>` : ``} 
        <div class="post-likes">
        <button data-post-id="${post.idPost}" data-index="${index}" class="like-button">
              <img src="${post.isLiked ? ` ./assets/images/like-active.svg` : `./assets/images/like-not-active.svg`}">
            </button>
              <p class="post-likes-text"> Нравится: <strong>${post.whoseLike ? `${post.whoseLike}` : `0`} ${post.likes > 1 ? `и еще ${post.likes - 1}` : ``}</strong>
              </div>
        <p class="post-text">
        <span class="user-name">${post.name}</span>
        ${post.description}
        </p>
        <p class="post-date">
        Только что
        </p>
       
    </li>`
  }).join("");
  console.log(getId());
  //  разметка для всего компонента страницы пользователя
  const appHtml = `
   <div class="page-container">
   <div class="header-container"></div>
     <ul class="posts">
       ${postsHtml}
     </ul>
     <a href="#" class="scroll-top-button"><span class="arrow"></span></a> 
   </div>`;

  appEl.innerHTML = appHtml;
  // Рендер компонента заголовка
  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  likeEventListener();

  const token = getToken();
  console.log(token);


  //  const addDeleteButtonListeners = () => {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log('delete');
      const postId = button.dataset.postId;
      deletePost({ idPost: postId, token })
        .then(() => {
          const postIndex = posts.findIndex(
            (post) => post.idPost === postId
          );
          if (postIndex !== -1) {
            posts.splice(postIndex, 1);
            renderUserPageComponent({ appEl });
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          // выполнить дополнительные действия в зависимости от типа ошибки
        });
    });
  });
  // };




  // обработчик события на кнопку перехода на верх страницы

  const scrollTopButton = document.querySelector(".scroll-top-button");
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
