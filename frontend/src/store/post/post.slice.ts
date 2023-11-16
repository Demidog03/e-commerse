import {CaseReducer, createAction, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {Post, PostState} from './post.types.ts'
import {RootState} from '../index.ts'

const initialState: PostState = {
  posts: []
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setPosts: CaseReducer<State, PayloadAction<Post[]>>
  deletePost: CaseReducer<State, PayloadAction<{id: number}>>
  updatePost: CaseReducer<State, PayloadAction<Post>>
}

const postSlice = createSlice<PostState, Reducers<PostState>>({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id)
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);

      if (index !== -1) {
        state.posts = [
          ...state.posts.slice(0, index),
          action.payload,
          ...state.posts.slice(index + 1)
        ];
      }
    }
  }
})

export const fetchPosts = createAction('post/fetchPosts')
export const fetchDeletePost = createAction<{id: number}>('post/fetchDeletePost')

export const {
  setPosts,
  deletePost,
  updatePost
} = postSlice.actions

export const postsSelector = (state: RootState): Post[] => state.post.posts

export default postSlice.reducer
