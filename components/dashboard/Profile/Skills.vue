<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">مهارت ها</div>
    </div>
    <div class="flex flex-wrap">
      <div class="sm:flex sm:flex-col sm:w-1/4 w-full sm:p-3 sm:border-l-2 sm:border-gray-400 ">
        <div class="pb-4 border-b-2 border-gray-400">
        <div class="p-4 bg-gray-300 text-center rounded-lg ">
        <div class="border-b-2 pb-5 border-gray-500 text-sm" >
          <span class="text-greentype ir-bold">{{items.length | toPersianNumber}}</span>
          مهارت از
          <span class="ir-bold">{{5 | toPersianNumber}}</span>
          مهارت انتخاب شده        </div>
        <div class="pt-2 pt-5 text-sm">
          <span class="ml-2 text-purple-600 ir-bold">{{getProject | toPersianNumber}}</span>
          پروژه با مهارت شما وجود دارد
        </div>
        </div>
        </div>
<!--        scrolls-->
        <div class="my-3">
          <v-card
            elevation="16"
            max-width="400"
            class="mx-auto "
          >
            <v-virtual-scroll
              :bench="benched"
              :items="items"
              height="300"
              item-height="40"
              class="mySkills"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title class="px-3 flex align-center justify-between hoverSkill">
                      <div>
                      {{ item.name }}
                      </div>
                      <div @click="deleteSkill(item.id)" class="uu">
                        <i class="fal fa-times"></i>
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
          </v-card>
        </div>
        <div class="my-10 text-center text-white">
          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="saveSkills">
            <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8"/>
            <span v-if="loadingText">ذخیره مهارت ها</span>
          </button>
        </div>
      </div>
      <div class="w-full sm:w-3/4">
        <div class="w-full h-20 px-4 py-4 bg-gray-300">
          <input type="search" class="w-full h-12 px-3 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" placeholder="جستجو"/>
        </div>
        <div v-if="!showList" class="my-3 flex flex-wrap justify-start">
          <div class="sm:w-48 w-full h-32 p-5 m-2  bg-gray-100 text-center rounded"
               v-for="(item , i) in  getCat"
               @click="getCategorySkills(item.id)">
            <img v-if="item.thumbnail" :src="item.thumbnail.path" class="sm:px-12 px-32"/>
            <p class="mt-5 text-gray-800 ir-medium hover:text-greentype click">{{item.name}}</p>
          </div>

        </div>

        <div v-else class="py-5 px-5">
        <div v-for="(item , i) in getCat"  v-if="menuStatus === item.id">
          <div class="pb-3 flex justify-between border-b border-gray-600">
            <div class=" flex text-lg text-black  ">
              <img src="/images/art2.png" class="h-5 ml-3 mt-1">
              {{item.name}}
            </div>
            <div @click="showList=false" class="p-1 text-greentype border-solid border-2 border-greentype rounded-lg click"   >بازگشت به دسته بندی</div>
          </div>
          <div class="flex ; max-height: 1000px;" style="flex-flow: column wrap">
          <div class="my-5 sm:w-1/2 w-full mx-1 items_skills flex justify-between click" @click="addToItems(i)" :class="{'selectSkills' : isInItems(i)}" v-for="i in item.skills">
            <div class="flex align-center">
              <div class="text-sm ">
                <i class="fal fa-check mt-1 text-greenFreelancer tt"></i>
              <i class="fas fa-circle text-gray-500 hh " style="font-size: 8px" ></i>
              </div>
              <span class="mr-2">
            {{i.name}}
              </span>
            </div>
            <div>
              <i class="fal fa-plus yy" style="color: #BDBDBD"></i>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>

<script>
    export default {
        name: "Skills",
        data(){
            return{
                benched: 0,
                menuStatus:null,
                showList:false,
                status:'1',
                items:[],
              loadingText :true,
              loadingbtn : false
            }
        },
        async mounted(){
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('skills/categories')
                await this.$store.dispatch('skills/getProjects')
                const user = this.$store.getters['user/user']
              user.skills.forEach(i =>{
                this.items.push(i)
              })
                // this.items = user.skills
                this.$nuxt.$loading.finish()
            })
        },
        methods: {
            getCategorySkills(id) {
                this.menuStatus = id;
                this.showList = true;
            },
            goBack() {
                this.showList = false;
            },
            addToItems(i) {

                if (this.items.length < 5){
                  let il = this.items.filter(item => item.id === i.id)
                  if( il.length === 0) {
                    this.items.push(i);
                  }
                else {
                    this.$snotify.error('قبلا انتخاب شده است', {
                      timeout: 2000,
                      showProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true
                    })
                  }
                }
                else {
                  this.$snotify.error('حداکثر مهارت انتخاب شده است', {
                    timeout: 2000,
                    showProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true
                  })
                }
            },
            getSkills () {
                this.$store.dispatch('skills/getSkills')
            },
            saveSkills(){
                const items = this.items.map(i => i.id);
                this.loadingbtn = true
              this.loadingText = false
                this.$store.dispatch('skills/saveSkills',{
                    skills: items
                })
                    .then((res) => {
                        this.$store.dispatch('skills/getProjects')
                        this.$snotify.success('مهارت های شما با موفقیت ثبت شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                      this.$store.dispatch('user/me')
                      this.loadingbtn = false
                      this.loadingText = true
                    })
            },
            deleteSkill(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('skills/deleteSkill', {
                                skill_id:id
                            })
                                .then(res => {
                                    this.items = this.items.filter(i=>i.id != id)
                                    this.$snotify.success('با موفقیت حذف شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                })
                        }
                    })
            },
            isInItems(item){
                return this.items.filter(e => e.id == item.id).length > 0
            }
        },
        computed: {
            length() {
                return 7000
            },
            getCat() {
                return this.$store.getters['skills/getCat'];
            },
            getProject(){
                return this.$store.getters['skills/projectsCount']
            },
            user(){
                return this.$store.getters['user/user']
            }
        }
    }
</script>

<style scoped>
.choose{
  content-visibility: hidden;
}
  .choose1{
    content-visibility:visible;
  }
  .items_skills{
    width: 352px;
    height: 40px;
    background: #FAFAFA 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    padding-top: 6px;
    padding-right: 2%;
    padding-left: 2%;
    color: #212121;
  }
  .items_skills:hover{
    background-color: #EEEEEE;
  }
.selectSkills{
  background: #EBFFF7 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
}
  .selectSkills .hh{
    display: none;
  }
  .tt{
    display: none;
  }
  .selectSkills .tt{
    display: block;
  }
  .selectSkills .yy{
    transform: rotate(45deg);
    color: #00C379!important;
  }
  .mySkills{
    background: #FAFAFA 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
    padding:3% 5% 3% 5%;
  }
  .hoverSkill:hover{
    width: 240px;
    height: 32px;
    margin-right: 2%;
    margin-left: 2%;
    padding-top: 2%;
    background: #EEEEEE 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
  }
  .uu{
    display: none;
  }
  .hoverSkill:hover>.uu{
    display: block;
  }
.theme--light.v-divider {
  display: none!important;
}
</style>
