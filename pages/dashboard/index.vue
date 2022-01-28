<template>
<div>
  <SelectPerson v-if="user" :isEmployer="user.as_employer"/>
</div>
</template>
<script>
    import SelectPerson from "../../components/dashboard/UserPanel/SelectPerson";
    export default {
        name: "index",
      head(){
          return {
            title: 'پنل کاربری'
          }
      },
        components: {SelectPerson},
        layout:'dashboard',
        middleware:'auth',
        computed: {
          user() {
            return this.$store.getters['user/user']
          }
        }
    }
</script>
