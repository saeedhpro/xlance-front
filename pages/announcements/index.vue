<template>
    <div>
      <Announcements/>
    </div>
</template>

<script>
    import Announcements from "../../components/dashboard/announcements/Announcements";
    export default {
        name: "index",
        components: {Announcements},
        layout:'dashboard',
        middleware:'auth',
      head(){
        return {
          title: 'اعلانات'
        }
      },


    }
</script>
