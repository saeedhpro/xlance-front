<template>
  <div>
    <HeaderAdmin/>
    <div class="my-10 min-h-screen">
      <!--      <TabAdmin/>-->
      <nuxt/>
    </div>
    <FooterAdmin/>
  </div>
</template>
<script>
import HeaderAdmin from "../components/admin/HeaderAdmin";
import FooterAdmin from "../components/admin/FooterAdmin";
export default {
  name: "admin",
  components: {FooterAdmin, HeaderAdmin},
}
</script>
