<template>
  <div class="flex flex-wrap">
    <div class="p-3 m-2 bg-white rounded-lg shadow-lg" v-for="(i , n) in requests"
         style="width: 245px;height: 152px;"
         :class="{'class1': i.project.freelancer_id === user.id || (i.project.freelancer_id && i.project.employer_id === user.id),
                  'class2' :i.is_distinguished
         }">

      <nuxt-link :to="`/profiles/${i.user.id}`" class="flex items-center">
        <div>
          <img  v-if="i.user.profile.avatar" :src="i.user.profile.avatar.path" class="w-20 h-20 rounded-full">
          <img  v-else src="/images/logo.png" class="w-20 h-20 rounded-full border-solid border-2 border-purple-600">
        </div>
        <div class="mr-4">
          <div class="ir-medium text-lg text-black">{{i.user.username}}</div>
          <div class="my-3 text-gray-600 text-sm">
            در
            {{i.delivery_date | toPersianNumber}}
          روز</div>
          <div v-if="i.user.id == user.id">
          <div class="text-gray-600 text-sm"><span class="mx-1 ir-medium" >{{i.price.toLocaleString() | toPersianNumber}}</span>ریال</div>
          </div>
        </div>
      </nuxt-link>
      <div class="my-3 flex justify-between">
        <div class="-mr-5">
        <rating-component :value="i.user.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
{{i.rate}}
        </div>
        <div class="px-2 py-1 bg-gray-300 rounded-2xl text-gray-600 text-sm">{{ ($moment(i.created_at).format('jYYYY/jM/jDD')) | toPersianNumber}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingComponent from "../../RatingComponent";
    export default {
        name: "ProjectRequest",
      components:{RatingComponent},
        props: {
            requests: {
                required: true,
                type: Array,
                default: () => []
            }
        },
      computed: {
          user() {
            return this.$store.getters['user/user']
          }
      }

    }
</script>

<style>
  .class1{
    border: 2px solid #00C379;
  }
  .class2{
    border: 2px solid #5b3cc4;
  }
</style>
