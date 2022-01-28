<template>
  <div>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 border-b-2 border-gray-300 justify-between">
        <div class="w-20 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">کیف پول</div>
      </div>
    <div class="flex flex-wrap">
      <div class="my-5 flex justify-between sm:pl-5 sm:border-l-2 sm:border-dashed sm:border-gray-400 ">
        <div class="flex">
          <div class="w-10 h-10 rounded-lg bg-gray-300" style="text-align: -webkit-center;padding-top: 10px;">
              <img src="/images/wallet.png"/>
          </div>
          <div class="mr-2 mt-2 text-sm text-gray-700">
موجودی کیف پول شما
          </div>
        </div>
        <div class="flex-col">
          <div class="flex px-10 py-1 border-dashed border-2 border-greentype rounded-lg text-center float-left">
            <span class="ml-2 ir-bold text-greentype">{{getBalance.toLocaleString() | toPersianNumber}}</span>
            <span class="ir-light text-greentype"><slot name="name-inf">ریال</slot></span>
          </div>
          <div class="mt-20 text-center text-white">
            <nuxt-link to="/increaseInventory" class="sm:px-12 px-1 py-2 text-sm ir-medium  rounded-lg bg-greentype shadow-lg">افزایش موجودی</nuxt-link>
          </div>
        </div>
      </div>
      <div class="my-5 flex justify-between lg:pr-5">
        <div class="flex">
          <div class="w-10 h-10 rounded-lg bg-gray-300" style="text-align: -webkit-center; padding-top: 10px;">
            <slot name="img-inf">
              <img src="/images/bankcard.png"/>
            </slot>
          </div>
          <div>
            <div class="mr-2 mt-2 text-sm text-gray-700">
            موجودی قابل برداشت
            </div>
          </div>
        </div>
        <div class="flex-col">
          <div class="flex px-10 py-1 border-dashed border-2 border-gray-400 rounded-lg text-center float-left">
            <span class="ml-2 ir-bold">{{getBalance.toLocaleString() | toPersianNumber}}</span>
            <span class="ir-light text-gray-600"><slot name="name-inf">ریال</slot></span>
          </div>
          <div class="mt-20">
            <nuxt-link to="/harvest" class="sm:px-10 px-1 py-1 btn-size text-sm border-greentype border-2 border-solid rounded-lg text-greentype">برداشت از حساب</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    </div>

  </div>
    <Bardasht/>
    <Pardakht/>
  </div>
</template>

<script>
    import Bardasht from "./Bardasht";
    import Pardakht from "./Pardakht";
    export default {
        name: "Wallet",
        components: {Pardakht, Bardasht},
        data(){
            return{
                status:'1'
            }
        },
        computed:{
            getBalance() {
                return this.$store.getters['user/getBalance'];
            },
        }
    }
</script>
