<template>
  <div class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">
    <date-picker format="YYYY-MM-DD HH:mm" display-format="jYYYY/jMM/jDD" :value="value" @input="onChange" placeholder="تاریخ را انتخاب کنید"></date-picker>
  </div>
</template>
<script>
    export default {
        name: "DateInput",
        props:['value'],
        methods: {
            onChange(val) {
                this.$emit('onChange', val)
            }
        }
    }
</script>
