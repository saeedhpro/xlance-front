<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div v-if="post" class="px-3">
    <div class="pb-2 mb-2 flex border-b-2 border-gray-300 flex justify-between items-center">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">دنبال شده ها</div>
      <nuxt-link to="/socialMedia" class="text-greenFreelancer underline">برگشت</nuxt-link>
    </div>
    <div class="mt-5 flex flex-wrap">
      <div class="sm:w-1/2 w-full p-6 sm:mb-0 mb-5 border-2 border-gray-300 border-solid rounded-lg ">
        <img class="w-full  rounded-lg" :src="post.media.path" style="width: 520px;
height: 520px;"/>

      </div>
      <div class="sm:w-1/2 w-full px-5">
        <div class="px-3 py-1 w-full h-8 bg-gray-200 rounded-lg flex justify-between">
          <div class="text-gray-600 text-sm">{{ ($moment(post.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber}}</div>
          <div class="flex items-center mr-auto justify-end">
<!--            mypost-->
            <div class="mx-3 mt-1" v-if="user.id===post.user.id">
              <div @click="show = !show">
                <i class="fas fa-ellipsis-h"></i>
              </div>
              <div v-if="show" @click="deletePost(post.id)" class="w-32 h-10 -mt-2 shadow-lg	 rounded-lg bg-white text-gray-700 text-sm flex absolute justify-center items-center">
                <i class="fal fa-trash-alt"></i>
                <div class="mr-3">پاک کردن</div>
              </div>
            </div>
            <div class="text-black">{{post.username}}</div>
            <img class="w-4 h-4 mr-2 rounded-full" v-if="post.user.profile.avatar" :src="post.user.profile.avatar.path">
          </div>
        </div>
        <div class="my-3 h-auto text-sm text-gray-900 ir-light">{{post.caption}}</div>
        <!--          another posts-->
        <div class="my-5">
          <div class="my-5 flex flex-wrap justify-between">
            <div class="flex  items-center">
              <div class="px-3 py-2 bg-gray-200 rounded-lg text-gray-600 click smallwindow1" :class="{'selected1' : post.liked }" @click="post.liked ? unlike() : like()" >
                <i class="fal fa-heart"></i>
                می پسندم
              </div>
              <div class="md:mx-5 mx-2 text-gray-600 text-sm smallwindow">
                {{post.likes_count}}
                نفر پسندیدند
              </div>
              <div class="text-gray-600 text-sm smallwindow">
                {{post.comments.length}}
                نظر
              </div>
            </div>
            <div class="px-3 text-sm py-2 sm:my-0 my-2 bg-gray-200 rounded-lg text-gray-600 click smallwindow1" @click="post.saved ? unSave() : save()" :class="{'selected2' : post.saved}">
              <i class="fal fa-bookmark"></i>
              ذخیره
            </div>
          </div>
          <div class="flex flex-wrap justify-between">
            <textarea class="sm:w-2/3 w-full sm:ml-2 h-12 px-2 py-1 border-solid border-2 border-gray-300 bg-gray-100 rounded-lg placeholder-gray-400" placeholder="نظر خود را بنویسید" v-model="comment.body"></textarea>
            <div class="mx-auto">
            <button class="px-10 sm:my-0 my-3 py-1 text-greenFreelancer border-solid border-2 border-greenFreelancer rounded-lg" @click="sendComment">ارسال</button>
          </div>
          </div>
        </div>
        <!--          comments-->
        <div class="my-5 flex items-center ">
          <img src="/images/art2.png" class="h-4"/>
          <div class="mr-2 text-sm text-gray-700 ir-medium">نظرات</div>
        </div>
        <div class="pb-2 my-2 flex flex-wrap  justify-between border-b-2 border-gray-400 border-dashed re"
             v-for="(i , n) in post.comments" :key="n" >
          <div>
          <p class="text-black ir-light" style="overflow-wrap: anywhere; max-width: 400px">{{i.body}}</p>
          </div>
          <div class="justify-end flex items-center">
            <div class="text-black ir-medium">{{i.user.username}}</div>
            <div>
              <img v-if="i.user.profile.avatar" :src="i.user.profile.avatar.path" class="w-8 h-8 mr-2  rounded-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
    export default {
        name: "ShoPost",
        layout:'dashboard',
        middleware: 'auth',
        data(){
            return{
                show:false,
                status:'1',
                comment:{
                    body:null
                }
            }
        },
        methods:{
            like(){
                this.liked= true

                this.$store.dispatch('socillMedia/likePost', this.$route.params.id)
                    .then(res=>{
                    })
            },
            unlike(){
                this.liked= false

                this.$store.dispatch('socillMedia/unLikePost', this.$route.params.id)
                    .then(res=>{
                    })
            },
            save(){
                this.$store.dispatch('socillMedia/savePost', this.$route.params.id)
                    .then(res=>{
                        // this.saved= true
                    })
            },
            unSave(){
                this.$store.dispatch('socillMedia/unSavePost', this.$route.params.id)
                    .then(res=>{
                        // this.saved= false
                    })
            },
            sendComment(){
                this.$store.dispatch('socillMedia/sendComment',{
                  id: this.$route.params.id,
                  comment: this.comment
                })
                    .then(res=>{
                      location.reload();
                    })
                  .catch(async err => {
                    const keys = Object.keys(err.response.data.errors);
                    for (let i = 0; i < keys.length; i++){
                      for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                        await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                          timeout: 2000,
                          showProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true
                        })
                      }
                    }
                  })
            },
            deletePost(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('socillMedia/deletePost', id)
                                .then(res => {
                                    this.$snotify.success('با موفقیت حذف شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                    this.$router.replace('/socialMedia')
                                })

                        }
                    })
            },

        },
        async mounted(){
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.$store.dispatch('socillMedia/getDescriptionPost', this.$route.params.id)
                this.$nuxt.$loading.finish()
            })
        },
        computed:{
            post(){
                return this.$store.getters['socillMedia/getDescriptionPost']
            },
            user(){
                return this.$store.getters['user/user']
            },
        }
    }
</script>
<style scoped>
  .selected1{
    background-color: #FFF5F5;
    color: #F44336;
  }
  .selected2{
    background-color: #EBFFF7;
    color: #00C379;
  }
  @media (max-width: 763px) {
    .re{
      flex-direction: column-reverse;
    }
    .smallwindow{
      font-size: 11px;
    }
    .smallwindow1{
      font-size: 13px;
    }
  }
</style>
