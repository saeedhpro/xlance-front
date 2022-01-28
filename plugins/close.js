// export default  (context) => {
//   if(process.client){
//     window.close = ( async (e)=>{
//       const rememberMe = context.$cookies.get('rememberMe')
//       if(!rememberMe){
//         await context.store.dispatch('user/exit')
//         e.preventDefault()
//     }
//   })
//   }
// }
