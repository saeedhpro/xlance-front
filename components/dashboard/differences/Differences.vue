<template>
    <div class="container bg-white rounded-lg shadow-lg">
      <div class="px-3">
      <div class="pb-2 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">اختلاف باز</div>
        <div class="pb-3 mr-3 px-3 text-sm text-gray-500 ir-medium"  @click="status='2'" :class="{'select' : status==='2'}">اختلاف گذشته</div>
      </div>
        <div class="my-5 flex flex-wrap">
          <SearchInput/>
          <SelectInput :options="options"/>
        </div>
        <div class="overflow-auto">
          <div style="min-width: 700px">
      <div class="py-2 px-6 flex bg-gray-300 justify-between rounded-lg">
        <div class="text-gray-600">شماره اختلاف</div>
        <div class="-mr-20 text-gray-600">تاریخ</div>
        <div class="text-gray-600">نام پروژه</div>
        <div class="text-gray-600">فریلنسر</div>
        <div class="text-gray-600">کارفرما</div>
      </div>
      <div v-if="status==='1'" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-dashed border-gray-400" v-for="(i , n) in showDisputes" :key="n">
        <div class="text-black text-sm">{{i.id}}</div>
        <div class="text-black text-sm">{{ ( $moment(i.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber}}</div>
        <div class="text-black text-sm">{{i.project.title}}</div>
        <div class="text-black text-sm">{{i.freelancer.username}}</div>
        <div class="text-black text-sm">{{i.employer.username}}</div>
      </div>
      <div v-if="status==='2'" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-dashed border-gray-400" v-for="(i , n) in showCloseDisputes" :key="n">
        <div class="text-black text-sm">{{i.id}}</div>
        <div class="text-black text-sm">{{ ($moment(i.created_at).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
        <div class="text-black text-sm">{{i.project.title}}</div>
        <div class="text-black text-sm">{{i.freelancer.username}}</div>
        <div class="text-black text-sm">{{i.employer.username}}</div>
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
        name: "Differences",
        components: {SelectInput, SearchInput},
        data(){
            return{
                status:'1',
                options:[10,25,50]
            }
        },
        computed:{
            showDisputes(){
                return this.$store.getters['user/showDisputes']
            },
            showCloseDisputes(){
                return this.$store.getters['user/showCloseDisputes']
            },
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('user/showDisputes')
                this.$nuxt.$loading.finish()
            })
        }
    }
</script>
<style scoped>
.select{
  color: black;
border-bottom: 4px solid #00C379;
}
</style>
