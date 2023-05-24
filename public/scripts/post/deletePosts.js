function deletePosts() {
  let posts = document.querySelectorAll('.post')

  for (let i = 0; i < posts.length; i++) {
    let button = document.createElement('button')
    button.innerText = 'Delete'
    button.setAttribute('type', 'button')
    button.setAttribute('onclick', `deletePost(${posts.item(i).getAttribute('data-id')})`)
    posts.item(i).append(button)
  }
}

async function deletePost(id) {
    await fetch('/post/' + id, {
      method: "DELETE",
    })
      .then(res=> res.text()).then(res => alert('The post has been deleted!'));
    location.reload()
}