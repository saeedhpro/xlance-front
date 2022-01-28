<template>
  <div>
    <Announcements/>
  </div>
</template>

<script>
import Announcements from '@/components/dashboard/announcementsAdmin/Announcements'
export default {
  name: "index",
  components: {Announcements},
  layout:'admin',
  middleware:'admin',
  head(){
    return {
      title: 'اعلانات'
    }
  },


}
</script>
