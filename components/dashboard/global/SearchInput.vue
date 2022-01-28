<template>
  <div class="flex relative">
    <div><i class="far fa-search absolute text-gray-500 mt-4 mr-2"></i></div>
    <input v-model="value" type="search" @input="$emit('input', $event.target.value)" class="sm:w-3/4 w-full px-3 pr-8 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" placeholder="جستجو" style="height: 48px"/>
  </div>
</template>
<script>
    export default {
        name: "SearchInput",
        props:['value'],

    }
</script>
