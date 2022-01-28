<template>
    <div class="relative">
      <div @click="openModal"  class="click p-1 h-8 w-32 text-greenFreelancer justify-center rounded-lg border border-greenFreelancer items-center flex">
        <i class="far fa-list-ul"></i>
        <span class="mx-3  text-sm">لیست پروژه</span>
      </div>
      <modal name="example1" class="h-auto rounded-lg " style="direction: ltr;text-align: center">
<!--        <div class="text-right" @click="closeModal" >-->
<!--        <i class="fal fa-times-circle m-3 text-gray-600"></i>-->
<!--        </div>-->
        <div class="mt-10 ir-bold">لیست پروژه ها</div>
        <div class="my-3" >
        <img class="mx-auto" src="/images/Path146.png" alt="">
        </div>
        <div class="click mt-10">
        <nuxt-link  :to="projectsBySkillsRoute" class="w-full h-10 py-2 px-8 text-center bg-greenFreelancer rounded-lg text-white">با مهارت من</nuxt-link>
        </div>
        <div class="click my-10">
        <nuxt-link to="/projects" class="w-full h-10 py-2 px-8 text-center bg-white border-2 border-greenFreelancer rounded-lg text-greenFreelancer">همه پروژه ها</nuxt-link>
        </div>
      </modal>
    </div>
</template>
<script>
    export default {
        name: "ListProject",
        props: {
            user: {
                type: Object,
                requried: true,
            }
        },
        data(){
            return{
                show:false,
                sheet:false,
            }
        },
        methods:{
            // ShowPopUp(){
            //     this.show=true
            // },
            openModal(){
                this.$modal.show('example1')
            },
            closeModal(){
                this.$modal.hide('example1')
            }
        },
        computed:{
            projectsBySkillsRoute() {
                let r = '/projects';
                let sl = [];
                this.user.skills.forEach(i => sl.push(`skills=${i.id}`));
                if(sl.length > 0) {
                    sl = sl.join('&');
                    r += '?';
                    r += sl;
                }
                return r;
            }
        },
    }
</script>
