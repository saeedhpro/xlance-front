<template>
  <div class="container bg-white  rounded-lg shadow-lg" v-if="user">
    <div class="px-3">
      <div class="pb-2 border-b-2 border-gray-300 justify-between">
        <div class="w-32 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">تنظیمات حساب کاربری</div>
      </div>
    <img src="/images/shaba.png" class="mx-auto mt-4"/>
    <div class="mt-10 mb-5 text-center text-sm ir-bold">شماره شبای حساب بانکی</div>
    <div class="my-5 text-sm text-center text-gray-600">
      لطفا شماره شبای حساب بانکی
      <span class="ir-bold">به نام خود</span>
      را در کادر زیر وارد کنید.
    </div>
    <div class="my-5 text-sm text-center text-gray-600">
      حتما دقت کرده باشید که
      <span class="ir-bold">شماره شبای وارد شده</span>
      متعلق به
      <span class="ir-bold">مالک حساب کاربری در ایکس لنس</span>
      باشد.
    </div>
    <div class="my-5 sm:w-1/2 m-auto flex flex-col relative">
      <div class="my-3 text-sm">شماره شبای حساب بانکی شما</div>
      <input class="h-10 pl-8 px-2 mr-auto border-2 border-solid border-gray-600 rounded-lg text-left" :value="user.profile.sheba"
             @input="getSheba"
             name="sheba"
      style="text-align: -webkit-left;width: 315px"/>
      <div class="absolute" style="left: 6px;margin-top: 52px;">
      <img src="../../../static/images/IR.png" />
      </div>
      <div class="text-sm text-danger" v-if="shebaerroe.length>0">{{shebaerroe}}</div>


    <div class="mr-5 text-green1 ir-light absolute align-center sheba-name" v-if="user.profile.sheba_accepted">
      <i class="fal fa-check-square"></i>
      {{user.full_name}}
    </div>
      <div class="mr-5 text-gray-600 ir-light absolute" v-else-if="user.profile.sheba && !user.profile.sheba_accepted" style="margin-top: 50px">درحال بررسی</div>
      <div v-else></div>


    </div>
    <div class="my-10 text-center text-white">
      <button type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="sendSheba">
        <span v-if="loadingText">ثبت شماره شبا</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8"/>
      </button>
    </div>
    </div>

    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>
<script>
    export default {
        name: "AccountSettings",
        data(){
            return{
                status:'1',
                sheba:'',
                shebaerroe:'',
                show:false,
                // user:null
              loadingText : true,
              loadingbtn : false
            }
        },
        methods:{
            sendSheba(){
              this.loadingbtn = true
              this.loadingText = false
                if( this.user.profile.sheba.length != 24){
                    this.$snotify.error('طول شماره شبا 24 کاراکتر باید باشد!', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    })
                    return
                }

                this.$store.dispatch('user/sheba', {
                    sheba: this.user.profile.sheba,
                })
                    .then(res =>
                    {
                        this.show=true

                        this.$snotify.success('شماره شبای شما با موفقیت ثبت شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                      this.loadingbtn = false
                      this.loadingText = true
                    })
                    .catch(async err => {
                        const keys = Object.keys(err.response.data.errors);
                        for (let i = 0; i < keys.length; i++){
                            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                                await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                                    timeout: 2000,
                                    showProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true
                                })
                            }
                        }
                    })
            },
          getSheba(e){
            const data = e.target
            // this.user.profile = {
            //   ...this.user.profile , [data.name] : data.value
            // }
            this.$store.commit('user/setSheba' , data)
          }
        },
        // watch:{
        //     sheba(val){
        //         let r = ''
        //         if(val.length != 24){
        //             this.shebaerroe = 'طول شماره شبا باید24 کاراکتر باشد!!'
        //         }
        //         else {
        //             this.shebaerroe = ''
        //         }
        //     }
        //     // sheba(val){
        //     //     let r = '/^(?:IR)(?=.{24}$)[0-9]*$/'
        //     //     let reg = new RegExp(r)
        //     //     console.log(reg.test(val) , 'reg.test(val)')
        //     //     if(!reg.test(val)){
        //     //         this.shebaerroe = 'طول شماره شبا باید 11 کاراکتر باشد!!'
        //     //     }
        //     //     else {
        //     //         this.shebaerroe = ''
        //     //     }
        //     // }
        // },

       mounted() {
           // this.user = await this.$store.getters['user/user']
         // this.$store.dispatch('account/me')
        },
      computed:{
          user(){
            return this.$store.getters['user/user']
          }
      }
    }
</script>

<style>
@media (max-width: 1000px) {
  .sheba-name{
    margin-top: 88px!important;
  }
}
.sheba-name{
  margin-top: 52px
}
</style>
