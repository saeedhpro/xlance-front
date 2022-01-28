<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="p-3">
      <div class="pb-2 border-b-2 border-gray-300 justify-between">
        <div class="w-40 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">افزایش موجودی کیف پول</div>
      </div>
      <div class="flex justify-center">
    <div class="my-5 lg:w-1/2 md:w-full sm:w-full py-6 px-4 flex justify-between border-2 border-dashed border-gray-400 rounded-lg " style="max-width: 500px">
      <div class="flex">
        <div class="w-10 h-10 p-2 rounded-lg bg-gray-300">
          <img src="/images/wallet.png"/>
        </div>
        <div class="mr-2 mt-2 text-sm text-gray-700">
          موجودی فعلی کیف پول شما
        </div>
      </div>
      <div class="flex-col">
        <div class="flex px-5 py-1 border-dashed border-2 border-gray-500 rounded-lg text-center float-left" style="text-align: center">
          <span class="ml-2 text-2xl ir-bold text-black">{{balance.toLocaleString() | toPersianNumber}}</span>
          <span class="mt-2 ir-light text-sm text-gray-400"><slot name="name-inf">ریال</slot></span>
        </div>
      </div>
    </div>
      </div>
    <div class="mt-10 mb-5 text-center text-sm ir-bold">مبلغ</div>
    <div class="my-5 text-sm text-center text-gray-600">مبلغ مورد نظر خود را وارد کنید یا از گزینه‌های پیش‌فرض زیر استفاده نمایید</div>
      <div class="flex justify-center">
    <input v-model="amount " type="text" class="py-3 text-bold border-2 border-solid border-gray-500 rounded-lg"/>
      </div>
    <div class="my-5 text-sm text-center text-gray-600">گزینه های پیش فرض</div>
    <div class="my-5 flex flex-wrap justify-around">
      <div @click="addMoney(100000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۱۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
      <div @click="addMoney(500000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۵۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
      <div @click="addMoney(1000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۱.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
      <div @click="addMoney(2000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۲.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
      <div @click="addMoney(5000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۵.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
    </div>
    <div class="mt-10 mb-5 text-center text-sm ir-bold">درگاه بانکی</div>
    <div class="my-5 text-sm text-center text-gray-600">درگاه بانکی مورد نظر خود را جهت پرداخت وجه انتخاب نمایید</div>
    <div class="flex flex-wrap justify-center">
      <div class="w-32 h-32 p-2 shadow-lg rounded-lg items-center text-center" >
        <img class="w-10 h-10 mx-8 my-3" src="/images/3434.png"/>
        <div class="text-sm text-sm mt-3">زرین پال</div>
      </div>
    </div>
    <div class="my-10 text-center text-white">
      <button @click="pay" type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype">
        <span v-if="loadingText">پرداخت</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8"/>
      </button>
    </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "IncreaseInventory",
        data(){
            return{
                bank:null,
                status:'1',
                amount: 0,
              loadingbtn :false,
              loadingText :true
            }
        },
        methods: {
          addMoney(amount) {
            this.amount = parseInt(amount)
          },
          pay() {

            if(this.amount > 0){
              this.loadingbtn = true
              this.loadingText = false
              this.$store.dispatch('wallet/deposit', {
                amount: parseInt(this.amount)
              })
                .then(res=>{
                  if(res.action) {
                    window.location.href = res.action;
                  }

                })
            }
          }
        },
        computed: {
          balance() {
            return this.$store.getters['user/getBalance']
          }
        }
    }
</script>

<style scoped>
.selected{
  border: #00C379;
}
</style>
