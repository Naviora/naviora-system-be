export enum CacheKey {
  SESSION_BLACKLIST = 'auth:session-blacklist:%s',
  EMAIL_VERIFICATION = 'auth:token:%s:email-verification',
  PASSWORD_RESET = 'auth:token:%s:password'
}
