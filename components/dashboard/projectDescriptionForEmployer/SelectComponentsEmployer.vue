<template>
  <div class="flex flex-col ">
    <div class="my-5 container flex justify-center " :class="!can ? 'hidden' : ''">
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm" @click="menuStatus= 'app-component-2'" :class="{'selected' : menuStatus === 'app-component-2'}">توضیحات پروژه</div>
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="menuStatus= 'app-component-1'" :class="{'selected' : menuStatus === 'app-component-1'}">پیشنهادات</div>
    </div>
    <div>
      <img src="/images/Path146.png" class="my-5 m-auto "/>
    </div>
    <div class="mt-5">
      <component :is="menuStatus"></component>
    </div>
  </div>
</template>

<script>
import Description from "./Description";
 import CountSuggest from "./CountSuggest";
    export default {
        name: "SelectComponentsEmployer",
        data(){
            return{
                menuStatus: 'app-component-2',
            }
        },
        components:{
            "app-component-1":CountSuggest,
            "app-component-2":Description,
        },
      computed:{
        project(){
          return this.$store.getters['project/getDescriptionProject']
        },
        user() {
          return this.$store.getters['user/user']
        },
        can() {
            return this.user && this.project && !this.project.freelancer && this.project.employer && (this.user.id === this.project.employer.id)
        }
      }
    }
</script>
