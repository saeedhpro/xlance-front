export default function ({ store, redirect }) {
  if (!store.state.user.user) {
    return redirect('/auth/log-in')
  }
  else {
    const user = store.state.user.user;
    if(user.roles.indexOf('admin') < 0){
      return redirect('/')
    }
  }
}
