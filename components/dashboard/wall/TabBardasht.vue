<template>
  <div class="container">
  <div class=" bg-white rounded-lg shadow-lg">
    <div class="p-3">
      <div class="pb-2 border-b-2 border-gray-300 justify-between">
        <div class="w-12 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">برداشت</div>
      </div>
    <div class="my-5 py-2 px-4 m-auto mt-10 sm:w-1/2 w-full border-2 border-dashed border-gray-400 rounded-lg">
    <div class="py-3 flex justify-between lg:border-b-2 lg:border-gray-400 lg:border-dashed  ">
      <div class="flex">
        <div class="w-10 h-10 p-2 rounded-lg bg-gray-300">
          <img src="/images/wallet.png"/>
        </div>
        <div class="mr-2 mt-2 text-sm text-gray-700">
          موجودی فعلی کیف پول شما
        </div>
      </div>
      <div class="flex-col">
        <div class="flex px-5 py-1 border-dashed border-2 border-gray-500 rounded-lg text-center float-left" style="align-items: center">
          <span class="ml-1 text-2xl ir-bold text-black">{{getBalance.toLocaleString() | toPersianNumber }}</span>
          <span class="ir-light text-sm text-gray-500"><slot name="name-inf">ریال</slot></span>
        </div>
      </div>
    </div>
    <div class="py-3 flex justify-between">
      <div class="flex">
        <div class="w-10 h-10 p-2 rounded-lg bg-gray-300">
          <img src="/images/wallet.png"/>
        </div>
        <div class="mr-2 mt-2 text-sm text-gray-700">
          موجودی قابل برداشت
        </div>
      </div>
      <div class="flex-col">
        <div class="flex px-5 py-1 border-dashed border-2 border-gray-500 rounded-lg text-center float-left" style="align-items: center">
          <span class="ml-1 text-2xl ir-bold text-greenFreelancer">{{getBalance.toLocaleString() | toPersianNumber }}</span>
          <span class="ir-light text-sm text-greenFreelancer"><slot name="name-inf">ریال</slot></span>
        </div>
      </div>
    </div>
    </div>
    <div class="mt-10 mb-5 text-center text-sm ir-bold">مبلغ</div>
    <div class="my-5 text-sm text-center text-gray-600">مبلغ مورد نظر خود را وارد کنید یا از گزینه‌های پیش‌فرض زیر استفاده نمایید</div>
      <div class="text-center relative">
        <input v-model="amount" type="text" class="py-3 text-bold border-2 border-solid border-gray-500 rounded-lg"/>
        <div class="absolute -mt-10 mr-rj">
        <div class="text-center text-sm text-gray-600">ریال</div>
        </div>
      </div>
    <div class="my-5 text-sm text-center text-gray-600">گزینه های پیش فرض</div>
      <div class="my-5 flex flex-wrap justify-around">
        <div @click="addMoney(100000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۱۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
        <div @click="addMoney(500000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۵۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
        <div @click="addMoney(1000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۱.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
        <div @click="addMoney(2000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۲.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
        <div @click="addMoney(5000000)" class="click w-40 my-2 text-center bg-gray-300 rounded-lg px-3 py-2 text-bold hover:bg-greenKam hover:text-greentype">۵.۰۰۰.۰۰۰<span class="text-sm text-gray-600 mr-2 hover:text-greentype">ریال</span></div>
      </div>
    <div class="mt-10 mb-5 text-center text-sm ir-bold">حساب بانکی</div>
    <div class="my-5 text-sm text-center text-gray-600">حساب بانکی مورد نظر را جهت دریافت وجه انتخاب نمایید</div>
      <div class="sm:w-1/2 w-full m-auto text-center" v-if="user.profile.sheba>0" >
    <div class="bg-gray-300 h-10 px-3 py-2 rounded-lg" >
      IR - {{user.profile.sheba}}
    </div>
        <div class="text-left">
        <nuxt-link to="/account-setting" class="text-greentype underline">ویرایش حساب</nuxt-link>
        </div>
      </div>
    <div class="my-10 text-center text-white">
      <button type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="pay">
        <span v-if="loadingText">برداشت از کیف پول</span>
        <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8"/>
      </button>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "TabBardasht",
        data(){
            return{
                bank:null,
                status:'1',
                amount:0,
              loadingText:true,
              loadingbtn:false
            }
        },
        computed:{
            getBalance() {
                return this.$store.getters['user/getBalance'];
            },
            user(){
                return this.$store.getters['user/user']
            }
        },
        methods: {
            addMoney(amount) {
                this.amount = parseInt(amount)
            },
            pay() {
              this.loadingbtn = true
              this.loadingText = false
                if(this.amount > 0 && this.amount <= this.getBalance){
                    this.$store.dispatch('wallet/harvest', {
                        amount: parseInt(this.amount)
                    })
                        .then(res=>{
                                this.$snotify.success('درخواست برداشت برای ادمین ارسال شد. طی 48 ساعت آینده به حساب شما واریز می شود', {
                                    timeout: 2000,
                                    showProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true
                                })
                          this.amount = null
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
                else {
                  this.$snotify.error('مبلغ صحیح نیست', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                  })
                }
            }

        }
    }
</script>

<style scoped>
  @media (min-width: 670px) {
    .mr-rj{
      margin-right: 56%;
    }
  }
</style>
