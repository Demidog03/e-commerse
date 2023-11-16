import {api} from './api.ts'
import {Post} from '../store/post/post.types.ts'
import {AxiosPromise} from './types.ts'

export const fetchPostsApi = async (): AxiosPromise<Post[]> => {
  return await api.get('/posts/')
}
export const deletePostApi = async ({id}: {id: number}): AxiosPromise<Post> => {
  return await api.delete(`/posts/${id}`)
}
