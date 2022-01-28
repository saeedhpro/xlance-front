<template>
    <div class="container my-20 bg-white">
      <div class=" pt-10 px-5">
      <div class="mt-10">
      <button @click="back" class="px-5 py-2 border-solid border-2 border-gray-600 text-gray-600 rounded-lg">
        <i class="far title"></i>
        <span class="mr-3">بازگشت به پنل کابری</span>
      </button>
      </div>
      <div class="my-5 sm:-mt-8 mt-10 ir-medium text-2xl text-center">پیشنهاد پروژه</div>
      <img src="/images/Path146.png" class="m-auto"/>
      <div>
      <div class="my-5 border-b-2 border-gray-500">
        <div class="flex flex-wrap items-end">
          <div>
            <div class="my-3 text-black ir-medium ">پیشنهاد شما</div>
            <input type="text" class="h-10 w-64 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light"
            v-model="request.price"
            >
          </div>
          <div class="mr-10 text-gray-600 text-sm">هزینه خدمات:
            <span class="ir-bold">
              {{(request.price * 0.1).toLocaleString() | toPersianNumber}}
              ریال
            </span>
          </div>
          <div class="mr-10 text-gray-600 text-sm">مبلغ دریافتی شما:
            <span class="ir-bold">
              {{(request.price * 0.9).toLocaleString() | toPersianNumber}}
              ریال
            </span>
          </div>
        </div>
        <div class="my-5">
          <div class="my-3 text-black ir-medium">در مدت زمان</div>
          <input type="numer" class="h-10 w-64 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light" v-model="request.delivery_date">
        </div>
      </div>
        <div class="my-5">
          <div class="ir-medium text-black">پیشنهاد درخواست پرداخت امن ایکس لنس</div>
          <div class="my-3 text-sm text-gray-700">برای هر مرحله از کار، پیشنهاد درخواست پرداخت امن ایجاد کنید. مجموع این درخواست باید با مبلغ پیشنهاد شما برابر باشد (در آینده می‌توانید ویرایش کنید)</div>
        </div>

        <div class="my-10 flex flex-wrap justify-between items-center" v-for="(p,i) in request.new_secure_payments" :key="p">
          <div class="lg:w-1/3 flex items-center">
          <div class="p-2 px-4 w-10 h-10 bg-gray-200 rounded-full">{{ i + 1}}</div>
          <div class="sm:mx-5 mx-2 text-gray-600">مبلغ</div>
          <input type="number" v-model="p.price " class="h-10 w-72 px-3 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light">
          </div>
          <div class="lg:w-2/3 lg:my-0 my-5 flex items-center">
          <div class="mx-5 text-gray-600">بابت</div>
          <input required type="text" v-model="p.title" class="h-10  w-full px-3 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light">
        </div>
        </div>
        <div class="my-10 pb-10 flex flex-wrap justify-between items-center border-b-2 border-gray-600">
          <div class="text-sm text-gray-600">مجموع درخواست پرداخت امن: <span class="ir-bold">{{sumPrice.toLocaleString() | toPersianNumber}}</span> ریال</div>
          <div>
        <div class="p-2 px-3 w-1/8 border-greentype rounded-lg border-solid border-2 text-greentype flex" style="max-width: 250px">
          <div>
            <i class="fal fa-plus-circle "></i>
          </div>
          <div class="mr-2" @click="addPaymentRow">ایجاد درخواست پرداخت امن</div>
        </div>
          </div>
        </div>


        <div class="my-5 pb-10 border-b-2 border-gray-600">
          <div class="ir-medium text-black">توضیحات پیشنهاد</div>
          <div class="my-3 text-sm text-gray-700">توضیحات خود را برای کارفرما بنویسید. این توضیحات فقط برای کارفرما قابل مشاهده خواهد بود</div>
          <textarea type="text" class="w-full h-64 px-3 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light"
          v-model="request.description"></textarea>
        </div>



        <div class="my-5">
        <div class="ir-medium text-black">ویژگی‌های خاص پیشنهاد شما</div>
        <div class="my-3 text-sm text-gray-700">برای پیشنهاد خود ویژگی های خاص تعیین کنید</div>
          <div class="pb-5 " >
            <div class="flex">
              <v-container fluid>
                <v-checkbox v-model="request.is_sponsored">
                  <template v-slot:label>
                    <div class="flex items-center">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <div>اسپانسر <span class="mx-3">-</span> {{settings.sponsored_price | toPersianNumber }} <span class="text-gray-500 text-sm">ریال</span></div>
                        </template>
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </v-container>
            </div>
            <div class="my-1 text-sm ir-light">اسپانسر پیشنهاد خود شوید تا در بالای بقیه پیشنهادها قرار بگیرد</div>
          </div>
          <div class="pb-5 " >
            <div class="flex">
              <v-container fluid>
                <v-checkbox v-model="request.is_distinguished">
                  <template v-slot:label>
                    <div class="flex items-center">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <div>متمایز <span class="mx-3">-</span> {{settings.distinguished_price | toPersianNumber}} <span class="text-gray-500 text-sm">ریال</span></div>
                        </template>
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </v-container>
            </div>
            <div class="my-1 text-sm ir-light">با انتخاب این قسمت رنگ پیشنهاد شما متمایز از سایرین خواهد شد</div>
          </div>
          <div class="my-20">
            <div class="sm:w-1/2 m-auto px-10 border-dashed border-2 border-gray-500 rounded-lg">
              <div class="py-10 border-b-2 border-dashed border-gray-500 flex justify-between">
                <div class="text-gray-700 ir-medium text-lg">موجودی کیف پول شما</div>
                <div class="text-gray-700 "> <span class="ir-medium text-lg" >{{getBalance | toPersianNumber}}</span>
                  ریال</div>
              </div>
              <div class="py-10 flex justify-between">
                <div class="text-gray-700 ir-medium text-lg">هزینه خدمات</div>
                <div class="text-gray-700 "> <span class="ir-medium text-lg">{{calcCost | toPersianNumber}}</span>
                  ریال</div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-10 text-center text-white">
          <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype click" style="padding-top: 6px;" @click="sendSuggest">ارسال پیشنهاد</button>
        </div>
      </div>
    </div>
      <client-only>
        <vue-snotify></vue-snotify>
      </client-only>
    </div>
</template>
<script>
    export default {
        name: "SuggestProjects",
        layout:'empty',
        middleware:'auth',

        data(){
            return{
              request:{
                  title:null,
                  price:null,
                  delivery_date:null,
                  description:null,
                  is_distinguished:false,
                  is_sponsored:false,
                  project_id:null,
                  new_secure_payments:[],
              }
            }
        },
        methods: {
            addPaymentRow(){
                this.request.new_secure_payments.push({
                    price: 0,
                    description: null,
                })
            },
            sendSuggest(){
                this.$store.dispatch('project/suggestProject', {
                    ...this.request,
                    project_id: this.$route.params.id
                })
                  .then(res=>{
                    if(res.action) {
                      window.location.href = res.action;
                    } else {
                      this.$snotify.success('پیشنهاد شما با موفقیت ثبت شد', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                      })
                      setTimeout(() =>
                          this.$router.replace(`/projects/${this.$route.params.id}`),
                        800)
                    }
                  })
                  .catch(async err => {
                    const keys = Object.keys(err.response.data.errors);
                    for (let i = 0; i < keys.length; i++){
                      for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
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
            back() {
                this.$router.back()
            }

        },
        computed: {
            sumPrice() {
                let sumPrice = 0;
                this.request.new_secure_payments.forEach((p) => {
                    sumPrice += parseInt(p.price);
                });
                return sumPrice;
            },
            settings:{
                get(){
                    return this.$store.getters['user/getSettings']
                },
            },
            getBalance() {
                return  this.$store.getters['user/getBalance']
            },
            getSettings(){
                return this.$store.getters['user/getSettings']
            },
            calcCost() {
                let dist_price = this.request.is_distinguished ? parseFloat(this.settings.distinguished_price) || 0 : 0;
                let spons_price = this.request.is_sponsored ? parseFloat(this.settings.sponsored_price) || 0 : 0;
                return parseFloat(spons_price) + parseFloat(dist_price);
            }
        },
    }
</script>
