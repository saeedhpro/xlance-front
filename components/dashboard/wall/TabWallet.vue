<template>
  <div class="container">
<div class=" px-5 py-4 mb-10 justify-star bg-white shadow-lg rounded-lg flex hidden sm:block">
  <nuxt-link to="/wallet" class="text-gray-900 text-sm ir-medium">کیف پول</nuxt-link>
  <nuxt-link to="/increaseInventory" class="mx-5 text-gray-900 text-sm ir-medium">افزایش موجودی</nuxt-link>
  <nuxt-link to="/harvest" class="mx-5 text-gray-900 text-sm ir-medium">برداشت</nuxt-link>
  <nuxt-link to="/records" class="mx-5 text-gray-900 text-sm ir-medium">سوابق</nuxt-link>
</div>
  </div>
</template>
<script>
  import Wallet from "./Wallet";
  import IncreaseInventory from "./IncreaseInventory";
  import TabBardasht from "./TabBardasht";
  import Records from "./Records";
  import AccountSettings from "./AccountSettings";
    export default {
        name: "TabWallet",
        data(){
            return{
                SelectedComponent:'app-component-1',
            }
        },
        components:{
            "app-component-1":Wallet,
            "app-component-2":IncreaseInventory,
            "app-component-3":TabBardasht,
            "app-component-4":Records,
            "app-component-5":AccountSettings,
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
