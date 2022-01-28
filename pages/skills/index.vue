<template>
    <div>
      <Skills/>
    </div>
</template>
<script>
    import Skills from "../../components/dashboard/Profile/Skills";
    export default {
        name: "index",
        components: {Skills},
        layout:'account',
        middleware:'auth',
      head(){
        return {
          title: 'مهارت ها'
        }
      },

    }
</script>
