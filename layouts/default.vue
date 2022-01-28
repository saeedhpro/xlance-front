<template>
<!--  <v-app>-->
    <div class="parent">
      <img src="/images/header-backg-art.png" class="top-0 left-0" alt="" style="position:absolute;top: 0"/>
      <div class="parent">
      <Header/>
      </div>
      <div class="py-5">
    <nuxt/>
      </div>
    <Footer/>
  </div>
<!--  </v-app>-->
</template>
<script>
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
export default {
    components: {Footer, Header},
}
</script>
<style>
  .parent{
    position: relative;
    top: 0;
    left: 0;
  }
  /*.v-application a {*/
  /*  color: unset;*/
  /*}*/
</style>
