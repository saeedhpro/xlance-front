<template>
    <div class="container">
      <div class="flex items-center relative">
        <div class="lg:w-1/2 w-full text-right">
          <div class="flex mt-20">
            <div class="mt-1">
              <img src="/images/art2.png"/>
            </div>
            <div class="mr-3">
              <div class="text-black ir-bold text-2xl">تماس با ما</div>
              <div class="my-5 text-sm text-gray-700 text-right">از طریق راه‌های زیر نیز می‌توانید با ما در ارتباط باشید</div>
            </div>
          </div>
          <div class="flex mt-5">
            <i class="fal fa-phone-plus text-gray-600"></i>
            <div class="mr-3 text-sm text-black ir-medium">۰۲۱-۸۸۵۵۹۹۱۲ - ۰۲۱-۴۴۹۹۳۳۱۲</div>
          </div>
          <div class="flex my-5">
            <i class="fal fa-envelope text-gray-600"></i>
            <div class="mr-3 text-sm text-black ir-medium">Info@xlance.ir</div>
          </div>
          <div class="flex my-5">
            <i class="fal fa-map-marker-alt text-gray-600"></i>
            <div class="mr-3 text-sm text-black ir-medium">شهر یک - خیابان دو - کوچه سه - پلاک چهار - واحد پنج</div>
          </div>


        </div>
        <div class="w-1/2 mr-auto hidden  sm:block text-center ">
          <img class="w-64 " src="/images/picContact.png" style="margin: inherit;"/>
        </div>
      </div>
      <div style="margin-top: 200px">
      <div class="flex ">
        <div class="mt-1">
          <img src="/images/art2.png"/>
        </div>
        <div class="mr-3">
          <div class="text-black text-2xl ir-bold">مارا دنبال کنید</div>
        </div>
      </div>
      <div class="my-10 flex flex-wrap justify-between">
        <div class="sm:w-20 w-full px-2 border-2 border-solid border-blue-500 py-2 my-3 sm:my-0 justify-end items-center rounded-lg flex">
          <div class="text-left ml-2 ">
            <div class="text-gray-400">:ID</div>
            <div class="text-black text-lg">xlance</div>
          </div>
          <div>
            <i class="fab fa-twitter text-blue-500 text-4xl	mr-3"></i>
          </div>
        </div>
        <div class="sm:w-20 w-full px-2 border-2 border-solid border-red-300 sm:mr-10 py-2 my-3 sm:my-0  justify-end items-center text-left rounded-lg flex">
          <div class="text-left ml-2 ">
            <div class="text-gray-400">:ID</div>
            <div class="text-black text-lg">xlance</div>
          </div>
          <div>
          <i class="fab fa-instagram text-red-300 text-4xl mr-3"></i>
          </div>
        </div>
        <div class="sm:w-20 w-full px-2 border-2 border-solid border-blue-700 sm:mx-10 py-2 my-3 sm:my-0 justify-end items-center rounded-lg flex">
          <div class="text-left ml-2 ">
            <div class="text-gray-400">:ID</div>
            <div class="text-black text-lg">xlance</div>
          </div>
          <div>
          <i class="fab fa-telegram-plane text-blue-700 text-4xl mr-3"></i>
          </div>
        </div>
        <div class="sm:w-20 w-full px-2  border-2 border-solid border-green-600 py-2 my-3 sm:my-0 justify-end items-center rounded-lg flex">
          <div class="text-left ml-2 ">
            <div class="text-gray-400">:Phone</div>
            <div class="text-black text-lg">xlance</div>
          </div>
          <div>
          <i class="fab fa-whatsapp text-green-600 text-4xl mr-3"></i>
          </div>
        </div>
      </div>
      </div>
      <CallForAdvice/>
    </div>
</template>
<script>
    import CallForAdvice from "../components/client/CallForAdvice";
    export default {
        name: "Contact-us",
        components: {CallForAdvice},
        layout:'rule',
      head(){
        return {
          title: 'تماس با ما'
        }
      },
    }
</script>
