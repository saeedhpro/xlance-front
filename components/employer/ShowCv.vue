<template>
  <div>
<div class="mr-20" v-if="getEmployer">
  <div class="flex  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">عنوان و سمت</div>
      <div class="mt-3 text-sm text-gray-600 text-right">{{getEmployer.profile.position}}</div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سوابق کاری</div>
      <div class="w-full my-5 text-sm text-gray-600 text-right" v-for="(e , i) in getEmployer.experiences">
        <div>
          <span class="ir-bold">{{e.company}}</span>
          <span> {{ ($moment(e.from_date).format('jYYYY/jM/jDD')) | toPersianNumber }} - {{ ($moment(e.up_to_now ? 'تا الان' : e.to_date).format('jYYYY/jM/jDD')) | toPersianNumber }} </span>
        </div>
        <div>{{e.position}}</div>
        <div>{{e.description}}</div>
      </div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سوابق تحصیلی</div>
      <div class="my-5 text-sm text-gray-600 text-right " v-for="(e , i) in getEmployer.educations">
        <span class="ir-bold">{{e.degree}}</span>
        <!--        {{e.from_date}}-{{e.up_to_now ? 'تا الان' : e.to_date}}-->
        {{ ($moment(e.from_date).format('jYYYY/jM/jDD')) | toPersianNumber }} - {{ ($moment(e.up_to_now ? 'تا الان' : e.to_date).format('jYYYY/jM/jDD')) | toPersianNumber }}
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
      <div class="my-5 text-sm text-gray-600 text-right" v-for="(e , i) in getEmployer.achievements" style="">
        <div class="ir-bold">{{e.title}}</div>
        <div>{{e.event_name}}</div>
      </div>
    </div>
  </div>

  <div class="flex mt-10  pb-3 border-b-2 border-gray-400">
    <div>
      <img src="/images/art2.png"/>
    </div>
    <div class="mr-3">
      <div class="text-gray-600 ir-bold">سایر اطلاعات</div>
      <div class="my-3 text-sm text-gray-600 text-right">
        <div class="my-4">جنسیت: <span v-if="getEmployer.gender" class="ir-bold">{{getEmployer.gender ? 'آقا' : 'خانم'}}</span></div>
        <div class="my-4">وضعیت تاهل: <span v-if="getEmployer.marital_status" class="ir-bold">{{getEmployer.marital_status ? 'متاهل' :'مجرد'}}</span></div>
        <div class="my-4">تاریخ تولد: <span v-if="getEmployer.birth_date" class="ir-bold">{{ ($moment(getEmployer.birth_date).format('jYYYY/jM/jDD') ) | toPersianNumber}}</span></div>
        <div class="my-4">زبان های مسلط: <span class="ir-bold">{{getEmployer.language}}</span></div>
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
            getEmployer(){
                return this.$store.getters['employer/getEmployer']
            },
        }
    }
</script>
