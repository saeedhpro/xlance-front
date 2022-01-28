<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="px-5">
    <div class="mb-2 pb-2 border-b-2 border-gray-300 flex justify-between items-center">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">پست ها</div>
      <nuxt-link to="/socialMedia" class="text-greenFreelancer underline">برگشت</nuxt-link>
    </div>
    </div>
    <div class="flex flex-wrap">
  <PostFormat v-for="(p , i) in getPosts" :post="p" :key="i"/>
    </div>
  </div>
</template>
<script>
    import PostFormat from "../../components/dashboard/socialMedia/PostFormat";
    export default {
        name: "index",
        layout: 'dashboard',
      head(){
        return {
          title: 'پست'
        }
      },
        components: {PostFormat},
        middleware:'auth',

        data() {
            return {
                status: '1'
            }
        },
        computed: {
            getPosts() {
                return this.$store.getters['socillMedia/getPosts']
            },
        }
    }
</script>
