<template>
  <div class="w-full py-10 bg-new justify-center">
<div class="container">
  <div>
    <img src="/images/art4.png"/>
  </div>
  <Head link="/projects">
    <h1 slot="nameHead" class="ka-font" style="font-size: 35px">جدیدترین پروژه های ایجاد شده</h1>
    <span slot="btnName">مشاهده همه پروژه ها</span>
  </Head>
  <ProjectsDescriptions  :laravel-data="projects" :number="number"/>

  <div class="btn-text1 text-center">
    <nuxt-link to="/projects"  class="p-1 sm:px-5 px-1 border-2 rounded-lg  border-purple-600 text-purple-600 ">
      مشاهده همه پروژه ها
    </nuxt-link>
  </div>
</div>
    <div class="container">
    <div class="w-full px-5 py-8 text-center rounded-lg bg-purple-600">
      <h2 class="text-white text-lg ka-font text-4xl">همین الان اقدام کن!</h2>
      <div class="mt-2 flex justify-around">
        <img src="/images/business1.png" class="sm:w-32 sm:h-32 w-10 h-10 rounded-full"/>
        <div>
        <p class="mt-5 text-white text-sm ir-light">اگر پروژه داری، پروژه خودتو ایجاد کن تا افراد دارای مهارت، برات انجامش بدن</p>
        <p class="text-white text-sm ir-light">اگر مهارت داری، پرژه هارو انجام بده و درآمد کسب کن</p>
        </div>
        <img src="/images/checked.png" class="sm:w-32 sm:h-32 w-10 h-10 rounded-full"/>
      </div>
      <div class="flex justify-evenly	">
        <nuxt-link to="/auth/Log-in" class="p-2 pr-8 pl-8 bg-white rounded-lg shadow-lg  text-purple-600 ir-medium">ایجاد پروژه</nuxt-link>
        <nuxt-link to="/auth/Log-in" class="p-2 pr-8 pl-8 bg-white rounded-lg shadow-lg text-greenFreelancer ir-medium">انجام پروژه</nuxt-link>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Head from "./Head";
  import ProjectsDescriptions from "../projects/ProjectsDescriptions";
    export default {
        name: "NewProject",
        components:{ProjectsDescriptions, Head},
        props: {
            number:{
                type:Number,
                default: 10,
            },
        },
        data() {
            return {
                projects: null,
            }
        },
         async mounted() {
            const data = await this.$store.dispatch('project/getProjects');
            this.projects = {
                data
            }
        }
    }
</script>

<style>
.bg-new{
  background: url("../../../static/images/new-projects-backg.png");
}
@media (min-width: 767px) {
  .btn-text1{
    display: none;
  }
}
</style>
