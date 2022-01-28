<template>
    <div class="container">
      <div v-if="getArticle">
      <div class="md:px-20 px-0">
      <img v-if="getArticle.thumbnail" :src="getArticle.thumbnail.path" class="w-full h-64">
      <div class="mt-10 text-gray-600 text-sm text-center">{{ ($moment(getArticle.created_at).format('jYYYY/jM/jDD')) | toPersianNumber}}</div>
      <div class="mt-3 text-2xl text-black ir-bold text-center">{{getArticle.title}}</div>
      <div class="mt-5 text-gray-600 text-md" v-html="getArticle.body"></div>
    </div>
      <div class="mt-3 md:px-20 px-0" v-if="user">
        <div class="mb-5 mt-10 flex align-items-center">
          <div>
            <img class="h-5" src="/images/art2.png"/>
          </div>
          <div class="mr-5 ir-bold text-lg">دیدگاه خود را بنویسید</div>
        </div>
      <div>
        <label class="text-sm tetx-black">دیدگاه شما</label>
        <textarea class="w-full h-32 p-3 border-solid border-2 border-gray-500 rounded-lg" v-model="comment.body"></textarea>
      </div>
      <button class="mr-auto ml-0 mt-10 h-12 p-2 w-64 text-center  bg-purple-600 text-white rounded-lg shadow-lg" @click="sendComment">ثبت دیدگاه</button>
    </div>
      <div class="mt-5 md:px-20 px-0">
        <div class="mt-12 mb-5 flex" style="align-items: center">
          <img src="/images/art2.png" class="h-5"/>
          <div class="mr-5 ir-bold text-xl">دیدگاه ها</div>
        </div>
        <div v-for="(i , n ) in getArticle.comments" :key="n" class="my-2 border-b-2 border-gray-400">
          <div class="flex">
            <div class="text-sm text-black">{{ i.user.username}}</div>
            <div class="text-gray-600 text-sm"><span class="mx-2">-</span>{{ ($moment(i.created_at).format('jYYYY/jM/jDD')) | toPersianNumber}}</div>
          </div>
          <div class="text-gray-600 text-sm my-3">{{i.body}}</div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
    export default {
        name: "index",
        layout:'rule',
      head(){
        return {
          title: 'مقاله'
        }
      },
        data(){
            return{
                comment:{
                    body:null,
                }
            }
        },
        mounted(){
            this.$store.dispatch('blog/getArticle',
                this.$route.params.id
            )
        },
        computed:{
            getArticle(){
                return this.$store.getters['blog/getArticle']
            },
            user(){
                return this.$store.getters['user/user']
            }
        },
        methods:{
            sendComment(){
                this.$store.dispatch('blog/addComment',{
                    id: this.$route.params.id,
                    comment: this.comment
                })
                    .then(res=>{
                        this.comment = {
                            body: null
                        }
                    })
            }
        }
    }
</script>
