<template>
    <div>
      <Password/>
    </div>
</template>

<script>
    import Password from "../../components/dashboard/Profile/Password";
    export default {
        name: "index",
        components: {Password},
        layout:'account',
        middleware:'auth',
      head(){
        return {
          title: 'بازیابی رمزعبور'
        }
      },

    }
</script>
