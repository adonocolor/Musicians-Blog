let response = fetch("/post/all", {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
})
  .then((res) => res)
  .then((data) => data.json());

let post_ids = [];
let comment_ids = [];
let i = 0
let j = 0

async function deleteComment(id) {
  fetch("/comment/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}
async function deletePost(id) {
  fetch("/post/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}

function createComment(postId, userId, commentText) {

  let formData = new FormData();
  formData.append('commentText', commentText)
  let formDataObject = Object.fromEntries(formData.entries());

  fetch("/comment/" + postId + userId,
    {
      method: "POST",
      body: formDataObject,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
}


const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

window.onload = async () => {
  const postList = await response;
  for (const post in postList) {
    if (post !== "time") {
      post_ids.push(postList[post].id)
      const post_section = document.createElement("div");
      post_section.className = "post";
      post_section.innerHTML += `
                <article class="post-article">
                    <h2 class="post-title">${postList[post].postTitle}</h2>
                    <p class="post-date">${formatDate(
        postList[post].createdAt
      )}</p>
                    <p class="post-content">${postList[post].postContent}</p>
                </article>
        `;

      const category_section = document.createElement("div");
      category_section.className = "categories";
      category_section.className = "categories";
      post_section.appendChild(category_section);
      category_section.innerHTML += `
        <h3 class="category-name">Categories:</h3>
        `;

      for (const category in postList[post].categories) {
        category_section.innerHTML += `
        <p class="category-name">${postList[post].categories[category].categoryName}</p>
        `;
      }

      const comment_section = document.createElement("div");
      comment_section.className = "comments";
      post_section.appendChild(comment_section);

      comment_section.innerHTML += `
        <h3 class="category-name">Comments:</h3>
        `;

      for (const comment in postList[post].comments) {
        comment_ids.push(postList[post].comments[comment].id)
        comment_id = postList[post].comments[comment].id;
        comment_section.innerHTML += `
            <div class="comment">
                    <p class="commentAuthor">${postList[post].comments[comment].user.username}</p>
                    <p class="commentText">${postList[post].comments[comment].commentText}</p>
                    <form class="delete-comment-form" target="_blank" onSubmit="deleteComment(comment_ids[j]); window.location.href = 'posts';">
                      <button type="submit">Delete</button>
                    </form>
            </div>`;
        j++
      }

      const add_comment_form = document.createElement("div");
      add_comment_form.className = "add-comment-form";
      post_id = postList[post].id
      add_comment_form.innerHTML += `
      <form class="create-comment-form" method="POST" action="/comment/" target="_blank" onSubmit="this.action = this.action + post_ids[i]
 + '/' + this.userId.value; window.location.href = 'posts';">
      <input type="number" placeholder="your userId" name="userId">
      <input type="text" placeholder="...type your thoughts here!" name="commentText">
      <button type="submit">Add</button>
      </form>
      `;
      post_section.appendChild(add_comment_form);

      const delete_post_form = document.createElement("div");
      delete_post_form.className = "delete-post-form";
      delete_post_form.innerHTML += `
                          <form class="delete-comment-form" target="_blank" onSubmit="post_ids[i]">
                      <button type="submit">Delete Post</button>
                    </form>`
      post_section.appendChild(delete_post_form)

      document.querySelector("#post-container").appendChild(post_section);
      i++
    }
  }

  console.log(post_ids)
};