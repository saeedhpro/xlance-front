<template>
  <div class="relative">
    <div class="flex items-center absolute ">
      <div @click="sidebar = true"
           class="p-3 flex items-center justify-center hover:opacity-75 cursor-pointer">
        <i class="fal fa-bars text-xl -mt-1"></i>
      </div>
    </div>

    <div v-if="sidebar === true" @click="sidebar = false" class="fixed inset-0  w-full h-full bg-black opacity-0"></div>
    <div v-if="sidebar === true" class="w-64 h-full fixed  right-0 inset-y-28  bg-white shadow-lg z-50"
         style="margin-top: 49px;overflow-y: scroll">
      <div class="py-5 px-3 bg-purple-100 text-center">
        <div class="flex justify-between">
          <img :src="user.profile.avatar_accepted ? user.profile.avatar.path :
             'images/logo.png'"
               v-if="user.profile" class="rounded-full" style="width: 64px;
height: 64px;"/>
          <!--          <img src="../../static/images/logo.png" v-else class="w-12 h-12"/>-->

          <div>
            <div class="py-1 px-1 bg-purple-600 rounded-lg text-white ir-light">کاربر
              {{ user.package ? user.package.plan.title : 'عادی' }}
            </div>
            <div class="mt-3 ir-medium text-black">{{ user.username }}</div>
          </div>
        </div>

        <div class="my-5 text-black text-sm">
          <span class="ir-light">  پیشنهاد های باقی مانده :</span>
          <span class="ir-bold">{{ user.number - user.requests_count  | toPersianNumber }}</span>
          /
          {{ user.number | toPersianNumber }}
        </div>

        <nuxt-link to="/membership-upgrade"
                   class=" px-2 border-2 border-solid rounded-lg border-purple-600 text-purple-600">ارتقا عضویت
        </nuxt-link>
      </div>
      <div class=" flex flex-col">
        <v-card class="mx-auto px-1 w-full shadow-none rounded-none">
          <v-list>
            <v-list-group
              :value="false"
              class="px-4 border-b-2 border-gray-200">
              <template v-slot:activator>
                <!--                <i class="fal fa-user"></i>-->
                <img src="../../static/images/grid.svg"/>

                <v-list-item-title class="mr-3">داشبورد</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/dashboard" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">پنل
                    کاربری
                  </NuxtLink>
                  <NuxtLink to="/myProject" class="mb-2 border-b-2 border-gray-200 px-5 py-3 text-black text-sm">پروژه
                    های من
                  </NuxtLink>
                  <NuxtLink to="/defferences" class="mb-2 border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    اختلاف های من
                  </NuxtLink>
                  <NuxtLink to="/announcements" class="mb-2 border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    اعلانات
                  </NuxtLink>
                  <NuxtLink to="/messages" class="mb-2 border-b-2 border-gray-200 px-5 py-3 text-black text-sm">پیام
                    ها
                  </NuxtLink>
                  <NuxtLink to="/socialMedia" class="mb-2  px-5 py-3 text-black text-sm">شبکه اجتماعی</NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <v-list-group
              :value="false"
              class="px-4 border-b-2 border-gray-200"
            >
              <template v-slot:activator>
                <!--                <img src="../../static/images/user.svg" class="w-4"/>-->
                <!--                <i class="fal fa-user-circle"></i>-->
                <img src="../../static/images/usernavbar.svg"/>
                <v-list-item-title class="mr-3">حساب کاربری</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/account" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">حساب
                    کاربری
                  </NuxtLink>
                  <NuxtLink to="/picture"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    تصاویر کاربری
                  </NuxtLink>
                  <NuxtLink to="/skills"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    مهارت ها
                  </NuxtLink>
                  <NuxtLink to="/portfolios"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    نمونه کارها
                  </NuxtLink>
                  <NuxtLink to="/cv"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    رزومه
                  </NuxtLink>
                  <NuxtLink to="/password"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm ">
                    رمز عبور
                  </NuxtLink>
                  <NuxtLink to="/account-setting" class="mb-2 px-5 py-3 text-black text-sm ">شماره شبا بانکی</NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <v-list-group
              :value="false"
              class="px-4 border-b-2 border-gray-200 text-sm"
            >
              <template v-slot:activator>
                <!--                <i class="far fa-wallet"></i>-->
                <img src="../../static/images/walletnav.svg"/>
                <v-list-item-title class="mr-3">کیف پول</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/wallet" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">کیف پول
                  </NuxtLink>
                  <NuxtLink to="/increaseInventory"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    افزایش موجودی
                  </NuxtLink>
                  <NuxtLink to="/harvest"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    برداشت
                  </NuxtLink>
                  <NuxtLink to="/records" class="mb-2 px-5 py-3 text-black text-sm px-5 py-3 text-black text-sm">سوابق
                  </NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <nuxt-link to="/freelancer"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <!--              <i class="far fa-users "></i>-->
              <img src="../../static/images/usersnav.svg"/>
              <div class="mr-3">فریلنسرها</div>
            </nuxt-link>
          </v-list>
          <!--          <v-list >-->
          <!--            <nuxt-link to="/" class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">-->
          <!--              <i class="far fa-users "></i>-->
          <!--              <div class="mr-3">پشتیبانی</div>-->
          <!--            </nuxt-link>-->
          <!--          </v-list>-->
          <v-list>
            <nuxt-link to="/"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <!--              <i class="far fa-users "></i>-->
              <img src="../../static/images/help_circle.svg"/>
              <div class="mr-3">راهنما</div>
            </nuxt-link>
          </v-list>
          <!--          <v-list >-->
          <!--            <nuxt-link to="/commercialLevel" class="px-5 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">-->
          <!--              <i class="far fa-award"></i>-->
          <!--              <div class="mr-3">حساب کاربری تجاری</div>-->
          <!--            </nuxt-link>-->
          <!--          </v-list>-->
          <v-list>
            <div class="px-5 flex text items-center text-gray-900 ir-light" style="cursor: pointer" @click="exit">
              <!--              <i class="far fa-sign-out-alt"></i>-->
              <img src="../../static/images/log_out.svg"/>

              <div class="mr-3">خروج</div>
            </div>
          </v-list>
        </v-card>
        <div class="mx-auto mb-20">
          <div class="my-5">
            <CreateProject/>
          </div>
          <ListProject :user="user"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CreateProject from "./global/CreateProject";
import ListProject from "./global/ListProject";

export default {
  name: "Navbar",
  components: {ListProject, CreateProject},
  data() {
    return {
      sidebar: false,
      show: false,
      typeUser: 'عادی',
      topNumber: '5',
      lessNumber: '0',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],

    }
  },
  methods: {
    async exit() {
      await this.$store.dispatch('user/exit')
      await this.$router.replace('/')
    },
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  }

}
</script>

<style>
.gg:hover {
  background-color: #00C379 !important;
}
</style>
