<template>
  <div>
    <Global>
      <div slot="head">بازیابی رمز عبور</div>
    </Global>
    <div v-if="show && !hasError">
      <div class="my-4 text-gray-500 text-sm">
        پسورد جدید را وارد کنید
      </div>
          <Inputs :icon="icon1" :placeholder="placeholder1" v-model="password"></Inputs>
      <div class="pt-1 relative text-right mx-2 text-gray-500">
        <i class="fal fa-password absolute -mt-10  text-gray-500"></i>
      </div>
          <Inputs :icon="icon1" :placeholder="placeholder2" v-model="password_confirmation"></Inputs>

      <PurpolButtonGlobalLink url="/" :text="go" @click.native="changePassword"/>
    </div>
    <div v-else-if="!show && hasError">
      <div class="my-4 text-gray-500 text-sm">
        {{ message }}
      </div>
      <PurpolButtonGlobalLink url="/" text="ارسال دوباره" @click.native="sendEmail"/>
    </div>
    <div v-else-if="resend">
      <div class="my-4 text-gray-500 text-sm">
        {{ message }}
      </div>
      <PurpolButtonGlobalLink url="/auth/Forget" text="ارسال دوباره"/>
    </div>
  </div>
</template>
<script>
    import Global from "../../components/register/Global";
    import Inputs from "../../components/register/Inputs";
    import PurpleButtonGlobal from "../../components/register/PurpleButtonGlobal";
    import PurpolButtonGlobalLink from "../../components/register/PurpolButtonGlobalLink";
    export default {
        name: "Change",
        layout:'register',
        middleware:'guest',
      head(){
        return {
          title: 'بازیابی رمزعبور'
        }
      },
        components: {PurpolButtonGlobalLink, Global,Inputs,PurpleButtonGlobal},
        data(){
            return{
                icon:'',
                placeholder:'ایمیل',
                icon1:'',
                register:'ارسال کد تایید',
                url:'/auth/Password-recovery',
                placeholder1:'پسورد جدید خود را وارد کنید',
                placeholder2:'تکرار پسورد جدید',
                go:'تایید پسورد',
                show:false,
                hasError: false,
                resend: false,
                loading: true,
                email:null,
                token:null,
                message: '',
                password:null,
                password_confirmation:null
            }
        },
        mounted() {
            const email = this.$route.query.email;
            const token = this.$route.query.token;
            if(email && token) {
              this.checkToken(email, token);
            } else {
              this.message = 'درخواست شما منقضی شده است';
              this.loading = false;
              this.show = false;
              this.hasError = false;
              this.resend = true;
            }
        },
        methods: {
            checkToken(email, token) {
                this.$store.dispatch('user/checkToken', {
                    email: email,
                    token: token
                })
                    .then((res)=>{
                        this.show = true;
                        this.loading = false;
                        this.hasError = false;
                        this.email = email;
                        this.token = token;
                    })
                    .catch( async err=> {
                      const keys = Object.keys(err.response.data.errors);
                        for (let i = 0; i < keys.length; i++){
                            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                              this.message = err.response.data.errors[keys[i]][j];
                                await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                                    timeout: 2000,
                                    showProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true
                                })
                            }
                        }
                      this.show = false;
                      this.loading = false;
                      this.hasError = true;
                    })
            },
            changePassword(){
                this.$store.dispatch('user/changePassword',{
                    email: this.email,
                    token: this.token,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })
                    .then(res=>{
                        this.$router.replace('/auth/log-in')
                    })
                    .catch(async err=>{
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
            sendEmail(){
              this.$store.dispatch('user/sendEmail',{
                email: this.email
              })
                .then(res=>{
                  this.$snotify.success('توکن جدید ارسال شد', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                  })
                })
                .catch(err=>{

                })
            }

        }
    }
</script>
