<template>
    <div>
      <Differences/>
    </div>
</template>

<script>
    import Differences from "../../components/dashboard/differences/Differences";
    export default {
        name: "index",
        components: {Differences},
        layout:'dashboard',
        middleware:'auth',
      head(){
        return {
          title: 'اختلاف ها'
        }
      },

    }
</script>
