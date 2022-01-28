
export const actions={
  async nuxtServerInit ({ dispatch, commit }) {
    let token = this.$cookies.get('token');
    this.$axios.setHeader('Authorization', `Bearer ${token}`)
    await this.$axios.$get('/user/me').then((res) => {
      const user = res.data;
      dispatch('user/setToken', token);
      dispatch('user/setUser', user);
    })
      .catch((err) => {
        dispatch('user/setUser', null);
        dispatch('user/setToken', null);
      });
    await this.$axios.get('/settings')
      .then((res) => {
        commit('user/setSettings', res.data.data);
      })
      .catch((err) => {
        commit('user/setSettings',{
          project_price: 0,
          distinguished_price:0,
          sponsored_price:0,
        });
      });
  },
};

