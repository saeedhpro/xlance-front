<template>
  <div class="container" v-if="laravelData && laravelData.data">
    <nuxt-link  :to="`/projects/${item.id}`" v-for="(item, index) in laravelData.data.slice(0, number)"
             :key="index"  class="p-2 my-5 flex flex-wrap w-full bg-white rounded-lg shadow-md "
             :class="{'back-forward'
              : $phr(item.properties, 4)}">
    <div class="md:pl-5 pt-2 pb-3 lg:w-1/6 w-full md:border-l-2 md:border-gray-400  items-center text-center">
      <div class="mb-3 h-8 flex justify-between">
        <div>
        <div class="px-2 w-20 py-1 text-sm bg-purple-100 text-purple-600 flex rounded-lg" v-if="$phr(item.properties, 2)">
          <img src="/images/key1.svg"/>
          <span class="mr-2 ">محرمانه</span>
        </div>
        </div>
        <div>
        <div class="px-2 w-20 py-1 text-sm mr-2 bg-pink-100 text-pink-200 flex rounded-lg" v-if="$phr(item.properties, 1)">
          <img src="/images/fast_forward1.svg"/>
          <span class="mr-2 ">فوری</span>
        </div>
        </div>
      </div>
      <div class="flex justify-center ">
        <div class="pl-3 border-l-2 border-gray-500 ">
          <div class="text-black text-sm ir-bold">{{item.requests_count | toPersianNumber}}</div>
          <div class="text-black text-sm">پیشنهاد</div>
        </div>
        <div class="pr-3">
          <div>
            <div class="text-gray-600" v-if="item.timeout">
              <ClientOnly>
                <vac :end-time="new Date().getTime() + 1209600000 - item.timeout" >
                  <template v-slot:process="m" >
                      <div class="text-black text-sm ir-bold">{{ `${m.timeObj.d}` | toPersianNumber }}
                        <span class="mr-1 text-black text-sm ir-bold">روز</span>
                      </div>
                      <div class=" text-sm ir-bold">{{ `${m.timeObj.h}` | toPersianNumber }}
                        <span class="mr-1  text-sm">ساعت</span>
                      </div>
                  </template>
                  <template
                    v-slot:finish>
                    <span class="text-black text-sm ir-bold">تمام شد!!</span>
                  </template>
                </vac>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 w-40 px-1 lg:w-full m-auto rounded-lg flex border-dashed  border-2 border-purple-600 text-center">
        <div  class="mx-auto text-purple-600 text-sm text-center">
          <span class=" ir-bold text-lg text-center">{{item.max_price.toLocaleString() | toPersianNumber}} </span>
          <span class="text-sm">ریال</span>
        </div>
      </div>
    </div>
    <div class="md:pr-5 lg:w-5/6 w-full md:border-t-0 border-t-2 border-gray-400 pt-2 ">
      <div class="flex" style="align-items: center">
      <p class="my-3 ir-bold text-black text-xl">{{item.title}}
      </p>
        <div>
          <div class="px-2 w-24 py-1 text-sm mr-2 bg-blue-300 text-blue-400 flex rounded-lg" v-if="$phr(item.properties, 3)">
            <img src="/images/clock1.svg"/>
            <span class="mr-2 ">تمام وقت</span>
          </div>
        </div>
      </div>
      <p class="text-sm text-gray-700 ir" v-html="item.description.substring(0,200)+(item.description.length>200? '...' : '')"></p>
      <div class="mt-2 flex   align-baseline ">
        <div class="ml-5 mt-2 text-sm text-gray-800">مهارت ها:</div>
        <div class="flex flex-wrap justify-start">
        <div  v-for="(skill , index) in item.skills" :key="index">
          <div class="p-1 m-1 bg-purple-200 rounded text-purple-600" >{{skill.name}}</div>
        </div>
        </div>
      </div>
    </div>
  </nuxt-link>
    <pagination v-if="hasPaginate" :data="laravelData" @pagination-change-page="getResults"></pagination>
  </div>
</template>
<script>
    export default {
        name: "ProjectsDescriptions",
        props: {
            number:{
                type:Number,
                default: 10,
            },
            laravelData:{
                type:Object
            },
            hasPaginate: {
                type: Boolean,
                default: false,
            }
        },
        data(){
            return{
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
        methods: {
            getResults(page = 1) {
              this.$emit('paginate' , page)
            }
        }
    }
</script>
<style>
  .back-forward{
    border: 2px solid #00C379;
    background: #FAFFFD 0% 0% no-repeat padding-box;
  }
</style>
