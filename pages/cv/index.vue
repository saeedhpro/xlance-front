<template>
    <div>
      <Cv/>
    </div>
</template>
<script>
    import Cv from "../../components/dashboard/Profile/Cv";
    export default {
        name: "index",
        components: {Cv},
        layout:'account',
        middleware:'auth',
      head(){
        return {
          title: 'رزومه'
        }
      },

    }
</script>
