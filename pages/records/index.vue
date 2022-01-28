<template>
    <div>
      <Records/>
    </div>
</template>

<script>
    import Records from "../../components/dashboard/wall/Records";
    export default {
        name: "index",
        components: {Records},
        layout:'wallet',
        middleware:'auth',  head(){
        return {
          title: 'سوابق'
        }
      },

    }
</script>
