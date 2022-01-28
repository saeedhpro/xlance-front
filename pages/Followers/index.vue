<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-3">
    <div class="mb-2 pb-2 border-b-2 border-gray-300 flex justify-between items-center">
      <div class="flex">
        <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">دنبال کنندگان شما</div>
        <div class="pb-3 text-sm mx-5 text-gray-500 ir-medium"  @click="status='2'" :class="{'select' : status==='2'}">دنبال شده توسط شما</div>
      </div>
      <nuxt-link to="/socialMedia" class="text-greenFreelancer underline">برگشت</nuxt-link>
    </div>
    <div v-if="status==='1'" class="flex flex-wrap justify-between">
      <InformationFollowers
        v-for="(p , i) in getFollowers"
        :key="i"
        :id="p.id"
        :name="p.full_name"
        :img="p.profile.avatar ?p.profile.avatar.path : '/images/logo.png'"
        :username="p.username"
        :rate="p.rate"
      />
    </div>
    <div v-if="status==='2'" class="flex flex-wrap justify-between">
      <InformationFollowers
        v-for="(p , i) in getFollowing"
        :key="i"
        :id="p.id"
        :name="p.full_name"
        :img="p.profile.avatar ?p.profile.avatar.path : '/images/logo.png'"
        :username="p.username"
        :rate="p.rate"
      />
    </div>
  </div>
  </div>
</template>

<script>
    import InformationFollowers from "../../components/dashboard/socialMedia/InformationFollowers";
    export default {
        name: "index",
        components: {InformationFollowers},
        layout:'dashboard',
        middleware:'auth',
      head(){
        return {
          title: 'لیست فالوورها'
        }
      },
        data(){
            return{
                status:'1',
            }
        },
      mounted() {
        this.$store.dispatch('socillMedia/getFollowers')
        this.$store.dispatch('socillMedia/getFollowing')
      },
      computed:{
            getFollowers(){
                return this.$store.getters['socillMedia/getFollowers']
            },
            getFollowing(){
                return this.$store.getters['socillMedia/getFollowing']
            },
        }
    }
</script>
