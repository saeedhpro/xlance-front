<template>
  <div class="flex flex-col">
    <div class="my-5 container flex justify-center">
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm" @click="menuStatus= 'app-component-2'" :class="{'selectepurple' : menuStatus === 'app-component-2'}">توضیحات پروژه</div>
      <div class="w-32 text-center py-2 text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="menuStatus= 'app-component-1'" :class="{'selectepurple' : menuStatus === 'app-component-1'}">پیشنهادات</div>
    </div>
    <div>
      <img src="/images/art5.png" class="my-2 m-auto"/>
    </div>
    <div>
      <component :is="menuStatus"></component>
    </div>
  </div>
</template>

<script>
  import Description from "../projectDescription/Description";
  import Suggest from "./Suggest";
    export default {
        name: "Selectemploye",
        data(){
            return{
                menuStatus:'app-component-1',
            }
        },
        components:{
            "app-component-2":Description,
            "app-component-1":Suggest,
        }
    }
</script>

<style>
.selectepurple{
  border-color: #673AB7;
  background-color: #673AB7;
  color: #ffffff;
}
</style>
