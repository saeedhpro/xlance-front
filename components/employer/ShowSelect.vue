<template>
  <div class="flex flex-col">
    <div class="my-5 container flex justify-center">
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm" @click="menuStatus= 'app-component-1'" :class="{'selected' : menuStatus === 'app-component-1'}">رزومه</div>
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="menuStatus= 'app-component-2'" :class="{'selected' : menuStatus === 'app-component-2'}">پروژه ها</div>
    </div>
    <div>
    <img src="/images/Path146.png" class="my-5 m-auto"/>
    </div>
    <div>
      <component :is="menuStatus"></component>
    </div>
  </div>
</template>
<script>
 import ShowCv from "./ShowCv";
 import ShowListProjects from "./ShowListProjects";
    export default {
        name: "ShowSelect",
        data(){
            return{
                menuStatus:'app-component-1',
            }
        },
        components:{
            "app-component-1":ShowCv,
            "app-component-2":ShowListProjects,
        }
    }
</script>

