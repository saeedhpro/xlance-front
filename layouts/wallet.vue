<template>
    <div>
      <HeaderDashboard/>
      <div class="my-10 mt-20 min-h-screen">
        <TabWallet/>
      <nuxt/>
      </div>
      <FooterDashboard/>
    </div>
</template>

<script>
    import HeaderDashboard from "../components/dashboard/HeaderDashboard";
    import FooterDashboard from "../components/dashboard/FooterDashboard";
    import TabWallet from "../components/dashboard/wall/TabWallet";
    export default {
        name: "account",
        components: {TabWallet,FooterDashboard, HeaderDashboard},
    }
</script>
