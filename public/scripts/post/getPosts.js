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

function clearPosts() {
  let container = document.querySelector("#post-container")
  while(container.firstElementChild) {
    container.firstElementChild.remove();
  }
  let button = document.querySelector('#check-posts')
  button.innerText = 'Check'
}

async function getPosts() {
  let container = document.querySelector("#post-container")
  if (container.firstElementChild) {
    await clearPosts()
    return
  }

  let button = document.querySelector('#check-posts')
  button.innerText = 'Hide'

  const postList = await response;

  for (const post in postList) {
    if (post !== "time") {
      const post_section = document.createElement("div");
      post_section.className = "post"
      post_section.setAttribute('data-id', postList[post].id)
      post_section.innerHTML += `
                <article class="post-article">
                    <h2 class="post-title">${postList[post].postTitle}</h2>
                    <p class="post-date">${formatDate(
        postList[post].createdAt
      )}</p>
                    <p class="post-content">${postList[post].postContent}</p>
                </article>
        `;
      container.appendChild(post_section);

      let p = document.createElement('h3')
      p.innerText = 'Categories:'
      post_section.appendChild(p)

      const category_section = document.createElement("div");
      category_section.className = "categories";
      post_section.appendChild(category_section);

      for (const category in postList[post].categories) {
        category_section.innerHTML += `
        <p data-id="${postList[post].categories[category].id}" class="category-name">${postList[post].categories[category].categoryName}</p>
        `;
      }
    }
  }
}
