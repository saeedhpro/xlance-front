<template>
  <div class="my-5 bg-gray-300 md:h-10 h-20 px-5 py-1 rounded-lg flex flex-warp justify-between justify-around align-center items-center text-gray-700 ">
    <div class="w-full sm:px-10 px-5 lg:border-l-2 lg:border-gray-500">
      {{position}}
    </div>
    <div class="w-full sm:px-10 lg:border-l-2 lg:border-gray-500">
      {{company}}
    </div>
    <div class="w-full sm:px-10 px-5" v-if="from_date">
      {{ ($moment(from_date).format('jYYYY/jM/jDD') ) | toPersianNumber }}
      تا
      {{ (up_to_now ? 'الآن' : $moment(to_date).format('jYYYY/jM/jDD') ) | toPersianNumber }}

    </div>
    <div @click="onDeletedClicked(id)" class="sm:px-5 px-2 flex justify-end">
      <i class="fal fa-trash-alt click"></i>
    </div>
  </div>

</template>

<script>
    export default {
        name: "CvList",
        props:{
            id: {
                type: Number,
                required: true,
            },
            position: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            from_date:{
                type:String,
                required: true
            },
            to_date:{
                type:String,
                required: true
            },
            up_to_now:{
                type:Boolean,
                required: true
            }
        },
        methods: {
            onDeletedClicked(id) {
                this.$emit('delete', id);
            }
        }
    }
</script>
