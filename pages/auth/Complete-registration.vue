<template>
    <div>
      <Global>
        <div slot="head">تکمیل ثبت نام در ایکس لنس</div>
      </Global>
      <div class="my-3 text-sm text-gray-500 ">یک لینک تایید به ایمیل شما
        <span class="text-greenFreelancer">({{email}} )</span>
        ارسال شد. لطفا از طریق آن، حساب کاربری خود را فعال نمایید</div>
    </div>
</template>

<script>
    import Global from "../../components/register/Global";
    export default {
        name: "Complete-registration",
        components: {Global},
        layout:'register',
        middleware:'guest',
      head(){
        return {
          title: 'تکمیل ثبت نام'
        }
      },

        computed:{
            email(){
                return this.$store.getters['user/getEmail']
            },
        }
    }
</script>
