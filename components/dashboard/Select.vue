<template>
  <v-card>
    <v-autocomplete
      v-model="value"
      :items="items"
      item-text="name"
      item-value="id"
      dense
      rounded
      placeholder="انتخاب کنید"
      class="w-full my-2 flex text-gray-500 justify-between  border-2 border-solid border-gray-500 rounded-2xl ir-medium placeholder-gray-500"
    />
  </v-card>
</template>
<script>
    export default {
        name: "Select",
        props:['items','value'],
    }
</script>
