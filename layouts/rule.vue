<template>
    <div>
      <div>
        <HeaderDashboard v-if="user"/>
        <Header v-else/>
      </div>
      <div class="py-5" :class="user? 'my-10 mt-20 min-h-screen': ''">
    <nuxt/>
      </div>
      <FooterDashboard v-if="user"/>
    <Footer v-else/>
  </div>
</template>
<script>
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import FooterDashboard from "../components/dashboard/FooterDashboard";
export default {
    components: {FooterDashboard, HeaderDashboard, Footer, Header},
    computed:{
        user(){
            return this.$store.getters['user/user']
        }
    },
}
</script>

