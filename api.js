// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod  VladimirU
const personalKey = "VladimirU"; 
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;


export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts.map((post) => {
        return {
          name: post.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post.user?.imageUrl,
          id: post.user.id,
          idPost: post.id,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post.likes[0]?.name,
        }
      });
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  })
}


// добавление нового поста

export function addPost({ token, description, imageUrl }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl,
    }),
  }).then((response) => {
    if(response.status === 400) {
      throw new Error ('Нужно описать фото')
    }
    return response.json();
  })
};

// список постов пользователя

  export function getUserPosts({id, token}) {
  return fetch(postsHost + "/user-posts/" + id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts.map((post) => {
        return {
          name: post.user?.name,
          description: post.description,
          time: post.createdAt,
          postImg: post.imageUrl,
          userImg: post.user?.imageUrl,
          id: post.user.id,
          idPost: post.id,
          isLiked: post.isLiked,
          likes: post.likes.length,
          whoseLike: post.likes[0]?.name,
        }
      });
    });
  };

    
  export function addLike({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/like", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
    })
  };

  export function addDislike({ token, idPost }) {
    return fetch(postsHost + "/" + idPost + "/dislike", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
     })
  }

  

  export function deletePost({token,idPost}) {
    return fetch(postsHost + "/" + idPost, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        idPost,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при удалении');
      }
      return response.json();
    
    })
    .then(data => {
      console.log('Усё', data);
      // обновить страницу, чтобы отобразить изменения
      location.reload();
    })
    .catch(error => {
      console.error('Ошибка при удалении', error);
      
    });
  }