<template>
    <div>
      <HeaderDashboard/>
      <div class="my-10 mt-20 min-h-screen">
        <TabProfile/>
      <nuxt/>
      </div>
      <FooterDashboard/>
    </div>
</template>

<script>
    import HeaderDashboard from "../components/dashboard/HeaderDashboard";
    import FooterDashboard from "../components/dashboard/FooterDashboard";
    import TabProfile from "../components/dashboard/Profile/TabProfile";
    export default {
        name: "account",
        components: {TabProfile, FooterDashboard, HeaderDashboard},
    }
</script>
