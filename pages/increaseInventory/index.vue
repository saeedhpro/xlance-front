<template>
    <div>
      <IncreaseInventory/>
    </div>
</template>

<script>
    import IncreaseInventory from "../../components/dashboard/wall/IncreaseInventory";
    export default {
        name: "index",
        components: {IncreaseInventory},
        layout:'wallet',
        middleware:'auth',
      head(){
        return {
          title: 'افزایش موجودی'
        }
      },

    }
</script>
