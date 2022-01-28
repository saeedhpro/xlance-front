<template>
  <div class="p-4 relative mt-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">امور مالی</div>
    </div>
    <div class="border-b-2 border-dashed border-gray-400 pb-3">
    <Inf2 :number="getBalance.toLocaleString() | toPersianNumber" :url="url" :btnName="btnName" :url2="url1" :btnName2="btnName1">
      <img slot="img-inf" src="/images/wallet.png"/>
      <div slot="head-inf">موجودی کیف پول شما</div>
      <div slot="name-inf">ریال</div>
    </Inf2>
    </div>
    <div class="border-b-2 border-dashed border-gray-400 pb-3">
    <Inf :number="user.monthly_income.toLocaleString() | toPersianNumber" :url="url2" :btnName="btnName12">
      <img slot="img-inf" class="pr-1" src="/images/dollar-sign.png"/>
      <div slot="head-inf">درآمد شما در ماه جاری</div>
      <div slot="head2-inf">(۲ پروژه در این ماه انجام داده اید)</div>
      <div slot="name-inf">ریال</div>
    </Inf>
    </div>
    <Inf :number="payForFreelancer | toPersianNumber" :url="url2" :btnName="btnName2">
      <img slot="img-inf" src="/images/lock.png"/>
      <div slot="head-inf">پرداخت امن ایجاد شده برای شما</div>
      <div slot="head2-inf">(۲ پروژه در این ماه انجام داده اید)</div>
      <div slot="name-inf">پرداخت امن</div>
    </Inf>
</div>
</template>

<script>
    import Inf from "../global/Inf";
    import Inf2 from "../global/Inf2";
    export default {
        name: "FinancialDepartment",
        components: {Inf2, Inf},
        data(){
            return{
                status:'1',
                url:'/harvest',
                btnName:'درخواست برداشت',
                url1:'/increaseInventory',
                btnName1:'افزایش موجودی',
                number12:'۳.۵۰.۰۰۰',
                url12:'/records',
                btnName12:'مشاهده تراکنش ',
                url2:'/wallet',
                btnName2:'مشاهده پرداخت ها',
            }
        },
        mounted(){
            this.$store.dispatch('wallet/payForFreelancer1')
        },
        computed:{
            getBalance() {
                return this.$store.getters['user/getBalance'];
            },
            user(){
                return this.$store.getters['user/user']
            },
            payForFreelancer(){
                return this.$store.getters['wallet/payForFreelancer2']
            },
        }
    }
</script>
