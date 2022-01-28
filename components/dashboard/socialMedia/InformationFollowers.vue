<template>
  <nuxt-link :to="`/profiles/${id}`" class="click md:w-1/2 w-full p-1 follow-inf">
    <div class="sm:px-8 py-5 my-4 flex bg-gray-100 rounded-lg">
      <div class="flex items-center justify-start">
        <img :alt="name" :src="img" class="user-avatar">
        <div class="sm:mr-5 user-desc">
          <div class="user-details-box">
            <div class="ir-medium text-black sm:text-md text-sm ">{{name}}</div>
            <div class="mt-5 ir-light text-gray-700 sm:text-md text-sm ">{{username}}</div>
          </div>
          <div class="user-rate-box">
            <rating-component :value="rate" :maxStars="5" :hasCounter="false" class="rate_size hover:none" :dis="true"/>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
    import RatingComponent from "~/components/RatingComponent";
    export default {
      name: "InformationFollowers",
      components: {RatingComponent},
      props: {
        id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          default: ''
        },
        img: {
          type: String,
          default: ''
        },
        username: {
          type: String,
          default: ''
        },
        rate: {
          type: Number,
          default: 0
        },
      },
    }
</script>
<style lang="scss" scoped>
  .follow-inf {
    .user-avatar {
      width: 64px;
      min-width: 64px;
      height: 64px;
      min-height: 64px;
      border-radius: 50%;
    }
    .user-desc {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      height: 64px;
      .user-details-box {
        height: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
