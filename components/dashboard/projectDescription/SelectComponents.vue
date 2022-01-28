<template>
  <div class="flex flex-col ">
<!--    <div class="my-5 container flex justify-center">-->
    <div class="my-5 container flex justify-center " :class="!fre ? 'hidden' : ''">
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm" @click="menuStatus= 2" :class="{'selectedGreen' : menuStatus === 2}">توضیحات پروژه</div>
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="menuStatus= 1" :class="{'selectedGreen' : menuStatus === 1}">میزکار</div>
    </div>
    <div class="my-5 container flex justify-center " :class="!emp ? 'hidden' : ''">
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm" @click="menuStatus= 2" :class="{'selected' : menuStatus === 2}">توضیحات پروژه</div>
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="menuStatus= 3" :class="{'selected' : menuStatus === 3}">پیشنهادات</div>
    </div>
    <div>
      <img src="/images/Path146.png" class="my-5 m-auto " :class="!fre ? 'hidden' : ''" alt=""/>
      <img src="/images/art5.png" class="my-5 m-auto " :class="!emp ? 'hidden' : ''" alt=""/>

    </div>
    <div class="mt-5">
      <app-component-1 v-if=" (this.adminOrEmployeeCanSee)"></app-component-1>
      <app-component-3 v-if="menuStatus === 3 && (user && project && !project.freelancer && project.employer && (user.id === project.employer.id))"></app-component-3>
      <app-component-2 v-if="menuStatus === 2"/>
    </div>
  </div>
</template>

<script>
  import Description from "./Description";
  import Desk from "./Desk";
  import CountSuggest from "../projectDescriptionForEmployer/CountSuggest";
    export default {
        name: "SelectComponents",
        data(){
            return{
                menuStatus:2,
            }
        },
        components:{
            "app-component-2":Description,
            "app-component-1":Desk,
            "app-component-3":CountSuggest,
        },
      computed:{
        project(){
          return this.$store.getters['project/getDescriptionProject']
        },
        user() {
          return this.$store.getters['user/user']
        },
        fre() {
          return this.user && this.project && this.project.freelancer && this.project.employer && (this.user.id === this.project.employer.id || this.user.id === this.project.freelancer.id)
        },
        emp() {
            return this.user && this.project && !this.project.freelancer && this.project.employer && (this.user.id === this.project.employer.id)
        },
        adminOrEmployeeCanSee() {
          return this.$hasRole(this.user.roles , 'admin') || this.menuStatus === 1 && (this.user && this.project && this.project.freelancer && this.project.employer && (this.user.id === this.project.employer.id || this.user.id === this.project.freelancer.id))
        }
      }
    }
</script>
