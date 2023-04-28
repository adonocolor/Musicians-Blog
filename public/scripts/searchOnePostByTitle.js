const button = document.getElementById('search-post');
button.addEventListener('click', async (_) => {
  event.preventDefault();
  const textValue = document
    .querySelector('#search-post-title')
    .value.toString();
  if (textValue.length === 0) {
    alert('Enter event name!');
  } else {
    try {
      const response = await fetch(
        '/post/' +
        new URLSearchParams({
          title: textValue,
        }),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => res.json())
        .then((res) => {
          document.querySelector('#post-container').remove();
          document.querySelector('#post-form').innerHTML += `<div
            id="post-container">
          </div>`

          document.querySelector("#post-container").innerHTML += `
              <div class="post">
                  <article class="post-article">
                      <h2 class="post-title">${res.postTitle}</h2>
                      <p class="post-date">${formatDate(res.createdAt)}</p>
                      <p class="post-content">${res.postContent}</p>
                  </article>
              </div>
          `;
        });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }
});