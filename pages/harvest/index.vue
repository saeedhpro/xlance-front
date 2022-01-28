<template>
    <div>
      <TabBardasht/>
    </div>
</template>
<script>
    import TabBardasht from "../../components/dashboard/wall/TabBardasht";
    export default {
        name: "index",
        components: {TabBardasht},    head(){
        return {
          title: 'برداشت'
        }
      },
      middleware:'auth',

        layout:'wallet'
    }
</script>
