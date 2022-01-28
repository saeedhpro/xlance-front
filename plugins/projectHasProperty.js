import Vue from 'vue'

function phr (properties, id) {
  const roles = properties.filter(r => {
    return r.id === id
  });
  return roles.length > 0;
}
Vue.prototype.$phr = phr;
