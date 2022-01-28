import Echo from "laravel-echo";

export default async ({ store, $axios, $cookies }) => {
  const token = $cookies.get('token')
  window.io = require("socket.io-client");
  if (typeof window.io !== "undefined") {
    try {
      window.Echo = new Echo({
        broadcaster: "socket.io",
        host: 'https://chat.xlance.ir',
        appId: "b9817fd76735c999",
        key: "8705da56dde7ca6e8330b5c97d67dbae",
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });
    } catch (error) {
    }
  }
};
