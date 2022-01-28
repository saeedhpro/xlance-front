<template>
    <div>
      <HeaderDashboard/>
      <div class="my-10 mt-20 min-h-screen">
        <Tab/>
      <nuxt/>
      </div>
      <FooterDashboard/>
    </div>
</template>
<script>
    import HeaderDashboard from "../components/dashboard/HeaderDashboard";
    import FooterDashboard from "../components/dashboard/FooterDashboard";
    import Tab from "../components/dashboard/Tab";
    export default {
        name: "dashboard",
        components: {Tab, FooterDashboard, HeaderDashboard},
    }
</script>
