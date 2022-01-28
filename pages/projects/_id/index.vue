<template>
  <div class="container">
    <div v-if="project">
      <div class="p-5 bg-white rounded-lg shadow-md" >
        <div class="flex flex-wrap justify-between">
          <div class="flex justify-start" style="align-items: center">
          <div class="ir-medium text-2xl">{{project.title}}
          </div>
            <div>
              <div class="px-2 py-1 w-24 mx-1  text-sm bg-blue-300 text-blue-400 flex rounded-lg" v-if="project.properties && $phr(project.properties, 3)">
                <img src="/images/clock1.svg"/>
                <span class="mr-2">تمام وقت</span>
              </div>
            </div>
          </div>
          <div class="text-gray-600 ">
            <span class="ir-bold text-black">{{project.requests_count | toPersianNumber}}</span>
            پیشنهاد داده شده
          </div>
        </div>
        <div class="my-5 h-8 flex flex-wrap justify-between text-sm">
          <div class="flex flex-wrap justify-start align-center align-content-center">
            <div>
              <div class="px-2 py-1 w-24 mx-1  text-sm bg-purple-100 text-purple-600 flex rounded-lg" v-if="project.properties && $phr(project.properties, 2)" style="width: 80px!important;">
<!--                <i class="fal fa-award mt-1"></i>-->
                <img src="/images/key1.svg"/>
                <span class="mr-2">محرمانه</span>
              </div>
            </div>
            <div>
              <div class="px-2 py-1 w-20  mx-1 text-sm mr-2 bg-pink-100 text-pink-200 flex rounded-lg" v-if="project.properties&&$phr(project.properties, 1)" style="width: 66px!important;">
<!--                <i class="fal fa-forward mt-1"></i>-->
                <img src="/images/fast_forward1.svg"/>
                <span class="mr-2">فوری</span>
              </div>
            </div>
            <div class="pt-1 text-gray-600" v-if="project.employer">
              ایجاد شده توسط
              <nuxt-link :to="`/employer/${project.employer.id}`" class="text-greenFreelancer">
                {{project.employer.username}}
              </nuxt-link>
            </div>
          </div>
          <div class="text-gray-600" v-if="project.timeout">
            <ClientOnly>
              <vac :end-time="new Date().getTime() + 1209600000 - project.timeout" >
                <template v-slot:process="m" >
                  <div class="flex md:my-0 my-3">
                    <div class="mx-1 ir-bold">{{ `${m.timeObj.d}` | toPersianNumber }}</div>
                    <span class="mx-1 ">روز</span>
                    <div class="mx-1 ir-bold">{{ `${m.timeObj.h}` | toPersianNumber }}</div>
                    <span class="mx-1 ">ساعت</span>
                    زمان برای ارسال پیشنهاد باقی مانده است
                  </div>
                </template>
                <template
                  v-slot:finish>
                  <span>زمان ارسال پیشنهاد تمام شده است</span>
                </template>
              </vac>
            </ClientOnly>
          </div>
        </div>
        <div class="flex flex-wrap justify-between" style="align-items: flex-end">
          <div class="md:mt-0 mt-10">
            <div class="mb-2 text-gray-600">بودجه پروژه</div>
            <div class="px-2 py-1 rounded-lg border-dashed border-2 border-gray-500 text-gray-600">
              <span class="mx-2 ir-bold text-black">{{project.min_price.toLocaleString() | toPersianNumber}}</span>-
              <span class="mx-2 ir-bold text-black">{{project.max_price.toLocaleString() | toPersianNumber}}</span>
              <span class="text-sm">ریال</span>
            </div>
          </div>
          <div v-if="1209600000 - project.timeout > 0" class="text-center text-white">
            <div @click="sendSuggest"  class="w-64 h-10 md:mt-0 mt-5 md:mx-0 mx-auto p-1 px-20 pt-2 ir-medium  rounded-lg bg-greentype shadow-xl click" style="padding-top: 6px;">ارسال پیشنهاد</div>
          </div>
        </div>
      </div>
      <SelectComponents/>
    </div>
  </div>
</template>
<script>
    import ProjectRequest from "../../../components/client/projects/ProjectRequest";
    import SelectComponents from "../../../components/dashboard/projectDescription/SelectComponents";
    import SuggestProjects from "./SuggestProjects";
    import SelectComponentsEmployer
        from "../../../components/dashboard/projectDescriptionForEmployer/SelectComponentsEmployer";
    import Description from "~/components/dashboard/projectDescription/Description";
    export default {
        name: "index",
  components: {Description, SelectComponentsEmployer, SuggestProjects, SelectComponents, ProjectRequest},
        layout:'defaultDash',
        middleware:'auth',

  data(){
            return{
                show:false,
                timeObj:{
                    "endTime": 1542634411361,
                    "speed": 1000,
                    "leftTime": 97019,
                    "d": "10",
                    "h": "12",
                    "m": "20",
                    "s": "0",
                    "ms": "0",
                    "org": {
                        "d": 0.001134247685185185,
                        "h": 0.02722194444444444,
                        "m": 1.6333166666666665,
                        "s": 37.998999999999995,
                        "ms": 19
                    },
                    "ceil": {
                        "d": 10,
                        "h": 12,
                        "m": 2,
                        "s": 98
                    }
                }

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
            }
        },
        methods:{
           sendSuggest(){
                if(!this.user.validated){
                    this.$snotify.error('پروفایل شما تکمیل نیست! لطفا عکس کارت ملی و شماره تماس و شماره شبای خود را چک کنید', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    })
                }
                else {
                    this.$router.replace(`/projects/${this.project.id}/SuggestProjects`)
                }
            }
        }
    }
</script>
