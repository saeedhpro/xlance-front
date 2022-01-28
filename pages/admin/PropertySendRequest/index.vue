<template>
  <div class="container">
    <form
      v-if="settings"
      id="app"
      method="post"
      class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
    >
      <div>
        <label for="name">قیمت  ایجاد پروژه</label>
        <input
          id="name"
          v-model="settings.project_price"
          type="number"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div class="my-5">
        <label for="is_sponsered">قیمت اسپانسرشدن فریلنسر</label>
        <input
          id="is_sponsered"
          v-model="settings.sponsored_price"
          type="number"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div>
        <label for="is_special">قیمت متمایز شدن پیشنهاد فریلنسر</label>
        <input
          id="is_special"
          v-model="settings.distinguished_price"
          type="number"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div class="my-10 sm:text-left text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="changeSettings">تغییر قیمت ها </button>
      </div>
    </form>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>

</template>

<script>
    import TableAdmin from "../../../components/admin/TableAdmin";

    export default {
        name: "index",
        components: {TableAdmin},
        layout:'admin',
        middleware:'admin',
        methods:{
            changeSettings(){
                this.$store.dispatch('user/setSettings', {
                    project_price: parseInt(this.settings.project_price),
                    sponsored_price: parseInt(this.settings.sponsored_price),
                    distinguished_price: parseInt(this.settings.distinguished_price)
                })
                    .then(res => {
                        this.$snotify.success('قیمت ها با موفقیت تغییر کرد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                    })
                    .catch(err => {
                        this.$snotify.error('متاسفانه خطایی رخ داده است', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                    })
            }
        },
        data() {
            return {
                settings: null
            }
        },
        async mounted() {
            this.settings = await this.$store.getters['user/getSettings'];
        }
    }
</script>
