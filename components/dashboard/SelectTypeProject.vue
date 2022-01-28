<template>
  <div>
  <div class=" container flex justify-center">
    <div class="  py-2 sm:px-10 px-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm click" @click="menuStatus= 'app-component-1'" :class="{'selected' : menuStatus === 'app-component-1'}">به عنوان کارفرما</div>
    <div class=" py-2 sm:px-10 px-2  text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm click" @click="menuStatus= 'app-component-2'" :class="{'selectedGreen' : menuStatus === 'app-component-2'}">به عنوان فریلنسر</div>
  </div>
    <div>
      <component :is="menuStatus"></component>
    </div>
  </div>
</template>
<script>
 import MyProject from "./MyProject";
 import MyProjectKarfarma from "./MyProjectKarfarma";
    export default {
        name: "SelectTypeProject",
        props: {
          isEmployer: {
            required: true,
          }
        },
        data(){
            return{
                menuStatus: this.isEmployer === 0 ? 'app-component-2' : 'app-component-1',
            }
        },
        components:{
            "app-component-1":MyProjectKarfarma,
            "app-component-2":MyProject,
        }
    }
</script>
