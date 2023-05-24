// async function createComment(e, form, postId) {
//   e.preventDefault()
//   let id = form.querySelector('input[name="userId"]')
//   let commentText = form.querySelector('input[name="commentText"]')
//   await fetch('/comment/' + postId + '/' + id, {
//     method: "POST",
//     body: JSON.stringify({
//       'commentText': commentText.value,
//     })})
//     .then(res=> res.text()).then(res => alert(res));
//
//   return false
// }