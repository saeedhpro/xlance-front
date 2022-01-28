<template>
    <div>
      <Wallet/>
    </div>
</template>
<script>
    import Wallet from "../../components/dashboard/wall/Wallet";
    export default {
        name: "index",
        components: {Wallet},
        layout:'wallet',
        middleware:'auth',
      head(){
        return {
          title: 'کیف پول'
        }
      },

    }
</script>
