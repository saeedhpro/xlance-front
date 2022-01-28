<template>
  <div>
    <Picture v-if="user" :user="user" @avatar_accepted="avatarAccepted"/>
  </div>
</template>
<script>
import Picture from "../../components/dashboard/Profile/Picture";

export default {
  name: "index",
  components: {Picture},
  layout: 'account',
  head() {
    return {
      title: 'تصاویر کاربر'
    }
  },
  middleware: 'auth',
  data() {
    return {
      user: null,
    }
  },
  async mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getUser();
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getUser() {
      this.$store.dispatch(`account/me`)
        .then((response) => {
          this.user = {...response};
        })
        .catch((error) => {
        })
    },
    avatarAccepted(val) {
      this.getUser()
    }
  }
}
</script>
