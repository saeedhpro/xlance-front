<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="px-3">
    <div class="pb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">تغییر رمز عبور</div>
    </div>
    <div class="mt-10 text-center ir-light text-sm text-gray-700">
      رمز عبور باید
      <span class="ir-bold text-gray-700">حداقل 8 حرفی</span>
      باشد.
    </div>
    <div class="my-5 text-sm text-gray-700 ir-light text-center">
      جهت
      <span class="ir-bold text-gray-700">امنیت بیشتر</span>
      حساب کاربری،بهتر ازدر رمز عبور خود از ،
      <span class="ir-bold text-gray-700">حروف کوچک و بزرگ انگلیسی</span>
      و همچنین
      <span class="ir-bold text-gray-700">عبارات خاص (مانند !@#$%^&*_)</span>
      استفاده نمایید.
    </div>
      <div class="sm:w-1/3 m-auto flex flex-col">
    <div class="my-3">
      <label class=" text-sm my-5 ir-medium text-black">رمز عبور فعلی</label>
      <input type="password" class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl" placeholder="*************"
             v-model="password">
    </div>
    <div class="my-3">
      <label class="text-sm my-5 ir-medium text-black">رمز عبور جدید</label>
      <input type="password" class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl" placeholder="*************"
      v-model="new_password">
    </div>
    <div class="my-3">
      <label class="text-sm my-5 ir-medium text-black">تکرار رمز عبور جدید</label>
      <input type="password" class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl" placeholder="*************"
      v-model="new_password_confirmation">
    </div>
      </div>
    <div class="my-10 text-center text-white">
      <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="ChangePassword">
        <span v-if="loadingText">تغییر رمز عبور</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8" alt=""/>
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
        name: "Password",
        data(){
            return{
                status:'1',
                password:null,
                new_password:null,
                new_password_confirmation:null,
              loadingText : true,
              loadingbtn : false
            }
        },
        methods:{
            ChangePassword () {
              this.loadingbtn = true
              this.loadingText = false
                this.$store.dispatch('user/ChangePassword1', {
                    password: this.password,
                    new_password: this.new_password,
                    new_password_confirmation: this.new_password_confirmation
                })
                    .then(res => {
                      this.$snotify.success('پسورد شما با موفقیت تغییر کرد', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                      })
                      this.loadingText = true
                      this.loadingbtn = false
                      // setTimeout(() => {
                      //   this.$store.dispatch('user/exit')
                      //   this.$router.replace('/')
                      // }, 250)
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
            }
        }

    }
</script>
