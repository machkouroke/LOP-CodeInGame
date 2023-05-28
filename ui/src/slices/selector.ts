export function getUserInfo(state: any): User {
  return state.authApi.queries['getUserDetails("userDetails")'].data
}