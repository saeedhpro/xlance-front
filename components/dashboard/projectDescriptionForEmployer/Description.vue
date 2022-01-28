<template>
    <div v-if="project">
      <div class="pb-3 flex border-b-2 border-gray-500">
        <div><img src="/images/art2.png"> </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">مهارت های مورد نیاز</div>
            <div class="my-5 flex flex-wrap" v-for="(skill , index) in project.skills" :key="index">
              <div class="p-1 bg-purple-200 rounded text-purple-600" >{{skill.name}}</div>
          </div>
        </div>
      </div>
      <div class="my-10 flex">
        <div><img src="/images/art2.png"> </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">توضیحات پروژه</div>
        </div>
      </div>
      <div class="text-sm text-gray-900 ir-medium">{{project.description}}</div>
<!--      <div  class="my-10 pb-3 text-sm text-gray-600 ir-medium border-b-2 border-gray-500 ">فایل های ضمیمه شده</div>-->
      <div v-if="project.attachments && project.attachments.length > 0" class="w-full md:w-2/5 attachments-list">
        <label class="text-sm my-5 ir-medium text-gray-700">فایل های ضمیمه شده</label>
        <a :href="f.path" download class="attachment-item"
           v-for="(f, i) in project.attachments"
           :key="i"
        >
          <div class="attachment-item-name">
            <i class="fal fa-file"></i>
            <div class="attachment-name">
              {{f.name}}
            </div>
          </div>
        </a>
      </div>

      <div class="my-10 pt-5 flex border-t-2 border-gray-500">
        <div>
          <img src="/images/art2.png">
        </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">پیشنهادها</div>
        </div>
      </div>
      <div class="flex flex-wrap justify-start" >
        <ProjectRequest :requests="project.requests"/>
      </div>
    </div>
</template>

<script>
  import ProjectRequest from "../../client/projects/ProjectRequest";
    export default {
        name: "KarfarmaDescription",
        components:{ProjectRequest},
        mounted(){
            this.$store.dispatch('project/getDescriptionProject', this.$route.params.id)

        },
        computed:{
            project(){
                return this.$store.getters['project/getDescriptionProject']
            },
        }
    }
</script>
