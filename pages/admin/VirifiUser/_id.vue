<template>
  <div v-if="user" class="container py-2 pb-20 px-10 bg-white rounded-lg shadow-lg">
    <div class="px-3">
      <div class="pb-2 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium" @click="status='1'" :class="{'select' : status==='1'}">اطلاعات
          کاربر
        </div>
      </div>
      <div>
        <div class="mt-5 mb-2 text-black ir-bold">نام و نام خانوادگی</div>
        <div type="text" class="lg:w-1/2 h-10 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid">
          {{ user.full_name || 'پروفایل کامل نیست' }}
        </div>
      </div>
      <div>
        <div class="mt-5 mb-2 text-black ir-bold">نام کاربری</div>
        <div type="text" class="lg:w-1/2 h-10 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid">
          {{ user.username }}
        </div>
      </div>
      <div>
        <div class="mt-5 mb-2 text-black ir-bold">وضعیت کاربر</div>
        <div type="text" class="lg:w-1/2 h-10 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid">
          {{ user.verified ? 'تایید شده' : 'تایید نشده' }}
        </div>
      </div>
      <div>
        <div class="mt-5 mb-2 text-black ir-bold">شماره تماس کاربر</div>
        <div type="text" class="lg:w-1/2 h-10 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid">
          {{ user.phone_number }}
        </div>
      </div>
      <div class="pb-10 border-b-2 border-dashed border-gray-500">
        <div class="mt-5 mb-2 flex text-black ir-bold">شماره شبا کاربر</div>
        <div type="text" class="lg:w-1/2 h-10 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid">
          {{ user.profile.sheba }}
        </div>
        <div class="my-5 flex justify-start">
          <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 's')">تایید شماره شبا
            کاربر
          </div>
          <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false,'s')">رد کردن شماره شبا
            کاربر
          </div>
        </div>
      </div>
    </div>
    <div>
      <client-only>
        <light v-if="media.length > 0" :media="media" :showLightBox="showLightBox" @onClosed="closeLightBox">
        </light>
      </client-only>
    </div>
    <div class="my-10 pb-10 text-black text-sm border-dashed border-b-2 border-gray-500">
      <div class="mt-5 mb-2 text-black ir-bold">عکس پروفایل کاربر</div>
      <div class="w-64 h-64 mx-auto my-5 shadow-lg rounded-full">
        <img @click="setLight(user.profile.avatar_accepted ? user.profile.avatar.path : user.profile.new_avatar.path)" class="w-64 h-64 rounded-full"
             v-if="user.profile.avatar || user.profile.new_avatar"
             :src="user.profile.avatar_accepted ? user.profile.avatar.path : user.profile.new_avatar.path"/>
        <div v-else class="my-auto ir-bold text-center">عکس پروفایل نداره</div>
      </div>
      <div class="flex justify-center">
        <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 'a')">تایید عکس کاربر
        </div>
        <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false, 'a')"> رد کردن عکس کاربر</div>
      </div>
    </div>
    <div class="mt-10 pb-10 text-black text-sm border-dashed border-b-2 border-gray-500">
      <div class="mt-5 mb-2 text-black ir-bold">عکس پس زمینه پروفایل کاربر</div>
      <div class="w-full h-64 my-5 shadow-lg rounded-lg">
        <img @click="setLight(user.profile.bg_accepted ? user.profile.bg.path : user.profile.new_bg.path)" class="w-full h-64 rounded-lg"
             v-if="user.profile.bg || user.profile.new_bg"
             :src="user.profile.bg_accepted ? user.profile.bg.path : user.profile.new_bg.path"/>
        <div v-else class="my-auto ir-bold text-center">عکس پس زمینه پروفایل نداره</div>
      </div>
      <div class="flex justify-center" v-if="user.profile.new_bg">
        <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 'b')">تایید عکس پس
          زمینه
        </div>
        <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false, 'b')">رد کردن عکس پس زمینه
        </div>
      </div>
    </div>
    <div class="mt-10 pb-10 text-black text-sm border-dashed border-b-2 border-gray-500">
      <div class="mt-5 mb-2 text-black ir-bold">عکس کارت ملی کاربر</div>
      <div class="w-full h-64 my-5 shadow-lg rounded-lg">
        <img @click="setLight(user.profile.national_card_accepted ? user.profile.national_card.path : user.profile.new_national_card.pat)" class="w-full h-64 rounded-lg"
             v-if="user.profile.national_card || user.profile.new_national_card"
             :src="user.profile.national_card_accepted ? user.profile.national_card.path : user.profile.new_national_card.path"/>
        <div v-else class="my-auto ir-bold text-center">عکس کارت ملی نداره</div>
      </div>
      <div class="flex justify-center" v-if="user.profile.new_national_card">
        <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 'n')">تایید عکس کار
          ملی
        </div>
        <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false, 'n')">رد کردن عکس کارت ملی
        </div>
      </div>
    </div>
    <!--      <div class="mt-10 text-black text-sm">-->
    <!--        <div class="mt-5 mb-2 text-black ir-bold">عکس کارت ملی کاربر</div>-->
    <!--        <div class="w-64 h-64 mx-auto my-5 shadow-lg rounded-lg">-->
    <!--        <img @click="setLight(user.profile.national_card.path)" class="w-64 h-64 rounded-lg" v-if="user.profile.national_card" :src="user.profile.national_card.path"/>-->
    <!--          <div v-else class="my-auto ir-bold text-center">عکس کارت ملی نداره</div>-->
    <!--        </div>-->
    <!--        <div class="flex justify-center">-->
    <!--          <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 'n')">تایید عکس کارت ملی</div>-->
    <!--          <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false, 'n')">رد کردن عکس کارت ملی</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <div class="mt-10 text-black text-sm">
      <div class="mt-5 mb-2 text-black ir-bold">لیست نمونه کارها</div>
      <div v-for="(i , n) in getUserPortfolios" :key="n">
        <div class="w-64 h-64 mx-auto my-5 shadow-lg rounded-lg">
          <nuxt-link :to="`/portfolios/${i.id}`" v-if="i.images[0]" class="mx-1 hidden md:flex">
            <img alt="portfolio" class="w-64 h-64 rounded-lg" :src="i.images[0].path"/>
          </nuxt-link>
          <!--        <img @click="setLight" class="w-64 h-64 rounded-lg" v-if="i.images[0]" :src="i.images[0].path"/>-->
        </div>
        <div class="my-5 text-black ir-bold text-center">{{ i.title }}</div>
        <div class="flex justify-center">
          <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white" @click="accept(true, 'p', i.id)">تایید
            نمونه کار
          </div>
          <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white" @click="accept(false, 'p', i.id)">رد کردن نمونه
            کار
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "virifiUser",
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      status: '1',
      showLightBox: false,
      media: []
    }
  },
  methods: {
    setLight(path) {
      this.media = [{
        thumb: path,
        src: path
      }];
      this.showLightBox = true;
    },
    closeLightBox() {
      this.media = [];
      this.showLightBox = false;
    },
    accept(accepted, type, id) {
      switch (type) {
        case 's':
          this.$store.dispatch('userAdmin/acceptSheba', {
            id: this.$route.params.id, accepted
          })
            .then(res => {
              this.$swal('تایید شماره شبا', {
                icon: 'success'
              });
            })
            .catch(err => {
              this.$swal('عدم تایید شماره شبا', {
                icon: 'cancel'
              });
            })
          break
        case 'a':
          this.$store.dispatch('userAdmin/acceptAvatar', {
            id: this.$route.params.id, accepted
          })
            .then(res => {
              this.$swal('تایید عکس پروفایل', {
                icon: 'success'
              });
            })
            .catch(err => {
              this.$swal(' عدم تایید عکس پروفایل', {
                icon: 'cancel'
              });
            })
          break
        case 'b':
          this.$store.dispatch('userAdmin/acceptBackgroud', {
            id: this.$route.params.id, accepted
          })
            .then(res => {
              this.$swal('تایید پس زمینه', {
                icon: 'success'
              });
            })
            .catch(err => {
              this.$swal('عدم تایید پس زمینه', {
                icon: 'cancel'
              });
            })
          break
        case 'n':
          this.$store.dispatch('userAdmin/acceptNationalCard', {
            id: this.$route.params.id, accepted
          })
            .then(res => {
              this.$swal('تایید شد', {
                icon: 'success'
              });
            })
            .catch(err => {
              this.$swal('عدم تایید پرداخت', {
                icon: 'cancel'
              });
            })
          break
        case 'p':
          this.$store.dispatch('userAdmin/acceptPortfolios', {
            id, accepted
          })
            .then(res => {
              this.$swal('تایید شد', {
                icon: 'success'
              });
            })
            .catch(err => {
              this.$swal('عدم تایید پرداخت', {
                icon: 'cancel'
              });
            })
          break
      }
    }
  },
  async asyncData({store, params}) {
    let user = null
    await store.dispatch('userAdmin/user', params.id)
      .then(res => {
        user = res
      })
    console.log(user, 'u')
    return {user}
  },
  computed: {
    getUserPortfolios() {
      return this.$store.getters['userAdmin/getUserPortfolios']
    }
  },
  mounted() {
    this.$store.dispatch('userAdmin/getUserPortfolios', this.$route.params.id)
  }

}
</script>
