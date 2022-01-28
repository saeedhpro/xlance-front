<template>
    <div>
      <div class="my-5 flex">
        <div><img src="/images/art2.png"> </div>
        <div class="mr-5">
          <div class="text-sm text-gray-600 ir-medium">پیشنهادات</div>
        </div>
      </div>
      <div class="p-3 bg-white rounded-lg shadow-lg flex">
        <div class="w-64 flex flex-col">
          <img src="" class="h-20 w-20 rounded-full">
          <div class="my-2 text-black ir-medium">mahta zangene</div>
          <div class="w-32 py-1 px-3 border-2 border-solid border-purple-600 text-purple-600 rounded-lg">انتخاب پیشنهاد</div>
        </div>
        <div class="sm:mr-5">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <v-rating
                v-model="rating"
                background-color="orange lighten-3"
                color="orange"
                small
              ></v-rating>
              <div class="mx-5 text-sm text-gray-600">در 10 روز</div>
              <div class="text-sm text-gray-600">
                12.000.000
                ریال
              </div>
            </div>
            <div class="px-2 bg-gray-200 text-gray-500 text-sm rounded-lg">3 روز پیش</div>
          </div>
          <div class="mt-3 text-gray-600 ir-light">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Suggest",
        data(){
            return{
                rating:4,
            }
        }
    }
</script>

<style scoped>

</style>
