export interface PostState{
  posts: Post[]
}
export interface Post {
  userId: number
  id: number
  title: string
  body: string
}
