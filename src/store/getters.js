const getters = {
  token: state => state.user.token,
  sidebar: state => state.app.sidebar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers
}
export default getters
