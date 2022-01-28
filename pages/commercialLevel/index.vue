<template>
    <div class="container pt-2 pb-10 px-10 bg-white rounded-lg shadow-lg">
      <div class="p-3">
        <div class="pb-2 border-b-2 border-gray-300 justify-between">
          <div class="w-20 pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">سطح تجاری</div>
        </div>
      </div>
      <div class="mt-5 sm:px-20">
        <div class="mx-auto text-greenFreelancer text-5xl text-center">
        <i class="fal fa-medal"></i>
        </div>
        <div class="my-3 ir-medium text-lg text-center">ارتقا حساب به سطح تجاری</div>
        <div class="text-center mx-auto text-gray-700 " style="max-width: 500px">
          با
          <span class="text-greenFreelancer">
            معرفی و ثبت نام حداقل ۱۰ نفر از دوستانتان در ایکس‌لنس،</span>
          حساب کاربری خود را به سطح تجاری ارتقا داده و از مزایای آن بهره‌مند شوید
        </div>
        <div class="my-5 text-right text-lg ir-medium">مزایای سطح تجاری</div>
        <div class="my-2 flex items-center">
          <div>
          <img src="/images/check-square.png"/>
          </div>
          <div class="mr-3 ir-light text-sm">نمایش شماره تماس شما در پروفایلتان</div>
        </div>
        <div class="my-3 flex items-center">
          <div>
          <img src="/images/check-square.png"/>
          </div>
          <div class="mr-3 ir-light text-sm">دریافت نشان تجاری در پروفایلتان</div>
        </div>
        <div class="my-3 flex items-center">
          <div>
          <img src="/images/check-square.png"/>
          </div>
          <div class="mr-3 ir-light text-sm">نمایش شماره تماس شما در پروفایلتان</div>
        </div>
        <div class="my-3 flex items-center">
          <div>
          <img src="/images/check-square.png"/>
          </div>
          <div class="mr-3 ir-light text-sm">دریافت 50 پیشنهاد رایگان</div>
        </div>
        <div class="my-3 flex items-center">
          <div>
          <img src="/images/check-square.png"/>
          </div>
          <div class="mr-3 ir-light text-sm">عدم پرداخت کارمزد در اوین پیشنهاد شما بعد از تجاری شدن حساب</div>
        </div>
        <div class="mb-5 mt-10 ir-medium text-lg"> روش ارتقا حساب به سطح تجاری</div>
        <div class="text-center mx-auto" style="max-width:800px">از دوستانتان بخواهید که در هنگام ثبت نام در ایکس‌لنس، گزینه
          <span class="ir-medium">          «معرف دارم»</span>
          را انتخاب کرده و نام کاربری شما را به عنوان معرف خود وارد نمایند
          <span class="ir-medium">          با معرفی حداقل ۱۰ نفر،</span>
          حساب شما به سطح تجاری ارتقا پیدا می‌کند
        </div>
<div class="mb-10 items-center text-center">
        <div class="mb-5 mt-10 text-gray-700 text-center">نام کاربری شما</div>
        <div type="text" class="h-10  pt-2 w-32 mx-auto  border-gray-600 border-2 border-solid rounded-lg">
          {{user.username}}
        </div>
</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        layout:'defaultDash',
        middleware:'auth',
        data(){
            return{
                status:'1'
            }
        },
        computed:{
            user(){
                return this.$store.getters['user/user']
            }
        },
      head(){
        return {
          title: 'سطح تجاری'
        }
      },
    }
</script>
