<template>
    <div>
      <AccountSettings/>
    </div>
</template>

<script>
    import AccountSettings from "../../components/dashboard/wall/AccountSettings";
    export default {
        name: "index",
        components: {AccountSettings},
      layout:'account',
        middleware:'auth',
      head(){
        return {
          title: 'تنظیمات حساب کاربری'
        }
      },
    }
</script>
