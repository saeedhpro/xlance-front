<template>
  <div>
    <img src="/images/art5.png" class="my-5 mx-auto"/>
    <div class="container relative bg-white rounded-lg shadow-lg">
      <div class="px-3">
        <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">پروژه های ایجاد شده</div>
        <div class="pb-3 mx-5 text-sm text-gray-500 ir-medium"  @click="status='4'" :class="{'select' : status==='4'}">پروژه های تایید شده </div>
        <div class="pb-3 mx-5 text-sm text-gray-500 ir-medium"  @click="status='2'" :class="{'select' : status==='2'}">در حال انجام کار</div>
        <div class="pb-3  text-sm text-gray-500 ir-medium"  @click="status='3'" :class="{'select' : status==='3'}">پایان یافته</div>
      </div>
      <div class="my-5 flex flex-wrap">
        <SearchInput/>
        <SelectInput :options="opt" class="sm:mt-0 mt-2"/>
      </div>
        <div class="overflow-auto">
        <div style="min-width: 700px">
      <div class="py-2 px-6 pr-20 flex bg-gray-300 justify-between rounded-lg">
        <div class="text-gray-600">نام پروژه</div>
        <div class=" text-gray-600">زمان انجام</div>
        <div class="text-gray-600">نام کاربر</div>
        <div class="text-gray-600">تاریخ ارسال درخواست</div>
      </div>
      <div v-if="status==='1'" v-for="(item, index) in createdProjects" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <nuxt-link :to="`/projects/${item.id}`" class="w-32 text-black text-sm">{{item.title}}</nuxt-link>
        <div class="w-20 text-black text-sm">-</div>
        <div class="w-20 text-black text-sm">-</div>
        <div class="w-20 text-black text-sm">{{ ($moment(item.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber}}</div>
      </div>
      <div v-if="status==='4'" v-for="(item, index) in getPublishedProjects" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <nuxt-link :to="`/projects/${item.id}`"  class="w-32 text-black text-sm">{{item.title}}</nuxt-link>
        <div class="w-20 text-black text-sm">-</div>
        <div class="w-20 text-black text-sm">-</div>
        <div class="w-20 text-black text-sm">{{ ($moment(item.created_at).format('jYYYY/jM/jDD')) | toPersianNumber}}</div>
      </div>
      <div v-if="status==='2'" v-for="(item, index) in acceptedProjects" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <nuxt-link :to="`/projects/${item.id}`" class="w-32 text-black text-sm">{{item.title}}</nuxt-link>
        <div class="w-20 text-black text-sm">{{item.selected_request.delivery_date}}</div>
        <div class="w-20 text-black text-sm">{{item.freelancer.username}}</div>
        <div class="w-20 text-black text-sm">{{ ( $moment(item.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber}}</div>
      </div>
      <div v-if="status==='3'" v-for="(item, index) in finishedProjects" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <nuxt-link :to="`/projects/${item.id}`" class="w-32 text-black text-sm">{{item.title}}</nuxt-link>
        <div class="w-20 text-black text-sm">{{item.selected_request.delivery_date}}</div>
        <div class="w-20 text-black text-sm">{{item.freelancer.username}}</div>
        <div class="w-20 text-black text-sm">{{ ($moment(item.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber}}</div>
      </div>
        </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
    import SearchInput from "./global/SearchInput";
    import SelectInput from "./global/SelectInput";
    export default {
        name: "MyProjectKarfarma",
        components: {SelectInput, SearchInput},
        data(){
            return{
                status:'1',
                opt:[1,2,3],
                loading:false
            }
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('project/getProjectKarfarma')
                this.$nuxt.$loading.finish()
            })
        },
        computed:{
            finishedProjects() {
                return this.$store.getters['project/getownFinishedProjects'];
            },
            createdProjects() {
                return this.$store.getters['project/getownCreatedProjrct'];
            },
            acceptedProjects() {
                return this.$store.getters['project/getownAcceptedProject'];
            },
            getPublishedProjects() {
                return this.$store.getters['project/getPublishedProjects'];
            }
        }
    }
</script>
