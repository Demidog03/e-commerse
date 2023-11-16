export interface AuthState{
  user: User | null
}

export interface User {
  username: string
  accessToken: string
}

export interface SignUpBody {
  username: string
  password: string
}

export interface SignInBody {
  username: string
  password: string
}
