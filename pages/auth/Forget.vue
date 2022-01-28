<template>
<div>
  <Global>
    <div slot="head" class="ir-bold text-2xl">بازیابی رمز عبور</div>
  </Global>
  <div v-if="show">
  <div class="my-4 text-gray-400 text-sm">لطفا ایمیل خود را وارد کنید</div>
  <Inputs :icon="icon" :placeholder="placeholder" v-model="email"/>
    <div class="pt-1 relative text-right mx-2 text-gray-500">
      <i class="fal fa-envelope absolute -mt-10  text-gray-500"></i>
    </div>
  <PurpleButtonGlobal :text="register"  :loading-text="loadingText" :loadingbtn="loadingbtn"  @click.native="sendEmail"/>
  </div>
  <div v-if="onShow">
    <div class="my-4 text-gray-500 text-sm">
      یک کد تایید به ایمیل شما ({{this.email}} ) ارسال شد.
    </div>
    <NuxtLink to="/auth/Forget" class="text-sm text-purple-600 underline ">تغییر ایمیل</NuxtLink>
<!--    <Inputs :icon="icon1" :placeholder="placeholder1"></Inputs>-->
<!--    <PurpolButtonGlobalLink :url="url" :text="go"/>-->
  </div>
</div>
</template>
<script>
    import Global from "../../components/register/Global";
    import Inputs from "../../components/register/Inputs";
    import PurpleButtonGlobal from "../../components/register/PurpleButtonGlobal";
    import PurpolButtonGlobalLink from "../../components/register/PurpolButtonGlobalLink";
    export default {
        name: "Forget",
        layout:'register',
        middleware:'guest',
        components: {PurpolButtonGlobalLink, Global,Inputs,PurpleButtonGlobal},
        data(){
            return{
                icon:'',
                placeholder:'ایمیل',
                icon1:'',
                register:'ارسال کد تایید',
                url:'/auth/Password-recovery',
                // go:'ادامه',
                show:true,
                onShow:false,
                email:null,
                go:'ارسال کد',
              loadingbtn:false,
              loadingText:true
            }
        },
      head(){
        return {
          title: 'فراموشی رمزعبور'
        }
      },
        methods: {
            toggleShow:function f() {
                this.show = !this.show;
                this.onShow = !this.onShow;
            },
            sendEmail(){
              this.loadingbtn = true
              this.loadingText =false
                this.$store.dispatch('user/sendEmail',{
                    email: this.email
                })
                    .then(res=>{
                        this.toggleShow()
                    })
                    .catch(err=>{

                    })
            }
        },
    }
</script>
