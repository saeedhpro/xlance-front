<template>
  <div>
    <Global>
      <div slot="head">تکمیل ثبت نام در ایکس لنس</div>
    </Global>
    <div class="my-3 text-sm text-gray-500 ">
      {{message}}
      <nuxt-link to="/auth/Log-in" v-if="status" class="my-3 w-56 h-12 items-center py-2 inline-block bg-purple-600 bg-purple-600  rounded-lg shadow-lg">ورود</nuxt-link>
    </div>
  </div>
</template>

<script>
    import Global from "../../../../components/register/Global";
    export default {
        name: "_hash",
        components: {Global},
        layout:'register',
        middleware:'guest',
        data(){
            return{
                message:null,
                status:null
            }
        },
        mounted() {
            this.$store.dispatch('user/verifyEmail' , this.$route.params.id ,  this.$route.params.hash)
                .then(res=>{
                    this.message = res.data
                        this.status = true
                })
                .catch(err=>{
                    this.status = true
                })
        }
    }
</script>
