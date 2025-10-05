export interface IGoogleProfile {
  name: {
    givenName: string
    familyName: string
  }
  emails: Array<{
    value: string
  }>
  photos: Array<{
    value: string
  }>
}

export interface IGoogleUser {
  email: string
  firstName: string
  lastName: string
  picture: string
  accessToken: string
  refreshToken: string
}
