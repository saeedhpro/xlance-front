<template>
    <div class="mt-10 container bg-white rounded-lg shadow-lg">
      <div class="px-3 py-3">
      <div class="pb-2 flex border-b-2 border-gray-300">
        <div class=" pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">پرداخت های امن ورودی</div>
        <div class=" pb-3 mx-3 text-sm text-gray-500 ir-medium"  @click="status='2'" :class="{'select' : status==='2'}">پرداخت های امن خروجی</div>
      </div>
      <div class="my-5 flex flex-wrap">
        <SearchInput/>
        <SelectInput :options="opt" class="sm:mt-0 mt-2"/>
      </div>
        <div class="overflow-auto">
          <div style="min-width: 700px">
      <div class="py-2 px-20 flex bg-gray-300 justify-between rounded-lg">
        <div class="text-gray-600">نام پروژه</div>
        <div class=" text-gray-600" v-if="status==='1'">ارسال کننده</div>
        <div class=" text-gray-600" v-if="status==='2'">دریافت کننده</div>
        <div class="text-gray-600">وضعیت</div>
        <div class="text-gray-600">مبلغ</div>
      </div>
      <div v-if="status==='1'" class="px-8 py-3 flex justify-between border-b-2 border-dashed border-gray-400" v-for="i in getPayments_me">
        <div class="w-32 text-black text-sm">{{i.project.title}}</div>
        <div class="w-20 text-black text-sm">{{i.to.first_name || i.to.last_name ? i.to.first_name + ' ' + i.to.last_name : 'بدون نام'}}</div>
        <div class="w-20 text-black text-sm">{{getStatus(i.status)}}</div>
        <div class="w-20 text-black text-sm">{{i.price.toLocaleString() | toPersianNumber}}</div>
      </div>
      <div v-if="status==='2'" class="px-8 py-3 flex justify-between border-b-2 border-dashed border-gray-400" v-for="i in getPayments_to">
        <div class="w-32 text-black text-sm">{{i.project.title}}</div>
        <div class="w-20 text-black text-sm">{{i.user.first_name || i.user.last_name ? i.user.first_name + ' ' + i.user.last_name : 'بدون نام'}}</div>
        <div class="w-20 text-black text-sm">{{getStatus(i.status)}}</div>
        <div class="w-20 text-black text-sm">{{i.price.toLocaleString() | toPersianNumber}}</div>
      </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
    import SearchInput from "../global/SearchInput";
    import SelectInput from "../global/SelectInput";
    export default {
        name: "Pardakht",
        components: {SelectInput, SearchInput},
        data(){
            return{
                status:'1',

                opt:[5,10,15]
            }
        },
      methods: {
        getStatus(status) {
          switch (status) {
            case 'accepted':
              return 'تایید شده'
            case 'rejected':
              return 'رد شده'
            case 'free':
              return 'آزاد شده'
            case 'payed':
              return 'پرداخت شده'
            case 'created':
              return 'ایجاد شده'
          }
        }
      },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('wallet/getWithdraws')
                await this.$store.dispatch('wallet/getPaymentsToMe')
                await this.$store.dispatch('wallet/getPaymentsToOthers')
                this.$nuxt.$loading.finish()
            })
        },
      computed:{
            getPayments_to(){
                return this.$store.getters['wallet/getPayments_to']
            },
            getPayments_me(){
                return this.$store.getters['wallet/getPayments_me']
            },
        }
    }
</script>
