<template>
    <div>
      <SelectTypeProject v-if="user" :is-employer="user.as_employer"/>
    </div>
</template>
<script>
  import SelectTypeProject from "../../components/dashboard/SelectTypeProject";
    export default {
        name: "MyProjectsList",
        components: {SelectTypeProject},
        layout:'dashboard',
      head(){
        return {
          title: 'لیست پروژه ها'
        }
      },
        middleware:'auth',
        computed: {
            user() {
                return this.$store.getters['user/user']
            }
        }

    }
</script>
