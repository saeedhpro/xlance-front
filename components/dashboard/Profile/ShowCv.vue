<template>
  <div>
<div class="sm:mr-20 mr-3" v-if="freelancer">
  <div class="flex  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png" alt=""/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سمت و عنوان</div>
      <div class="mt-3 text-sm text-gray-600 text-right">{{freelancer.profile.position}}</div>
    </div>
  </div>
  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png" alt=""/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سوابق کاری</div>
      <div class="w-full my-5 text-sm text-gray-600 text-right" v-for="(e , i) in freelancer.experiences">
        <div>
          <span class="ir-bold">{{e.company}}</span>
          <span> {{ ($moment(e.from_date).format('jYYYY/jM/jDD')) | toPersianNumber }} - {{ ( $moment(e.up_to_now ? 'تا الان' : e.to_date).format('jYYYY/jM/jDD')) | toPersianNumber }} </span>
        </div>
        <div>{{e.position}}</div>
        <div>{{e.description}}</div>
      </div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png" alt=""/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سوابق تحصیلی</div>
      <div class="my-5 text-sm text-gray-600 text-right " v-for="(e , i) in freelancer.educations">
        <span class="ir-bold">{{e.degree}}</span>
        <!--        {{e.from_date}}-{{e.up_to_now ? 'تا الان' : e.to_date}}-->
        {{ ($moment(e.from_date).format('jYYYY/jM/jDD')) | toPersianNumber }} - {{ up_to_now ? 'تاالآن' : ($moment(to_date).format('jYYYY/jM/jDD')) | toPersianNumber }}
        <br>
        <div class="text-sm text-gray-600 text-right">{{e.school_name}}</div>
      </div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">دستاوردها</div>
      <div class="my-5 text-sm text-gray-600 text-right" v-for="(e , i) in freelancer.achievements" style="">
        <div class="ir-bold">{{e.title}}</div>
        <div>{{e.event_name}}</div>
      </div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png" alt=""/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سایر اطلاعات</div>
      <div class="my-3 text-sm text-gray-600 text-right">
        <div class="my-4">جنسیت: <span  class="ir-bold">{{getGender(freelancer.profile.gender)}}</span></div>
        <div class="my-4">وضعیت تاهل: <span class="ir-bold">{{ getMaterial(freelancer.profile.marital_status)}}</span></div>
        <div class="my-4">تاریخ تولد:
          <span class="ir-bold" v-if="freelancer.profile.birth_date">{{ ($moment(freelancer.profile.birth_date).format('jYYYY/jM/jDD') ) | toPersianNumber}}</span>
          <span v-else>-</span>
        </div>
        <div class="my-4">زبان های مسلط: <span class="ir-bold">{{freelancer.profile.languages.join('    ,    ')}}</span></div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
    export default {
        name: "ShowCv",
        computed:{
            freelancer(){
                return this.$store.getters['freelancer/getFreelancer']
            },
        },
      methods:{
        getGender(i){
          switch (i) {
            case 0 :
              return 'آقا'
              case 1:
                return 'خانم'
            default :
              return 'نامشخص'
          }
        },
        getMaterial(i){
          switch (i) {
            case false :
              return 'مجرد'
              case true :
                return 'متاهل'
            default :
              return 'نامشخص'
          }
        },
      }
    }
</script>
