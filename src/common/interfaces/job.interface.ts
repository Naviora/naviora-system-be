export interface IEmailJob {
  email: string
}

export interface IVerifyEmailJob extends IEmailJob {
  token: string
}

export interface IAccountInfoJob extends IEmailJob {
  name: string
  password: string
}
