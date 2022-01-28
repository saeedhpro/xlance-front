<template>
  <div class="relative">
    <div class="flex items-center absolute ">
      <div @click="sidebar = true"
           class="p-3 flex items-center justify-center hover:opacity-75 cursor-pointer">
        <i class="fal fa-bars text-xl -mt-1"></i>
      </div>
    </div>

    <div v-if="sidebar === true" @click="sidebar = false" class="fixed inset-0  w-full h-full bg-black opacity-0"></div>
    <div v-if="sidebar === true" class="w-56 pb-20 h-full fixed  right-0 inset-y-28  bg-white shadow-lg z-50"
         style="margin-top: 49px;overflow-y: scroll">
      <!--      <div class="py-3 px-3 bg-gray-400 text-center">-->
      <!--        <div class="flex justify-between">-->
      <!--          <img src="/images/Logo.png" class="w-12 h-12"/>-->
      <!--          <div >-->
      <!--            <div class="py-1 px-2 bg-purple-600 rounded-lg text-white">کاربر {{typeUser}}</div>-->
      <!--            <div class="text-black">{{nameUser}}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="my-5 text-black text-sm">-->
      <!--          پیشنهاد های باقی مانده :-->
      <!--          {{topNumber}}-->
      <!--          /{{lessNumber}}-->
      <!--        </div>-->
      <!--        <nuxt-link to="/membership-upgrade" class="py-1 px-2 border-2 border-solid rounded-lg border-purple-600 text-purple-600">ارتقا عضویت</nuxt-link>-->
      <!--      </div>-->
      <div class=" flex flex-col">
        <v-card class="mx-auto px-1 w-full shadow-none rounded-none">
          <v-list>
            <v-list-group
              :value="false"
              class="border-b-2 border-gray-200">
              <template v-slot:activator>
                <v-list-item-title class="mr-3">داشبورد</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/admin/dashboard" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    پنل کاربری
                  </NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <v-list-group
              :value="false"
              class="border-b-2 border-gray-200"
            >
              <template v-slot:activator>
                <v-list-item-title class="mr-3">مقاله ها</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/admin/Article" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    لیست مقاله های ایجاد شده
                  </NuxtLink>
                  <NuxtLink to="/admin/Article/create"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    ایجاد مقاله
                  </NuxtLink>
                  <NuxtLink to="/admin/Article/Category"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    ایجاد و لیست دسته بندی
                  </NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <v-list-group
              :value="false"
              class="border-b-2 border-gray-200 text-sm"
            >
              <template v-slot:activator>
                <v-list-item-title class="mr-3">شبکه های اجتماعی</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/admin/SoclialMediaAdmin/posts"
                            class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">لیست پست ها
                  </NuxtLink>
                  <NuxtLink to="/admin/SoclialMediaAdmin/StoreisList"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    لیست استوری ها
                  </NuxtLink>
                  <NuxtLink to="/admin/SoclialMediaAdmin/CreateStory"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    ایجاد استوری
                  </NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>
          <v-list>
            <v-list-group
              :value="false"
              class="border-b-2 border-gray-200 text-sm"
            >
              <template v-slot:activator>
                <v-list-item-title class="mr-3">مهارت ها</v-list-item-title>
              </template>
              <v-list-item>
                <div class="flex flex-col">
                  <NuxtLink to="/admin/SkillsAdmin"
                            class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm">لیست مهارت ها
                  </NuxtLink>
                  <NuxtLink to="/admin/SkillsAdmin/AddCategory"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    ایجاد دسته بندی جدید
                  </NuxtLink>
                  <NuxtLink to="/admin/SkillsAdmin/create"
                            class="mb-2 px-5 py-3 text-black text-sm border-b-2 border-gray-200 px-5 py-3 text-black text-sm">
                    ایجاد مهارت جدید
                  </NuxtLink>
                </div>
              </v-list-item>

            </v-list-group>
          </v-list>

          <v-list>
            <nuxt-link to="/admin/UsersAdmin"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>لیست کاربران</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/Disputes"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>لیست اختلاف ها</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/Message"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>لیست پیام ها</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/Records"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>سوابق پرداخت</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/MemberShipUpgrade"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>افزودن پکیج ارتقا عضویت</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/ProjectsAdmin"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>لیست پروژه ها</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/ShowRequestWallet"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>لیست پرداخت ها</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/property"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>ویژگی های ساخت پروژه</div>
            </nuxt-link>
          </v-list>
          <v-list>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/PropertySendRequest"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>ویژگی های ارسال درخواست</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <nuxt-link to="/admin/City"
                       class="px-4 h-15 pb-5 pt-3 flex text items-center text-gray-900 ir-light border-b-2 border-gray-200">
              <div>افزودن استان و شهر</div>
            </nuxt-link>
          </v-list>
          <v-list>
            <div class="px-5 flex text items-center text-gray-900 ir-light" style="cursor: pointer" @click="exit">
              <div>خروج</div>
            </div>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "NavbarAdmin",
  data() {
    return {
      sidebar: false,
      show: false,
      typeUser: 'نقره ای',
      nameUser: 'مهتا زنگنه',
      topNumber: '129',
      lessNumber: '87',
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
    }
  }
}
</script>
