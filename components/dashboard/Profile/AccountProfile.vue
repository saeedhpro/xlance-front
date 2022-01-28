<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 mb-2 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium" @click="status='1'" :class="{'select' : status==='1'}">حساب
          کاربری
        </div>
      </div>
      <div class="mt-5" v-if="user">
        <div>
          <div class="flex flex-wrap -mx-2 justify-start">
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm ir-medium text-black">نام کاربری</label>
              <div
                class="w-full mt-2 px-3 py-3 bg-gray-200 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">
                <div class="flex text-gray-700 align-center">
                  <i class="fad fa-user text-lg"></i>
                  <div class="mr-3">{{ user.username }}</div>
                </div>
                <div class="text-gray-500">
                  غیر قابل تغییر
                </div>
              </div>
            </div>
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm ir-medium text-black">ایمیل</label>
              <div
                class="w-full mt-2 px-3 py-3 bg-gray-200 flex justify-between  border-2 border-solid border-gray-500 rounded-xl">
                <div class="flex text-gray-700 align-center">
                  <div class="mr-3">{{ user.email }}</div>
                </div>
                <div class="text-gray-500">
                  غیر قابل تغییر
                </div>
              </div>
            </div>

          </div>
          <div class="flex flex-wrap -mx-2 justify-start">
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm my-5 ir-medium text-black">نام<span
                class="px-2 text-sm ir-ultraLight">(ضروری)</span></label>
              <input
                class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl"
                v-model="user.first_name" placeholder="نام خود را وارد کنید">
            </div>
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm my-5 ir-medium text-black">نام خانوادگی<span class="px-2 text-sm ir-ultraLight">(ضروری)</span></label>
              <input
                class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl"
                v-model="user.last_name" placeholder="نام خانوادگی را وارد کنید">
            </div>
          </div>
        </div>
        <div>
          <div class="w-full items-center text-center">

            <div class="p-2  upload-box-title-box rounded-lg bg-gray-100 text-center  relative">
              <img v-if="image" :src="image.path" class="mx-auto rounded-lg"/>
              <div class="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg" v-else>
                <div>
                  <div class="upload-box-title-text text-gray-700 ir-medium text-sm">
                    تصویر کارت ملی
                  </div>
                  <div class=" my-4 upload-box-title-text text-gray-700">
                    ۱۱۲۰ ۲۴۰x
                  </div>
                  <div class="upload-box-title-input">
                    <img src="/images/upload-icon.png">
                    <button
                      class="flex m-auto w-32 border-2 py-2 px-1 rounded-lg border-solid border-gray-500 text-gray-600 bg-gray-200 justify-center  text-sm"
                      @click="show = true">
                      <i class="fal fa-upload"></i>
                      <div class=" mr-2">آپلود تصویر</div>
                    </button>
                    <my-upload field="file"
                               @crop-success="cropSuccess"
                               @crop-upload-success="cropUploadSuccess"
                               @crop-upload-fail="cropUploadFail"
                               v-if="show"
                               :width="1120"
                               :height="240"
                               url="https://api.xlance.ir/api/upload"
                               noRotate="false"
                               noSquare="false"
                               noCircle="false"
                               langExt
                               langType="en"
                               imgFormat="image/jpeg,png"
                               :params="params"
                               :headers="headers"
                               img-format="png"></my-upload>
                    <!--              <input ref="upload" accept="image/jpeg,png" type="file" hidden @change="onFile">-->
                  </div>
                  <img
                    class="w-full  h-full upload-placeholder rounded-lg absolute inset-0"
                    v-if="!image && user.profile.national_card" :src="user.profile.national_card.path"
                  />
                  <!--            <img-->
                  <!--              v-if="base64"-->
                  <!--              ref="upload-placeholder1"-->
                  <!--              alt=""-->
                  <!--              class="w-full  h-full upload-placeholder rounded-lg absolute inset-0	"-->
                  <!--              :src="base64"-->
                  <!--              @click="onUploadClicked"-->
                  <!--            >-->
                </div>
              </div>
            </div>
            <div
              class="my-3 w-64 py-2 border-solid border-2 rounded-lg border-gray-600 text-gray-600 align-center mx-auto mt-10"
              v-if="user.profile.national_card && !user.profile.national_card_accepted">
              <span> <i class="fal fa-clock "></i></span>
              <span>در درست بررسی</span></div>
            <div
              class="my-3 w-64 py-2 border-solid border-2 rounded-lg border-greenFreelancer text-greenFreelancer align-center mx-auto mt-10"
              v-else-if="user.profile.national_card && user.profile.national_card_accepted">
              <span> <i class="fal fa-check-circle mx-2"></i> </span>
              <span>تایید شده </span></div>
          </div>
        </div>
        <div>
          <div class="flex flex-wrap -mx-2 justify-start">
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm my-5 ir-medium text-black">استان</label>
              <div class="mt-2">
                <select
                  id="state"
                  v-model="state_id"
                  name="movie"
                  style="height: 52px"
                  class="w-full rounded-lg border-2 border-gray-500 border-solid">
                  <option @change="getCitiesList" v-for="(i , index) in getStates" :key="index" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm my-5 ir-medium text-black">شهر</label>
              <div class="mt-2">
                <select
                  id="city"
                  v-model="city_id"
                  style="height: 52px"
                  name="movie"
                  class="w-full rounded-lg border-2 border-gray-500 border-solid">
                  <option v-for="(i , index) in getCities" :key="index" :value="i.id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>

          </div>
          <div class="flex flex-wrap -mx-2 justify-start">
            <div class="my-3 sm:w-1/2 w-full px-2">
              <label class="text-sm my-5 ir-medium text-black">شماره موبایل<span class="px-2 text-sm ir-ultraLight">(ضروری)</span></label>
              <input
                class="w-full mt-2 px-3 py-3 flex justify-between  border-2 border-solid border-gray-500 rounded-xl"
                v-model="user.phone_number" placeholder="شماره تماس خود را وارد کنید">
            </div>

          </div>
        </div>
        <div class="my-10 text-center">
          <div class="text-sm">وضعیت نمایش پروفایل</div>
          <div class="container flex justify-center">
            <div
              class="  py-2 px-10 text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm click"
              @click="changeType(2)" :class="{'selected' : menuStatus === 2}">کارفرما
            </div>
            <div
              class=" py-2 px-10  text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm click"
              @click="changeType(1)" :class="{'selectedGreen' : menuStatus === 1}">فریلنسر
            </div>
          </div>
        </div>
        <div class="my-10 text-center text-white">
          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="updateUser">
            <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8"/>
            <span v-if="loadingText">ذخیره</span>
          </button>
        </div>
      </div>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2';
import 'babel-polyfill';
import Select from "../Select";

export default {
  name: "AccountProfile",
  components: {
    Select,
    'my-upload': myUpload
  },
  data() {
    return {
      base64: null,
      showSessionModal: false,
      courseAdded: false,
      new_bg_id: null,
      national: null,
      user: null,
      // countries: [],
      // country_id: null,
      city_id: null,
      state_id: null,
      value: 2,
      cities: [],
      value1: 2,
      value2: 2,
      loadingText: true,
      loadingbtn: false,
      date: [
        {id: 1, name: 'تهران'},
        {id: 2, name: 'ملایر'},
      ],
      menuStatus: 2,
      status: '1',
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        "Authorization": `Bearer ${this.$cookies.get('token')}`
      },
      image: null,
      imgDataUrl: '',
    }
  },
  async mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()
      await this.getUser();
      await this.getStatesList();
      this.$nuxt.$loading.finish()
    })
  },
  methods: {
    async getUser() {
      this.$store.dispatch(`account/me`)
        .then((response) => {
          this.user = {...response};
          this.state_id = this.user.state ? this.user.state.id : null;
          this.city_id = this.user.city ? this.user.city.id : null;
          this.menuStatus = response.as_employer ? 2 : 1;
        })
        .catch((error) => {
        })
    },
    getStatesList() {
      this.$store.dispatch(`account/getStatesList`)
    },
    getCitiesList(id) {
      this.$store.dispatch(`account/getCitiesList`, id)
    },
    updateUser() {
      this.loadingbtn = true
      this.loadingText = false
      this.$store.dispatch('account/information', {
        city_id: this.city_id,
        state_id: this.state_id,
        phone_number: this.user.phone_number,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        as_employer: this.user.as_employer,
        new_national_card_id: this.image.id,
      })
        .then(res => {
          this.$snotify.success('پروفایل شما با موفقیت ثبت شد', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          })
          this.loadingbtn = false
          this.loadingText = true
          // this.$router.replace('/picture')
        })
        .catch(async err => {
          const keys = Object.keys(err.response.data.errors);
          for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++) {
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
    changeType(n) {
      if (n == 1) {
        this.user.as_employer = false;
        this.menuStatus = 1;

      } else {
        this.user.as_employer = true;
        this.menuStatus = 2;
      }

    },
    toggleShow() {
      this.show = true;
    },
    cropSuccess(imgDataUrl, field) {
      // this.image = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      this.image = jsonData.data
      this.$store.dispatch('account/createNatinaletyPicture', {
        image_id: this.image.id
      })
      this.show = false
    },
    cropUploadFail(status, field) {
    }
  },
  computed: {
    information() {
      return this.$store.getters['account/information']
    },
    getStates() {
      return this.$store.getters['account/states']
    },
    getCities() {
      return this.$store.getters['account/cities']
    },
  },
  watch: {
    // country_id: (id) => {
    //     // let c = this.countries.find(i => i.id === id)
    //     this.cities = c.cities;
    // },
    state_id: function (id) {
      this.$store.dispatch('account/getCitiesList', id)
    }
  }
}
</script>
