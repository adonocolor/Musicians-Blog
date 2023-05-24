let response = fetch("/post/all", {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  }
})
  .then((res) => res)
  .then((data) => data.json());

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

async function createComment(e, form, postId) {
  e.preventDefault()
  let id = form.querySelector('input[name="userId"]')
  let commentText = form.querySelector('input[name="commentText"]')
  await fetch('/comment/' + postId + '/' + id, {
    method: "POST",
    body: JSON.stringify({
      'commentText': commentText.value,
    })})
    .then(res=> res.text()).then(res => alert(res));

  return false
}

window.onload = async () => {
  const postList = await response;
  for (const post in postList) {
    if (post !== "time") {
      const post_section = document.createElement("div");
      post_section.className = "post"
      post_section.setAttribute('data-id', postList[post].id)
      post_section.innerHTML += `
                <article class="post-article">
                    <h2 class="post-title">${postList[post].postTitle}</h2>
                    <p class="post-date">${formatDate(postList[post].createdAt)}</p>
                    <p class="post-content">${postList[post].postContent}</p>
                </article>
      `;

      const category_section = document.createElement("div");
      category_section.className = "categories";
      post_section.appendChild(category_section);
      category_section.innerHTML += `
        <h3 class="category-name">Categories:</h3>
       `;

      for (const category in postList[post].categories) {
        category_section.innerHTML += `
          <p data-id="${postList[post].categories[category].id}" class="category-name">${postList[post].categories[category].categoryName}</p>
        `;
      }

      const comment_section = document.createElement("div");
      comment_section.className = "comments";
      post_section.appendChild(comment_section);

      comment_section.innerHTML += `
        <h3 class="comments-header">Comments:</h3>
       `;

      for (const comment in postList[post].comments) {
        comment_section.innerHTML += `
            <div data-id="${postList[post].comments[comment].id}" class="comment">
                    <p class="commentAuthor">${postList[post].comments[comment].user.username}</p>
                    <p class="commentText">${postList[post].comments[comment].commentText}</p>
                    <button class="update-comment-button" onclick="updateComment(${postList[post].comments[comment].id})">Update</button>
                    <button class="delete-comment-button" onclick="deleteComment(${postList[post].comments[comment].id})">Delete</button>
            </div>`;
      }
      const add_comment_form = document.createElement("div");
      add_comment_form.className = "add-comment-form";
      add_comment_form.innerHTML += `
          <form id="post-form" onsubmit="createComment(event, this, ${postList[post].id})">
          <input type="number" placeholder="your userId" name="userId"/>
          <input type="text" placeholder="...type your thoughts here!" name="commentText"/>
          <button type="submit">Add</button>
          </form>
      `;
      post_section.appendChild(add_comment_form);

      document.querySelector("#post-container").appendChild(post_section);
    }
  }
};