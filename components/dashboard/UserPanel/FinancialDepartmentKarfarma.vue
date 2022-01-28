<template>
  <div class="p-4 relative mt-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select-purple' : status==='1'}">امور مالی</div>
    </div>
    <div class="border-b-2 border-dashed border-gray-400 pb-3">
      <Inf2 :number="getBalance.toLocaleString() | toPersianNumber" :url="url" :btnName="btnName" :url2="url1" :btnName2="btnName1">
        <img slot="img-inf" src="/images/wallet.png"/>
        <div slot="head-inf">موجودی کیف پول شما</div>
        <div slot="name-inf">ریال</div>
      </Inf2>
    </div>
    <Inf :number="createdSecurePayments.length | toPersianNumber" :url="url2" :btnName="btnName2">
      <img slot="img-inf" src="/images/lock.png"/>
      <div slot="head-inf">پرداخت امن ایجاد کرده اید</div>
      <div slot="name-inf">پرداخت امن</div>
    </Inf>
  </div>
</template>

<script>
    import Inf from "../global/infKarfarma/Inf";
    import Inf2 from "../global/infKarfarma/Inf2";
    export default {
        name: "FinancialDepartment",
        components: {Inf2, Inf},
        data(){
            return{
                status:'1',
                number:'۲.۰۰۰.۰۰۰',
                url:'/harvest',
                btnName:'درخواست برداشت',
                number1:'۱۲',
                url1:'/increaseInventory',
                btnName1:'افزایش موجودی',
                number12:'۳.۵۰.۰۰۰',
                url12:'/records',
                btnName12:'مشاهده تراکنش ',
                number2:'۱۲',
                url2:'/wallet',
                btnName2:'مشاهده پرداخت ها',
            }
        },
        mounted() {
            this.$store.dispatch('user/getCreatedSecurePayments')
        },
        computed:{
            getBalance() {
                return this.$store.getters['user/getBalance'];
            },
            createdSecurePayments() {
                return this.$store.getters['user/getCreatedSecurePayments'];
            },
        }
    }
</script>
