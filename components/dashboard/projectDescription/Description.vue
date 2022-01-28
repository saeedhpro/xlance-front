<template>
    <div v-if="project">

      <freelancertaeed  v-if="user && project.status == 'published' && project.accept_freelancer_request && user.id == project.accept_freelancer_request.freelancer.id"
      :id="project.accept_freelancer_request.id"
      :project_id="project.id"/>

      <div class="pb-3 flex border-b-2 border-gray-500">
        <div><img src="/images/art2.png"> </div>
        <div class="mr-5">
          <div class=" text-sm text-gray-600 ir-medium">مهارت های مورد نیاز</div>
          <div class="my-2 flex flex-wrap">
            <div class="m-1" v-for="(skill , index) in project.skills" :key="index">
              <div class="p-1 bg-purple-200 rounded text-purple-600" >{{skill.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-10 flex">
        <div><img src="/images/art2.png" alt=""> </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">توضیحات پروژه</div>
        </div>
      </div>
      <div v-html="project.description" class="text-sm text-gray-900 ir-medium"></div>
      <div v-if="project.attachments && project.attachments.length > 0" class="mt-10 mb-3 pb-3 text-sm text-gray-600 ir-medium ">فایل های ضمیمه شده</div>
        <div class="project-attachments-box flex flex-row flex-wrap ">
          <div class="project-attachment-box w-full sm:w-1/2 md:w-1/2 px-2" v-for="(a, i) in project.attachments" :key="i" >
            <a class="project-attachment flex flex-row w-full justify-space-between items-center p-3" :href="a.path" download>
              <div class="flex flex-row justify-start items-center name-box w-full">
                <i class="fad fa-file"></i>
                <span class="w-full">{{ a.name.substring(0,10)+(a.name.length>10? '...' : '') }}</span>
              </div>
              <div class="flex flex-row justify-center items-center dl-icon">
                <img src="/images/download.svg" height="20px" width="20px" alt="">
              </div>
            </a>
          </div>
        </div>
      <div class="my-10 pt-5 flex border-t-2 border-gray-500">
        <div>
          <img src="/images/art2.png" alt="">
        </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">پیشنهادها</div>
        </div>
      </div>
      <div class="flex flex-wrap justify-start" >
        <ProjectRequest :requests="project.requests" />
      </div>
    </div>
</template>

<script>
  import ProjectRequest from "../../client/projects/ProjectRequest";
  import Freelancertaeed from "../../project/freelancertaeed";
    export default {
        name: "Description",
        components:{Freelancertaeed, ProjectRequest},
        mounted(){
            this.$store.dispatch('project/getDescriptionProject', this.$route.params.id)

        },
        computed:{
            project(){
                return this.$store.getters['project/getDescriptionProject']
            },
            user(){
                return this.$store.getters['user/user']
            }
        }
    }
</script>
<style lang="scss" scoped>
.project-attachment {
  background: #EEEEEE 0 0 no-repeat padding-box;
  border-radius: 8px;
  text-align: right;
  font: normal normal 300 16px/32px IRANSans;
  letter-spacing: 0;
  color: #212121;
  .name-box .fa-file {
    font-size: 20px;
    margin-left: 10px;
  }
}

</style>
