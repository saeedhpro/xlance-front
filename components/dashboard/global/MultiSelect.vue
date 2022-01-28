<template>
  <div>
<!--    <multiselect @change="onChange" v-model="value" placeholder="مهارت های خود را وارد نمائید" @input="onChange"  label="name" track-by="id" :options="options" :multiple="true" :taggable="true" class="w-full py-2 px-5 border-solid border-2 border-gray-400 rounded-lg placeholder-gray-400"></multiselect>-->
    <multiselect @change="onChange" @tag="addTag" v-model="value" placeholder="مهارت ها" @input="onChange" aria-hidden="false"  label="name" track-by="id" :options="options" :multiple="true" :taggable="true"
                 class="w-full  py-2 px-2 text-placeholder-gray-400  rounded-lg placeholder-gray-400">
      <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag px-3 mx-2">
        <span class="text-purple-600">{{ option.name }}</span>
        <span class="custom__remove text-purple-600 mr-3 mt-2 ir-bold" @click="remove(option)">
          <i class="fal fa-times"></i>  </span>
      </span></template>
    </multiselect>
  </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    export default {
        name: "MultiSelect",
        components: {
            Multiselect
        },
        props:['options', 'value'],
        methods: {
            onChange(val) {
                this.$emit('changed', val)
            },
            addTag(val) {
                this.$emit('tag', val)
            },
        }
    }
</script>
