<template>
  <div class="container bg-white rounded-lg shadow-lg">
    <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">نمونه کار </div>
    </div>
    <div v-if="portfolio" class="flex flex-wrap lg:-mx-2">
      <div class="lg:w-3/5 lg:px-2 md:w-full sm:w-full">
        <div class="w-full items-center text-center rounded-lg">
          <img v-if="portfolio.images.length>0" :src="portfolio.images[0].path" class="rounded-lg" style="width: 520px;
height: 520px;">
        </div>
      </div>
      <div class="lg:w-2/5 w-full lg:px-2">
        <div class="mb-4">
          <label class="text-sm my-5 ir-medium text-gray-700">عنوان</label>
          <div class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">{{portfolio.title}}</div>
        </div>
        <div class="my-4">
          <label class="text-sm my-5 ir-medium text-gray-700">توضیحات</label>
          <div class="w-full h-32 mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">{{portfolio.description}}</div>
        </div>
        <div class="my-4">
          <label class="text-sm my-5 ir-medium text-gray-700">مهارت های استفاده شده</label>
          <div class="my-2 flex flex-wrap">
          <div class="m-1" v-for="(skill , index) in portfolio.skills" :key="index" >
            <div class="p-1 bg-purple-200 rounded text-purple-600" >{{skill.name}}</div>
          </div>
          </div>
        </div>
        <div class="my-4">
          <label class="text-sm my-5 ir-medium text-gray-700">برچسب ها</label>
          <div class="my-2 flex flex-wrap">
          <div class="m-1" v-for="(tag , index) in portfolio.tags" :key="index" >
            <div class="p-1 bg-purple-200 rounded text-purple-600" >{{tag}}</div>
          </div>
          </div>
        </div>
        <!--          <div class="my-3">-->
        <!--            <label class="text-sm my-5 ir-medium text-black">برچسب ها</label>-->
        <!--            &lt;!&ndash;    <AutoCompletes :people="tags"/>&ndash;&gt;-->
        <!--&lt;!&ndash;            <input class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">&ndash;&gt;-->
        <!--            <MultiSelect v-model="selected_skills" :options="tags" @change="onChange1" />-->
        <!--          </div>-->

      </div>
      <div class="flex w-full mt-5 attachment-box">
<!--        <div class="w-full md:w-3/5 uploader-box">-->
<!--          <div class="list-bg">-->
<!--            <p class="title">فایل‌های ضمیمه</p>-->
<!--            <p class="desc">از این قسمت می‌توانید حداکثر تا ۵ فایل را ضمیمه پروژه خود کنید (حداکثر حجم هر فایل: ۱۰ مگابایت)</p>-->
<!--            <div class="upload-btn click" @click="openUploader">-->
<!--              <i class="fal fa-upload"></i>-->
<!--              آپلود فایل-->
<!--            </div>-->
<!--            <input-->
<!--              ref="uploader"-->
<!--              class="upload-input"-->
<!--              type="file"-->
<!--              multiple-->
<!--              accept="image/*"-->
<!--              @change="selectFiles()"-->
<!--            >-->
<!--          </div>-->
<!--        </div>-->
        <div class="w-full md:w-2/5 attachments-list">
          <label class="text-sm my-5 ir-medium text-gray-700">فایل های ضمیمه شده</label>
          <a :href="f.path" download class="attachment-item"
            v-for="(f, i) in portfolio.attachments"
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
      </div>
<!--      <div class="mt-5 flex-col mx-auto">-->
<!--        <div class="flex items-center ir-medium align-center justify-start">-->
<!--          <v-checkbox-->
<!--            v-model="ex4"-->
<!--            color="greenFreelancer"-->
<!--            value="success"-->
<!--          ></v-checkbox>-->
<!--          <div class="-mt-4 mr-2 text-gray-700 text-sm"><span class="text-greenFreelancer text-sm underline ">قوانین و مقررات ثبت نمونه کار</span> در ایکس لنس را خوانده ام و با آنها موافقم</div>-->
<!--        </div>-->
<!--        <div class="mt-5 mb-10  mx-auto text-center text-white">-->
<!--          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave" :disabled="!ex4" @click="savePortfolios">ثبت نمونه کار</button>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script>
    export default {
        name: "index",
        layout:'account',
      middleware:'auth',
        data(){
            return{
                status:'1',

            }
        },
        mounted() {
            this.$nextTick(async ()=>{
                this.$nuxt.$loading.start();
                await this.$store.dispatch('portfolio/getPortfolio', this.$route.params.id)
                this.$nuxt.$loading.finish();
            })
        },
        computed: {
            portfolio() {
                return this.$store.getters['portfolio/getPortfolio']
            }
        }
    }
</script>

<style scoped>

</style>
