export interface AuthState{
  user: User | null
}

export interface User {
  username: string
  token: string
}

export interface SignUpBody {
  username: string
  password: string
}

export interface SignInBody {
  username: string
  password: string
}
