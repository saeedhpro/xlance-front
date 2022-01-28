<template>
  <div class="container">
    <div v-for="i in items">
      <div class="p-5 bg-white rounded-lg" >
        <div class="flex flex-wrap justify-between">
          <div class="ir-medium text-2xl">{{i.name}}</div>
          <div class="text-gray-600 text-lg">
            <span class="ir-bold text-black">{{i.number}}</span>
            پیشنهاد داده شده
          </div>
        </div>
        <div class="my-5 flex flex-wrap justify-between text-sm">
          <div class="flex">
            <!--            <div>fooooooooory</div>-->
            <div class="text-gray-600">
              ایجاد شده توسط
              <span class="text-greenFreelancer">{{i.personName}}</span>
            </div>
          </div>
          <div class="text-gray-600">
            <span class="mx-1 ir-bold">{{i.day}}روز</span>و
            <span class="mx-1 ir-bold">{{i.hour}}ساعت</span>
            زمان برای ارسال پیشنهاد باقی مانده است
          </div>
        </div>
        <div class="flex flex-wrap justify-between">
          <div>
            <div class="my-2 text-gray-600">بودجه پروژه</div>
            <div class="px-2 py-1 rounded-lg border-dashed border-2 border-gray-500 text-gray-600">
              <span class="mx-2 ir-bold text-black">{{i.lessPrice.toLocaleString()}}</span>-
              <span class="mx-2 ir-bold text-black">{{i.mostPrice.toLocaleString()}}</span>
              <span class="text-sm">ریال</span>
            </div>
          </div>
          <div class="my-10 text-center text-white">
            <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype shadow-xl">ارسال پیشنهاد</button>
          </div>
        </div>
      </div>
    </div>
    <Selectemploye/>
  </div>
</template>

<script>
    import Selectemploye from "../../components/dashboard/employe/Selectemploye";
    export default {
        name: "_id",
        components: {Selectemploye},
        layout:'defaultDash',
        middleware:'auth',
    }
</script>
