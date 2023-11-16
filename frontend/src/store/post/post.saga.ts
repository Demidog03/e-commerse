import {deletePost, fetchDeletePost, fetchPosts, setPosts} from './post.slice.ts'
import {deletePostApi, fetchPostsApi} from '../../api/post.ts'
import {call, put, takeLeading, delay} from 'redux-saga/effects'
import {ResponseType} from '../../api/types.ts'
import {setSpinnerOpen} from '../spinner/spinner.slice.ts'


function* getPostsSaga() {
  try {
    yield put(setSpinnerOpen(true))
    yield delay(1000);
    const response: ResponseType<ReturnType<typeof fetchPostsApi>> = yield call(fetchPostsApi)
    yield put(setPosts(response.data))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

function* deletePostSaga(action: ReturnType<typeof fetchDeletePost>) {
  try {
    yield put(setSpinnerOpen(true))
    yield delay(1000);
    const response: ResponseType<ReturnType<typeof deletePostApi>> = yield call(deletePostApi, action.payload)
    yield put(deletePost({id: response.data.id}))
  } catch {}
  finally {
    yield put(setSpinnerOpen(false))
  }
}

export function* postSaga(){
  yield takeLeading(fetchPosts.type, getPostsSaga)
  yield takeLeading(fetchDeletePost.type, deletePostSaga)
}
