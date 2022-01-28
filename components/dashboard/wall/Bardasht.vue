<template>
    <div class="container mt-10 bg-white rounded-lg shadow-lg">
      <div class="px-3 py-3">
        <div class="pb-2 border-b-2 border-gray-300 justify-between">
          <div class="w-40 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">برداشت های در حال انجام</div>
        </div>
      <div class="my-5 flex flex-wrap">
        <SearchInput/>
        <SelectInput :options="opt" class="sm:mt-0 mt-2"/>
      </div>
        <div class="overflow-auto">
          <div style="min-width: 700px">
      <div class="py-2 px-20 flex bg-gray-300 justify-around rounded-lg">
        <div class="text-gray-600">تاریخ درخواست</div>
        <div class=" text-gray-600">مبلغ</div>
        <div class="text-gray-600">وضعیت</div>
      </div>
      <div v-if="status==='1'" class="px-20 py-3 flex justify-around border-b-2 border-dashed border-gray-400" v-for="i in getWithdraws">
        <div class="text-black text-sm">{{ ($moment(i.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber }}</div>
        <div class=" text-black text-sm">{{i.amount}}</div>
        <div class=" text-black text-sm">{{getStatus(i.status)}}</div>
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
        name: "Bardasht",
        components: {SelectInput, SearchInput},
        data(){
            return{
                status:'1',
                opt:[1,2,3]
            }
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('wallet/getWithdraws')
                this.$nuxt.$loading.finish()
            })
        },
      methods: {
        getStatus(status) {
          switch (status) {
            case 'accepted':
              return 'تایید شده'
            case 'rejected':
              return 'رد شده'
            case 'payed':
              return 'پرداخت شده'
            case 'created':
              return 'ایجاد شده'
          }
        }
      },
      computed:{
            getWithdraws() {
                return this.$store.getters['wallet/getWithdraws'];
            },
        }
    }
</script>

<style scoped>
  .select{
    color: black;
    border-bottom: 4px solid #00C379;
  }
</style>
