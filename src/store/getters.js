export const userInfo = state => {
  return {
    userId: state.userId,
    jwt: state.jwt,
    isLogged: state.isLogged
  }
}
