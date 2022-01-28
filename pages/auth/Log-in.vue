<template>
<div>
  <Global>
    <div slot="head" class="ir-bold text-2xl">ورود به سایت</div>
  </Global>
  <Inputs :icon="icon1" :placeholder="placeholder1" v-model="username"></Inputs>
  <div class="pt-1 relative text-right mx-2 text-gray-500">
    <i class="fal fa-user absolute -mt-10  text-gray-500"></i>
  </div>
  <Inputs :icon="icon2" :placeholder="placeholder2" v-model="password" type="password"></Inputs>
  <div class="pt-1 relative text-right mx-2 text-gray-500">
    <i class="fal fa-lock absolute -mt-10  text-gray-500"></i>
  </div>
  <div class="mb-2 flex flex-wrap justify-between">
    <div class="flex flex-wrap">
      <div class="flex">
        <v-container fluid>
          <v-checkbox v-model="rememberMe">
            <template v-slot:label>
              <div class="flex items-center">
                <v-tooltip bottom>
                </v-tooltip>
                <div class="mr-1 text-black ir-light text-sm"><span>مرا به خاطر بسپار</span></div>
              </div>
            </template>
          </v-checkbox>
        </v-container>
      </div>
    <NuxtLink to="/auth/Forget" class="sm:mt-4 text-sm text-purple-600 underline " >رمز عبور را فراموش کردید؟</NuxtLink>
    </div>
  </div>
  <PurpleButtonGlobal :text="logIn" :loading-text="loadingText" :loadingbtn="loadingbtn" @click.native="login">
  </PurpleButtonGlobal>
  <WhiteButtonGlobalLink :url="url" :text="register"/>
  <client-only>
    <vue-snotify></vue-snotify>
  </client-only>
</div>
</template>
<script>
    import Global from "../../components/register/Global";
    import Inputs from "../../components/register/Inputs";
    import PurpleButtonGlobal from "../../components/register/PurpleButtonGlobal";
    import WhiteButtonGlobalLink from "../../components/register/WhiteButtonGlobalLink";
    export default {
        name: "Log-in",
        layout:'register',
        middleware:'guest',

    head(){
      return {
        title: 'ورود',
      }
    },
        components: {WhiteButtonGlobalLink, PurpleButtonGlobal, Inputs, Global},
        data(){
            return{
                icon1:'',
                icon2:'',
                placeholder1:'نام کاربری یا ایمیل',
                placeholder2:'رمز عبور',
                logIn:'ورود',
                url:'/auth/Register',
                register:'ثبت نام',
                ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
                username:null,
                password:null,
                rememberMe:false,
              loadingbtn:false,
              loadingText:true
            }
        },
        methods:{
            login () {
              this.loadingbtn = true,
                this.loadingText =false

                this.$store.dispatch('user/login', {
                    username: this.username,
                    password: this.password,
                    rememberMe :this.rememberMe
                })
                    .then(res => {
                      this.$snotify.success('با موفقیت وارد شدید', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                      })
                        setTimeout(()=> {
                          if(this.$hasRole(res.roles, 'admin')) {
                            this.$router.replace('/admin/dashboard')
                          } else {
                            this.$router.replace('/dashboard')
                          }
                        }, 500)
                    })
                    .catch(async err => {
                        if(err.response.status === 404)
                        {
                          this.$snotify.error('کاربری با این مشخصات یافت نشد!', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                          })
                        }
                        else {
                          if(err.response.data.errors.password) {
                            this.$snotify.error(err.response.data.errors.password, {
                              timeout: 2000,
                              showProgressBar: false,
                              closeOnClick: false,
                              pauseOnHover: true
                            })
                            return;
                          }
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
                        }
                    })
            }
        }
    }
</script>
