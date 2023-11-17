import { type RouteObject } from 'react-router-dom'
import { HomePage } from './lazyPages.tsx';
import SignUp from './pages/Signup.tsx'
import {AuthPageGuard} from './components/AuthPageGuard.tsx'
import SignIn from './pages/Signin.tsx'
import {UserPageGuard} from "./components/UserPageGuard.tsx";

export const router: RouteObject[] = [
  {
    path: '/',
    element: (
        <AuthPageGuard>
          <HomePage/>
        </AuthPageGuard>
    )
  },
  {
    path: '/signup',
    element: (
      <UserPageGuard>
        <SignUp/>
      </UserPageGuard>
    )
  },
  {
    path: '/signin',
    element: (
      <UserPageGuard>
        <SignIn/>
      </UserPageGuard>
    )
  },
]
