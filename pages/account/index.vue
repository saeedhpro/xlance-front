<template>
  <div>
    <AccountProfile/>

  </div>
</template>
<script>
// import AccountProfile from '@/components/dashboard/Profile/Account'
import AccountProfile from '../../components/dashboard/Profile/AccountProfile'

export default {
  name: "index",
  layout: 'account',
  middleware: 'auth',
  components: {
    AccountProfile,
    // Account,
  },
  head() {
    return {
      title: 'حساب کاربری'
    }
  },
}
</script>
