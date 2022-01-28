<template>
    <div>
      <HeaderDashboard/>
      <div class="my-10 mt-20 min-h-screen">
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
        name: "defaultDash",
        components: {Tab, FooterDashboard, HeaderDashboard},
    }
</script>
