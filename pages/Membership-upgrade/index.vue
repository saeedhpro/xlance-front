<template>
  <div>
    <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
      <div class="p-3">
        <div class="pb-2 border-b-2 border-gray-300 justify-between">
          <div class="w-20 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">ارتقا عضویت</div>
        </div>
      </div>
      <div class="py-5 items-center">
        <div class="ir-medium text-lg text-center">ارتقا عضویت</div>
        <div class="mt-5 text-center mx-auto text-gray-700 text-sm" style="max-width: 500px">با ارتقا عضویت خود می‌توانید بر روی پروژه‌‌ها، پیشنهاد ارسال کنید هر پکیج ارتقا عضویت، تعداد پیشنهاد مشخصی را به پروفایل شما اضافه می‌کند</div>
        <div class="my-10 justify-center flex justify-center">
          <div class="ir-medium">ماهیانه</div>
          <div class="mx-3">
<!--            <toggle-button v-model="isMonthly" state="true"/>-->
            <toggle-button v-model="isMonthly"/>
<!--            <onoff-toggle v-model="isMonthly"    theme="default"  onColor="#26A600"-->
<!--            />-->

          </div>
          <div class="ir-medium">سالیانه<span class="ir-light text-gray-600 text-sm"> (۲۰ درصد ارزان‌تر)</span></div>
        </div>

        <div class="my-5 text-center text-gray-700 text-sm" v-for="i in getUpgradePacs ">
          شما یک پکیج <span class="text-danger">"{{i.plan.title}} - {{i.is_monthly ? 'ماهانه' : 'سالیانه'}} "</span> را رزرو دارید!
        </div>

        <div class="mt-10 flex flex-wrap justify-around text-center">
          <div class="sm:w-1/5 w-full sm:mx-1 p-3 border-solid border-gray-500 border-2 rounded-lg sm:my-0 my-2">
            <div class="text-sm text-gray-500"></div>
            <div class="my-3 ir-medium">عضویت معمولی</div>
            <div class="p-2 bg-gray-200 rounded-lg ir-light">
             رایگان
            </div>
            <div class="w-20 h-20 my-2 text-center py-3 mx-auto border-solid border-2 border-gray-500 rounded-full ir-bold text-4xl">۵</div>
            <div class="ir-light">پیشنهاد</div>
            <div class="mt-2 ir-light text-sm">در ماه</div>
          </div>


        <div v-for="(i, n) in getRequest" :key="n" @click="setSelected(i)" :class="{'selectPackage' : selected && (selected.id === user.selected_request_id || i.id === selected.id)}" class="sm:w-1/5 w-full sm:mx-1 p-3 border-solid border-gray-500 border-2 rounded-lg sm:my-0 my-2 click">
          <div class="text-sm text-gray-500">{{i.type}}</div>
          <div class="my-3 ir-medium">{{i.title}}</div>
          <div class="p-2 bg-gray-200 rounded-lg ir-light" :class="{'selectPackage1' : selected && (selected.id === user.selected_request_id || i.id === selected.id)}">
            <span class="ir-medium">{{isMonthly ? i.price.toLocaleString() :( i.price * 12 * 80 / 100).toLocaleString() | toPersianNumber }}</span>
            ریال / {{isMonthly ? 'ماهیانه' : 'سالیانه'}}
          </div>
          <div class="w-20 h-20 my-2 text-center py-3 mx-auto border-solid border-2 border-gray-500 rounded-full ir-bold text-4xl" :class="{'selectPackage' : selected && (selected.id === user.selected_request_id || i.id === selected.id)}">{{ isMonthly ? i.number : i.number | toPersianNumber}}</div>
          <div class="ir-light">پیشنهاد</div>
          <div class="mt-2 ir-light text-sm">در {{ isMonthly ? 'ماه' : 'سال' }}</div>
        </div>
        </div>
        <div class="my-5 py-2 px-4 m-auto mt-10 sm:w-1/3 w-full border-2 border-dashed border-gray-400 rounded-lg">
          <div class="py-3 flex justify-between lg:border-b-2 lg:border-gray-400 lg:border-dashed  ">
            <div class="flex">
              <div class="mr-2 mt-2 text-sm text-gray-700">
                موجودی فعلی کیف پول شما
              </div>
            </div>
            <div class="flex-col">
              <div class="flex px-5 py-1 border-dashed border-2 border-gray-500 rounded-lg text-center float-left">
                <span  class="ml-2 ir-bold text-black">{{getBalance.toLocaleString() | toPersianNumber }}</span>
                <span class="ir-light text-gray-400"><slot name="name-inf">ریال</slot></span>
              </div>
            </div>
          </div>
          <div class="py-3 flex justify-between">
            <div class="flex">
              <div class="mr-2 mt-2 text-sm text-gray-700">
                مبلغ قابل پرداخت
              </div>
            </div>
            <div class="flex-col">
              <div class="flex px-5 py-1 border-dashed border-2 border-gray-500 rounded-lg text-center float-left">
                <span class="ml-2 ir-bold text-black">{{selected && (isMonthly ? selected.price.toLocaleString() : (selected.price * 12 * 80 / 100).toLocaleString() ) || 0 | toPersianNumber }}</span>
                <span class="ir-light text-gray-400"><slot name="name-inf">ریال</slot></span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selected&&(isMonthly ? selected.price : selected * 12 * 80 / 100) > getBalance">
        <div class="mt-10 mb-5 text-center text-sm ir-bold">درگاه بانکی</div>
        <div class="my-5 text-sm text-center text-gray-600">درگاه بانکی مورد نظر خود را جهت پرداخت وجه انتخاب نمایید</div>
        <div class="flex flex-wrap justify-center">
          <div class="w-32 h-32 p-2 shadow-lg rounded-lg items-center text-center" >
            <img class="w-10 h-10 mx-8 my-3" src="/images/3434.png"/>
            <div class="text-sm text-sm mt-3">زرین پال</div>
          </div>
        </div>
<!--        <div class="my-10 text-center text-white">-->
<!--          <button type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype">پرداخت</button>-->
<!--        </div>-->
        </div>
<div>
        <div class="my-10 text-center text-white">
          <button type="button" class="px-20 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="setPac">
            <span v-if="loadingtext">ارتقا عضویت</span>
            <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-5 h-5"/>
          </button>
        </div>
</div>
      </div>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
    </div>
</template>
<script>
    export default {
        name: "index",
        layout:'defaultDash',
        middleware:'auth',
      head(){
        return {
          title: 'ارتقاعضویت'
        }
      },
        async asyncData(ctx) {
            let getRequest = []
            await ctx.store.dispatch('upgrate/getUpgrate')
              .then(res => {
                getRequest = res;
              })
            let user = await ctx.store.getters['user/user']
            const r = getRequest.filter(i => i.id === user.selected_request_id)
            let selected = null;
            if(r.length > 0) {
                selected = r[0]
            }
            return {
                getRequest,
                user,
                selected
            }
        },
      mounted () {
        this.$store.dispatch('upgrate/getUpgratePac')
      },
      data(){
            return{
                status:'1',
                // switch1: true,
                title:null,
                price:null,
                number:null,
                isMonthly:true,
              loadingtext :true,
              loadingbtn :false
            }
        },
        methods:{
            setPac(){
              this.loadingbtn = true
              this.loadingtext = false
                this.$store.dispatch('upgrate/setPac' ,
                  {package_id:this.selected.id, monthly: this.isMonthly})
                    .then(res=>{
                      if(res.action) {
                        window.location.href = res.action;
                      }
                      else {
                        this.$snotify.success('ارتقا عضویت شما با موفقیت انجام شد', {
                          timeout: 2000,
                          showProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true
                        })
                      }
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

            },
            setSelected(i){
                this.selected=i
            },
            onChangeEventHandler(){

            }
        },
      computed: {
        getBalance() {
          return this.$store.getters['user/getBalance'];
        },
        getUpgradePacs(){
          return this.$store.getters['upgrate/getUpgradePac']
        }
      },
    }
</script>
<style>
  .selectPackage{
    border-color: #00C379!important;
  }
  .selectPackage1{
    background: #00C379!important;
    color: white;
  }
</style>
