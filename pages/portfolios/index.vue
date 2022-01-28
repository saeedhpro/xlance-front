<template>
    <div>
      <Portfolios/>
    </div>
</template>
<script>
    import Portfolios from "../../components/dashboard/Profile/Portfolios";
    export default {
        name: "index",
        components: {Portfolios},
        layout:'account',
      head(){
        return {
          title: 'نمونه کار'
        }
      },
        middleware:'auth',
    }
</script>
