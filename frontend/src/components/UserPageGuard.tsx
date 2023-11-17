import {type FC, type PropsWithChildren, useEffect} from 'react'
import { useNavigate} from 'react-router'
import { useSelector } from '../store'
import {isAuthenticatedSelector} from '../store/auth/auth.slice.ts'

export const UserPageGuard: FC<PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated]);

  if(!isAuthenticated) {
    return <>{children}</>
  }
}
