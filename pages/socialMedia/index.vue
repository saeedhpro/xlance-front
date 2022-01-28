<template>
    <div>
      <SocialMedia/>
    </div>
</template>
<script>
    import SocialMedia from "../../components/dashboard/socialMedia/SocialMedia";
    export default {
        name: "index",
        components: {SocialMedia},
        layout:'dashboard',
        middleware:'auth',
      head(){
        return {
          title: 'شبکه اجتماعی'
        }
      },

    }
</script>
