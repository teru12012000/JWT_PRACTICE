type posts={
  title:string;
  body:string;
}
export const publicPosts:posts[]=[
  {
    title:"誰でも見れる記事",
    body:"誰でも見れる記事です。"
  },{
    title:"共有できる記事です",
    body:"共有できる記事です。"
  },
]

export const privatePosts:posts[]=[
  {
    title:"jwtで見れる記事",
    body:"jwdで見れる記事です。"
  },
]