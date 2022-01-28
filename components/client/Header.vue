<template>
  <div>
    <div class="hidden sm:block">
      <div class="container">
        <div class="flex justify-between items-center">
          <nuxt-link to="/"><img src="/images/logo.png" class="m-auto"/></nuxt-link>
          <div class="ml-20 mr-10 flex  justify-evenly">
            <nuxt-link to="/" class="text-black ir-medium hover:text-purple-600" style="opacity: 0.8">صفحه اصلی
            </nuxt-link>
            <nuxt-link to="/Projects" class="text-black ir-medium hover:text-purple-600" style="opacity: 0.8">لیست پروژه
              ها
            </nuxt-link>
            <nuxt-link to="/" class="text-black ir-medium hover:text-purple-600" style="opacity: 0.8">مسابقه ها
            </nuxt-link>
            <nuxt-link to="/" class="text-black ir-medium hover:text-purple-600" style="opacity: 0.8">سوالات متداول
            </nuxt-link>
            <nuxt-link to="/" class="text-purple-600 ir-medium" style="opacity: 0.8">چطور پروژه ایجاد کنم؟</nuxt-link>
          </div>
          <div>
            <div class="py-2  border-2 rounded-lg border-16 border-purple-600 flex justify-between"
                 style="max-width: 144px" v-if="user">
              <nuxt-link to="/dashboard"
                         class="px-5 text-black text-purple-600 border-l-1	border-purple-600 ir-medium text-sm border-l-2 border-purple-600">
                داشبورد
              </nuxt-link>
            </div>
            <div class="py-2  border-2 rounded-lg border-16 border-purple-600 flex justify-between"
                 style="max-width: 144px" v-else>
              <nuxt-link to="/auth/Log-in"
                         class="px-5 text-black text-purple-600 border-l-1	border-purple-600 ir-medium text-sm border-l-2 border-purple-600">
                ورود
              </nuxt-link>
              <nuxt-link to="/auth/Register" class="pl-3 pr-2 text-black text-purple-600 ir-medium text-sm">ثبت نام
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="smallSize flex justify-between ">
        <div>
          <div class="flex items-center absolute">
            <div @click="sidebar = true"
                 class="flex items-center justify-center hover:opacity-75 cursor-pointer">
              <img src="/images/bars-solid.svg" class="w-8 h-8 "/>
              <!--            <i class="fas fa-bars" ></i>-->
            </div>
          </div>
          <div v-if="sidebar === true" @click="sidebar = false"
               class="fixed inset-0  w-full h-full bg-black opacity-0"></div>
          <div v-if="sidebar === true" class="w-64 m-10 fixed top-0  right-0  bg-white shadow-lg z-50">
            <div class="p-5 flex flex-col">
              <NuxtLink to="/" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm  ir-bold">صفحه
                اصلی
              </NuxtLink>
              <NuxtLink to="/Projects" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm ir-bold">
                لیست پروژه ها
              </NuxtLink>
              <NuxtLink to="/" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm ir-bold">مسابقات
              </NuxtLink>
              <NuxtLink to="/" class="mb-2  border-b-2 border-gray-200 px-5 py-3 text-black text-sm ir-bold">سوالات
                متداول
              </NuxtLink>
              <NuxtLink to="/" class="mb-2  px-5 py-3 text-black text-sm ir-bold">چطور پروژه ایجا کنم؟</NuxtLink>
              <div class="py-2 mx-auto  border-2 rounded-lg border-16 border-purple-600 flex justify-between"
                   style="max-width: 144px">
                <nuxt-link to="/auth/Log-in"
                           class="px-5 text-black text-purple-600 border-l-1	border-purple-600 ir-medium text-sm border-l-2 border-purple-600">
                  ورود
                </nuxt-link>
                <nuxt-link to="/auth/Register" class="pl-3 pr-2 text-black text-purple-600 ir-medium text-sm">ثبت نام
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <img src="/images/logo.png"/>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      sidebar: false,
      show: false,
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
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('user/exit')
    }
  }
}
</script>

<style scoped>
.smallSize {
  visibility: hidden;
}

@media (max-width: 600px) {
  .smallSize {
    visibility: visible;
  }
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}
</style>
