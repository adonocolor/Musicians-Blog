async function checkButton() {
  await getPosts()
  await updatePostsButton()
  await deletePosts()
}