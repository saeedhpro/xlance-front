import Pushe from "pushe-webpush";

export default (context, inject) => {
  const user = context.store.state.user.user;
  if(user) {
    if(process.client) {
      Pushe.init("ld83q4r2lv8mrzqe");
      Pushe.subscribe();
      Pushe.setUserEmail(user.email)
        .then(() => '')
        .catch(error => console.error(`Error: ${error}`));
      Pushe.getDeviceId()
        .then(async function(deviceId) {
          await context.store.dispatch('pushe/setDeviceId', deviceId)
        });
      Pushe.addEventListener(Pushe.EVENTS.NOTIFICATION_RECEIVED,async function(data) {
        const content = data.custom_content;
        await context.store.dispatch('pushe/addData', content)
      });
    }
  }
}
