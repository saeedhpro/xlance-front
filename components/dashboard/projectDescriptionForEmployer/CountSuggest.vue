<template>
  <div>
    <div v-if="project && user">
      <div class="mt-10 mb-5 flex items-center">
        <div>
          <img src="/images/art2.png"/>
        </div>
        <div class="mr-5 text-lg text-black ir-bold">پیشنهادات</div>
      </div>
      <div v-for="(i, index) in project.requests" :key="index" class="my-1">
      <div  class="my-4 p-4 w-full bg-white rounded-lg  flex flex-wrap shadow-md">
        <div class="sm:w-1/5 w-full text-center">
          <nuxt-link :to="`/profiles/${i.user.id}`">
          <img v-if="i.user.profile.avatar" :src="i.user.profile.avatar.path" class="w-20 h-20 mx-auto rounded-full">
          <img v-else src="/images/logo.png" class="w-20 h-20 mx-auto rounded-full">
          <div class="ir-bold mx-auto my-2">
            {{i.user.username}}
          </div>
          </nuxt-link>
          <button
            v-if="user.id === project.employer.id"
            class="p-2 w-40 mx-auto text-sm rounded-lg border-solid border-2 border-purple-600 text-purple-600 ir-bold"
            @click="openModal(project.id , i)">انتخاب پیشنهاد
          </button>
        </div>
        <div class=" sm:w-4/5 w-full">
          <div class="flex justify-between">
            <div class="sm:mt-0 mt-3 flex flex-wrap">
              <div>
                <rating-component :value="i.user.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
              </div>
              <div class="mx-5 text-gray-600 text-sm">
                در
                {{i.delivery_date | toPersianNumber}}
                روز</div>
                <div class="text-gray-600 text-sm"><span class="mx-1 ir-medium" >{{i.price.toLocaleString() | toPersianNumber}}</span>ریال</div>
            </div>
            <div>
              <div class="sm:mt-0 mt-3 h-7 px-2 py-1 bg-gray-300 rounded-2xl text-gray-600 text-sm">{{ ($moment(i.created_at).format('jYYYY/jM/jDD')) | toPersianNumber }}</div>
          </div>
          </div>
          <div class="mt-2 text-gray-600 text-sm ir-light">{{i.description}}</div>
        </div>
      </div>
    </div>
    </div>
    <modal name="example" style="direction: ltr" class="h-auto pb-5 text-center">
      <div class="ir-bold mt-10">انتخاب پیشنهاد فریلنسر</div>
      <img src="/images/art5.png" class="my-2 mx-auto"/>
      <div>آیا از انتخاب این فریلنسر برای انجام پروژه خود اطمینان دارید؟</div>
      <div class="mt-5 mb-5 flex justify-center">
        <div class="ml-1 w-40 py-2 text-sm bg-purple-600 text-white rounded-lg shadow-lg click" @click="selectSuggest">بله انتخاب کن</div>
        <div class="mr-1 w-40 py-2 text-sm border-solid border-2 border-purple-600 text-purple-600 rounded-lg click" @click="closeModal">خیر</div>
      </div>
    </modal>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>
<script>
  import rating from "../../global/rating";
  import RatingComponent from "../../RatingComponent";
    export default {
        name: "CountSuggest",
        components:{RatingComponent, rating},
        data(){
            return{
                rating:4,
                status:1,
                pid:null,
                id:null,
            }
        },
        methods:{
            selectSuggest() {
                if(this.project.selected_request && this.project.selected_request.user.id === this.request.user.id)
                {
                    this.$snotify.error('شما به این پروژه پیشنهاد داده اید', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    })
                }
                else {
                    this.$store.dispatch('project/selectRequest', {
                        pid: this.pid,
                        id: this.id.id,
                        accepted: true,
                    })
                        .then(res => {
                            this.closeModal()
                            this.$snotify.success('درخواست انجام پروژه برای فریلنسر ارسال شد', {
                                timeout: 2000,
                                showProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true
                            })
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
                }
            },
            openModal(pid , request){
                this.$modal.show('example')
                this.pid = pid
                this.id = request
            },
            closeModal(){
                this.$modal.hide('example')
                this.pid = null
                this.id = null
            }
        },
        mounted(){
            this.$store.dispatch('project/getDescriptionProject', this.$route.params.id)
        },
        computed:{
            project(){
                return this.$store.getters['project/getDescriptionProject']
            },
          user() {
              return this.$store.getters['user/user']
          },
            loggedInUser(){
                return this.$store.getters['user/user']
            },
        }
    }
</script>
