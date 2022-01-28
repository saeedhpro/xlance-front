<template>
  <div class="container" v-if="user">
    <div class=" bg-white rounded-lg shadow-lg">
      <div class="p-3">
        <div class="pb-2 border-b-2 border-gray-300 justify-between">
          <div class="w-12 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">برداشت</div>
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
        <div class="my-10 text-center text-white">
          <button type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="pay">شارژ کردن حساب</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '_id',
  layout:'admin',
  middleware:'admin',
  data(){
    return{
      status:'1',
      amount:0,
      user_id:null
    }
  },
  computed:{
    user(){
      return this.$store.getters['user/user']
    }
  },
  methods: {
    addMoney(amount) {
      this.amount = parseInt(amount)
    },
    pay() {
      if(this.amount > 0){
        this.$store.dispatch('wallet/adminCharge', {
          amount: parseInt(this.amount),
          user_id : this.$route.params.id
        })
          .then(res=>{
            this.$snotify.success('حساب کاربر با موفقیت شارژ شد', {
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
