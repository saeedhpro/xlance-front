<template>
  <div class="container">
<div class=" mb-10 px-5 py-4 justify-star bg-white shadow-lg rounded-lg flex hidden sm:block">
  <nuxt-link to="/dashboard" class="text-gray-900 text-sm ir-medium">پنل کاربری</nuxt-link>
  <nuxt-link to="/myProject" class="text-gray-900 text-sm mx-5 ir-medium">پروژه های من</nuxt-link>
  <nuxt-link to="/defferences" class="text-gray-900 text-sm mx-5 ir-medium" >اختلاف های  من</nuxt-link>
  <nuxt-link to="/announcements" class="text-gray-900 text-sm mx-5 ir-medium" >اعلانات</nuxt-link>
  <nuxt-link to="/messages" class="text-gray-900 text-sm mx-5 ir-medium" >پیام ها</nuxt-link>
  <nuxt-link to="/socialMedia" class="text-gray-900 text-sm mx-5 ir-medium" >شبکه های اجتماعی</nuxt-link>
</div>
<!--    <div class="mt-10 ">-->
<!--      <component :is="SelectedComponent"></component>-->
<!--    </div>-->
</div>
</template>
<script>
  import Announcements from "./announcements/Announcements";
  import MyProject from "./MyProject";
  import Differences from "./differences/Differences";
  // import Message from "./messages/Message";
  import SocialMedia from "./socialMedia/SocialMedia";
  import SelectPerson from "./UserPanel/SelectPerson";
    export default {
        name: "Tab",
        data(){
            return{
                SelectedComponent:'app-component-1',
            }
        },
        components:{
            SelectPerson,
            "app-component-1":SelectPerson,
            "app-component-2":MyProject,
            "app-component-3":Differences,
            "app-component-4":Announcements,
            // "app-component-5":Message,
            "app-component-6":SocialMedia,
        }
    }
</script>

<style scoped>
.nuxt-link-active{
  color: #673AB7;
  background-color: #F2EBFF;
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
