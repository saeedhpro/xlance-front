<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 border-b-2 border-gray-300 justify-between">
        <div class="w-10 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">سوابق</div>
      </div>
      <div class="my-5 flex flex-wrap">
        <SearchInput/>
        <SelectInput :options="opt" class="sm:mt-0 mt-2"/>
      </div>
      <div  v-if="showHistoriesAdmin" class="overflow-auto">
        <div style="min-width: 700px">
          <div class="py-2 px-20 flex bg-gray-300 justify-between rounded-lg">
            <div class="w-32 text-gray-600">ردیف</div>
            <div class="w-32 text-gray-600">تاریخ درخواست</div>
            <div class="w-32 text-gray-600">نام کاربر</div>
            <div class="w-32 text-gray-600 md:mr-0 mr-20">مبلغ </div>
            <div class="w-32 text-gray-600">نوع </div>
            <div class="w-32 text-gray-600">وضعیت</div>
          </div>
          <div v-if="status==='1'" class="my-8 px-20 pb-5 flex justify-between border-b-2 border-dashed border-gray-500"
               v-for="(i , n ) in showHistoriesAdmin.data" :key="n">
            <div class="w-32 text-black text-sm">{{n+1}}</div>
            <div class="w-32 text-black text-sm">{{ $moment(i.created_at).format('jYYYY/jM/jDD') }}</div>
            <div class="w-32 -mr-12 text-black text-sm">{{ i.user.username }}</div>
            <div class="w-32 text-black text-sm">{{i.text ? i.text :i.title}}</div>
            <div class="w-32 text-black text-sm mr-records">
              {{i.amount.toLocaleString() | toPersianNumber}}
              <span style="font-size: 12px">ریال</span>
            </div>
            <div class="w-32 text-black text-sm">{{i.type == 'withdraw' ? 'برداشت ' : ' افزایش موجودی'}}</div>
            <div class="w-32 text-black text-sm">{{getStatus(i.status)}}</div>
          </div>
        </div>
      </div>
      <pagination v-if="showHistoriesAdmin" :limit="1" :data="showHistoriesAdmin" @pagination-change-page="getResults"></pagination>
    </div>
  </div>
</template>
<script>
import SearchInput from '@/components/dashboard/global/SearchInput'
import SelectInput from '@/components/dashboard/global/SelectInput'
export default {
  name: "index",
  components: {SearchInput, SelectInput},
  layout:'admin',
  middleware:'admin',
  data() {
    return {
      status: '1',
      opt:[5,10,15]
    }
  },
  async mounted(){
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.$store.dispatch('wallet/showHistoriesAdmin' , this.$route.query.page || 1)
      // await this.$store.dispatch('wallet/showNotification')
      this.$nuxt.$loading.finish()
    })
  },
  computed:{
    showHistoriesAdmin() {
      return this.$store.getters['wallet/showHistoriesAdmin'];
    },
    showNotification(){
      return this.$store.getters['wallet/showNotificationGe']
    }
  },
  methods:{
    getResults(page = 1) {
      this.$store.dispatch('wallet/showHistoriesAdmin' , page)
    },
    getStatus(i){
      switch (i){
        case 'deposited':
          return "افزایش موجودی با موفقیت"

        case 'rejected' :
          return "عدم موفقیت "

        case 'payed':
          return "برداشت با موفقیت"

        case 'created':
          return "درخواست جدید"


      }
    }
  }
}
</script>

<style scoped>
.select{
  color: black;
  border-bottom: 4px solid #00C379;
}
@media (min-width:986px) {
  .mr-records{
    margin-right: -30%
  }
}
@media (max-width:985px) {
  .mr-records{
    margin-right: unset;
  }
}
</style>
