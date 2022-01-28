<template>
    <div>
      <TableAdmin>
        <div slot="head-name">لیست اطلاعیه ها</div>
      </TableAdmin>
      <div v-for="(not , index) in getNotifications" :key="index" class="my-5 py-5 flex justify-between items-center border-b-2 border-dashed border-gray-400">
        <div class="flex items-center">
          <img v-if="not.image"  :src="not.image.path" class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
          <img v-else  src="/images/logo.png" class="w-8 h-8 p-1 ml-3 rounded-full border-2 border-solid border-gray-600"/>
          <div class="text-sm text-black">{{not.text}}</div>
        </div>
        <div class="text-sm text-gray-600">{{not.created_at}}</div>
      </div>
    </div>
</template>
<script>
  import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        layout:'admin',
        middleware:'admin',
        components:{TableAdmin},
        mounted(){
            this.$store.dispatch('projectsAdmin/getAllProjects')
        },
        computed:{
            projects(){
                return this.$store.getters['projectsAdmin/projects']
            }
        }
    }
</script>
