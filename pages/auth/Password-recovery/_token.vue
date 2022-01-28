<template>
    <div>
      <Global>
        <div slot="head" class="ir-bold text-2xl">بازیابی رمز عبور</div>
      </Global>
      <div class="my-3 text-sm text-gray-500">
<div> لطفا رمز عبور جدید خود را وارد کنید</div>
        <div>        از این پس با این رمز عبور می‌توانید وارد حساب کاربری خود شوید
</div>
      </div>
      <Inputs :icon="icon" :placeholder="placeholder" v-model="password" ></Inputs>
      <div class="pt-1 relative text-right mx-2 text-gray-500">
        <i class="fal fa-password absolute -mt-10  text-gray-500"></i>
      </div>
      <Inputs :icon="icon1" :placeholder="placeholder1" v-model="password_confirmation"></Inputs>
      <div class="pt-1 relative text-right mx-2 text-gray-500">
        <i class="fal fa-password absolute -mt-10  text-gray-500"></i>
      </div>
      <PurpleButtonGlobal :text="text" @click="changePassword"/>
    </div>
</template>

<script>
    import Global from "../../../components/register/Global";
    import Inputs from "../../../components/register/Inputs";
    import PurpleButtonGlobal from "../../../components/register/PurpleButtonGlobal";
    export default {
        name: "Password-recovery",
        components: {PurpleButtonGlobal, Global,Inputs},
        layout:'register',
        middleware:'guest',
        data(){
            return{
                icon:'',
                placeholder:'رمز عبور',
                placeholder1:' تکرار رمز عبور',
                icon1:'',
                text:'تغییر رمز عبور',
                password:null,
                password_confirmation:null,
                email: null
            }
        },
        mounted() {
            const token = this.$route.params.token
            const email = this.$route.query.email
            this.email = email
            this.checkToken(token , email)
        },
        methods:{
            checkToken(token , email){
                this.$store.dispatch('user/checkToken',{
                    token,
                    email
                })
                    .then(res=>{

                    })
                    .catch(err=>{

                    })

            },
            changePassword(){
                this.$store.dispatch('user/changePassword',{
                    email:this.email,
                    password:this.password,
                    password_confirmation:this.password_confirmation
                })
                    .then(res=>{

                    })
                    .catch(err=>{

                    })
            }
        }
    }
</script>
