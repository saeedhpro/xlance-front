<template>
    <div>
      <TabWallet/>
    </div>
</template>

<script>
    import TabWallet from "../../components/dashboard/wall/TabWallet";
    export default {
        name: "Wallet",
        components: {TabWallet},
        layout:'dashboard',
        middleware:'auth',
      head(){
        return {
          title: 'کیف پول'
        }
      },

    }
</script>
