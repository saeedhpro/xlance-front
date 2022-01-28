<template>
<div class="container">
  <p class="mb-6 text-2xl ir-bold ">ایجاد مقاله</p>
  <FormAdmin/>
</div>
</template>

<script>
  import FormAdmin from "../../../components/admin/FormAdmin";
   export default {
        name: "create",
       components: {FormAdmin},
       comments:{FormAdmin},
       layout:'admin',
       middleware:'admin',

   }
</script>
