<template>
<div>
  <Global>
    <div slot="head" class="ir-bold text-2xl">ثبت نام در ایکس لنس</div>
  </Global>
  <div class="my-8 w-full flex flex-wrap ">
    <div class=" w-1/2 py-3  text-gray-500 border-2 border-gray-500 rounded-lg rounded-tl-none rounded-bl-none text-sm click" @click="setemployer" :class="{'selected' : menuStatus === '1'}">پروژه دارم(کارفرما)</div>
    <div class="w-1/2 py-3  text-gray-500 border-2 border-gray-500 rounded-lg rounded-tr-none rounded-br-none text-sm click" @click="setfreelancer" :class="{'selectedGreen' : menuStatus === '2'}">پروژه می خواهم(فریلنسر)</div>
  </div>
  <img src="/images/art5.png" class="my-3 mx-auto"/>
  <div>
  <Inputs :icon="icon" :placeholder="placeholder" v-model="username"/>
    <div class="pt-1 relative text-right mx-2 text-gray-500">
      <i class="fal fa-user absolute -mt-10  text-gray-500"></i>
    </div>
  <Inputs :icon="icon1" :placeholder="placeholder1" v-model="email"/>
    <div class="pt-1 relative text-right mx-2 text-gray-500">
      <i class="fal fa-envelope absolute -mt-10  text-gray-500"></i>
    </div>
  <Inputs type="password" :icon="icon2" :placeholder="placeholder2" v-model="password"/>
    <div class="pt-1 relative text-right mx-2 text-gray-500">
      <i class="fal fa-lock absolute -mt-10  text-gray-500"></i>
    </div>
<!--  <Inputs  :icon="icon2" :placeholder="placeholder3" v-model="introducer"/>-->
<!--    <div class="pt-1 relative text-right mx-2 text-gray-500">-->
<!--      <i class="fal fa-user-plus absolute -mt-10  text-gray-500"></i>-->
<!--    </div>-->
  </div>
  <div class="my-3 text-sm text-purple-600" style="font-size: 11px">با کلیک بر روی ثبت‌نام، موافقت خود را با قوانین و مقررات ایکس‌لنس اعلام می‌کنید</div>
  <PurpleButtonGlobal :text="register0" :loading-text="loadingText" :loadingbtn="loadingbtn" @click.native="register"/>
  <WhiteButtonGlobalLink :url="url" :text="logIn" />
  <client-only>
    <vue-snotify></vue-snotify>
  </client-only>
</div>
</template>
<script>
  import Global from "../../components/register/Global";
  import Inputs from "../../components/register/Inputs";
  import WhiteButtonGlobalLink from "../../components/register/WhiteButtonGlobalLink";
  import PurpleButtonGlobal from "../../components/register/PurpleButtonGlobal";
    export default {
        name: "Register",
        layout:'register',
        middleware:'guest',
        components:{PurpleButtonGlobal, WhiteButtonGlobalLink, Inputs, Global},
        data(){
            return{
                placeholder:'نام کاربری',
                icon: 'user',
                placeholder1:'ایمیل',
                icon1:'user',
                placeholder2:'رمز عبور',
                placeholder3:'کد معرف (اختیاری)',
                icon2:'user',
                register0:'ثبت نام',
                // url0:'/auth/Complete-registration',
                url:'/auth/Log-in',
                logIn:'ورود',
                menuStatus: '1',
                username:null,
                email:null,
                password:null,
                introducer:null,
                role:'employer',
              loadingbtn:false,
              loadingText:true
            }
        }
  ,
  head(){
    return {
      title: 'ثبت نام'
    }
  },
        methods:{
            setemployer(){
                this .menuStatus= '1';
                this .role = 'employer'
            },
            setfreelancer(){
                this .menuStatus= '2';
                this .role = 'freelancer'
            },
            register(){
              this.loadingbtn =true
              this.loadingText =false
                this.$store.dispatch('user/register',{
                    role:this.role,
                    username : this.username,
                    email : this.email,
                    password : this.password,
                    introducer :this.introducer
                })
                    .then(res =>{
                        this.$router.replace('/auth/Complete-registration')
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
