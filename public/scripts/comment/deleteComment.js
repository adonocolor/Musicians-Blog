async function deleteComment(id) {
  await fetch('/comment/' + id, {
    method: "DELETE",
  })
    .then(res=> res.text()).then(res => alert('The comment has been deleted!'));
  location.reload()
}