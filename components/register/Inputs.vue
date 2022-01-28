<template>
    <div>
      <input class="w-full my-2 h-10 pr-8 px-3 py-3 text-gray-900 border-solid border-2 border-gray-500 rounded-lg" type="text"
             :value="value"
             :icon="icon"
             :placeholder="placeholder"
             :type="type"
              @input="updateValue($event.target.value)"
      />
    </div>
</template>
<script>
    export default {
        name: "Inputs",
        props:{
            placeholder: {
                type: String,
                default: ''
            },
            type: {
              type: String,
              default: 'text'
            },
            icon:{
                type:[String]
            },
            value: {
              type: [String, Number],
              default: ''
          },
        },
        methods: {
            updateValue (value) {
                this.$emit('input', value)
            },
        }
    }
</script>
