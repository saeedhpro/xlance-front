<template>
    <div v-if="project">
      <modal name="changeStatus" style="direction: ltr" v-if="!isFreelancer">
        <div class="mt-10 ir-bold text-center">تغییر وضعیت پروژه</div>
        <img src="/images/Path146.png" class="mx-auto my-3 ">
        <div class="text-center">آیا از تغییر وضعیت این پروژه به «انجام شد» اطمینان دارید؟</div>
        <div class="my-5 flex flex-wrap justify-center">
          <div class="p-2 w-64 m-1 md:mr-auto text-center shadow-lg border-solid border-2 border-greenFreelancer bg-greenFreelancer text-white rounded-lg click" @click="openModalSend">بله تغییر بده</div>
          <div class="p-2 w-64 m-1 md:ml-auto text-center text-center md:mr-auto rounded-lg border-solid border-2 border-greenFreelancer text-greenFreelancer click" @click="closeModal">خیر</div>
        </div>
      </modal>
      <modal name="sendComment" style="direction: ltr" v-if="!isFreelancer">
        <div class="p-10 border-solid border-2 border-green1 bg-greenKam">
        <div>نظر و رتبه</div>
        <div class="my-2 text-gray-600 text-sm">فریلنسر را چطور ارزیابی می‌کنید؟</div>
        <div class="pb-3 border-b-2 border-gray-400 text-gray-600 text-sm">
           این امتیاز دهی با فریلنسر به اشتراک گذاشته خواهد شد و در پروفایل فریلنسر نمایش داده می‌شود
        </div>
          <rating-component :value="comment.rate" :maxStars="5" :hasCounter="true" @input="rated" class="my-3 mt-5" />
          <textarea type="text" class="w-full h-20 my-3  border-solid border-2 border-gray-400 rounded-lg" v-model="comment.description"></textarea>
          <div class="w-32 p-3 mr-auto text-center rounded-lg bg-greenFreelancer text-white shadow-lg click" @click="description">ثبت نظر</div>
        </div>
      </modal>
      <modal name="despute" style="direction: ltr">
        <div class="p-10">
        <div class="ir-bold text-right">متوقف کردن پروژه</div>
        <div class="my-3 ir-light">
          وضعیت این پروژه به عنوان مورد اختلاف مشخص می شود و پرونده شما به زودی توسط مدیر بررسی خواهد شد.
          <br/>
          لطفا مدارک و بیانیه ای را برای توضیح اینکه چرا شما پروژه را ترک کردید، ارائه دهید.
          <br/>
          <br/>
          <br/>
          میزکار هنوز برای شما در دسترس خواهد بود تا در صورت نیاز از آن استفاده نمائید.
        </div>
        <div class="ir-medium">لطفا دلیل خود را از ترک پروژه به طور کامل توضیح دهید:</div>
        <textarea class="w-full my-3 border-solid border-2 border-gray-300 rounded-lg" v-model="title"></textarea>
        <div class="flex" style="align-items: center;">
          <div class="ml-2 px-3 py-1 border-solid border-2 border-greenFreelancer rounded-lg text-greenFreelancer click" @click="desputedProject">متوقف ساختن</div>
          <div @click="closeDespute" class="click">لغو</div>
        </div>
        </div>
      </modal>
<!--      freelancer-->
      <modal name="payment" style="direction: ltr">
        <div class="p-10">
        <div class="my-10 justify-between items-center" v-for="(p,i) in new_secure_payments" :key="i">
          <div class="lg:w-1/3 flex items-center">
            <div class="p-2 px-4 w-10 h-10 bg-gray-200 rounded-full">{{ i + 1}}</div>
            <div class="sm:mx-5 mx-2 text-gray-600">مبلغ</div>
            <input type="text" v-model="p.price" class="h-10 w-72 px-3 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light">
          </div>
          <div class="w-full lg:my-0 mmt-10 mr-10 flex items-center">
            <div class="mx-5 mt-3 text-gray-600">بابت</div>
            <input type="text" v-model="p.title" class="h-10 mt-3 ml-2  w-full px-3 border-solid border-2 border-gray-400 rounded-lg bg-gray-100 text-black ir-light">
          </div>
        </div>
        <div class="my-10 pb-10 flex flex-wrap justify-between items-center border-b-2 border-gray-600">
          <div class="text-sm text-gray-600">مجموع درخواست پرداخت امن: <span class="ir-bold">{{sumPrice.toLocaleString() | toPersianNumber}}</span> ریال</div>
          <div>
            <div class="p-2 px-3 w-1/8 border-greentype rounded-lg border-solid border-2 text-greentype flex" style="max-width: 250px">
              <div>
                <i class="fal fa-plus-circle "></i>
              </div>
              <div class="mr-2 click" @click="addPaymentRow">ایجاد درخواست پرداخت امن</div>
            </div>
          </div>
        </div>
          <div class="w-32 p-3 mr-auto text-center rounded-lg bg-greenFreelancer text-white shadow-lg click" @click="paymentSend">ثبت</div>
        </div>
      </modal>
      <div class="flex flex-wrap justify-between">
        <div class="md:w-4/5 w-full">
          <div class="px-3 py-2 mb-5 border-2 border-solid border-greenFreelancer
      rounded-lg bg-greenKam flex justify-between align-center"
               style="max-width:760px;align-items: center;"
          v-if="showFinishBox && !isFreelancer">
            <div class="py-3 pl-5 text-sm ir-light" v-if="isFinished">به نظر می‌رسد این پروژه انجام شده است! وضعیت پروژه را به انجام شد تغییر دهید تا بتوانید برای یکدیگر رتبه و نظر ارسال کنید</div>
            <div class="py-3 pl-5 text-sm ir-light" v-else>پروژه در حال انجام می باشد.</div>
            <div>
              <div @click="sendDespute" class="click underline">ایجاد حل اختلاف</div>
            <div class="w-32 p-2 px-5 text-center shadow-lg border-solid border-2 border-greenFreelancer bg-greenFreelancer text-white rounded-lg click" @click="openModal" v-if="isFinished" >انجام شد</div>
          </div>
          </div>
          <div class="px-3 py-2 mb-5 border-2 border-solid border-greenFreelancer
      rounded-lg bg-greenKam flex justify-between align-center"
               style="max-width:760px;display: flex;
    align-items: center;"
               v-if="showFinishBox && isFreelancer"
          >
            <button class="w-32 h-10 px-5 text-center shadow-lg border-solid border-2 border-greenFreelancer bg-greenFreelancer text-white rounded-lg click" @click="deleteProjectFreelancer(project.id)">لغو پروژه</button>
            <div>
              <div @click="sendDespute" class="click underline">ایجاد حل اختلاف</div>
              <div class="w-32 p-2 px-5 text-center shadow-lg border-solid border-2 border-greenFreelancer bg-greenFreelancer text-white rounded-lg click" @click="openModal" v-if="isFinished && !isFreelancer" >انجام شد</div>
            </div>
          </div>
          <div class="p-5 mb-5 sm:ml-20 bg-gray-300 rounded-lg" v-if="showPayment===true">
            <div class="ir-medium">درخواست پرداخت امن</div>
            <div class="pb-2 my-5 border-b-2 border-gray-400" v-for="(i , p ) in getpeymentEmployer" :key="p">
              <div class=" flex justify-between">
                <div class="text-gray-700 text-lg ">{{i.title}}</div>
                <div class="text-gray-700 text-lg ir-medium">
                  <span class="ir-medium text-black">{{i.price.toLocaleString() | toPersianNumber }}</span>
                  <span class="text-sm">ریال</span>
                </div>
              </div>
              <div class="flex justify-end">
                <div class="my-2 w-20 text-center rounded-lg border-solid border-2 border-greenFreelancer text-greenFreelancer click" @click="acceptPayment(i.id ,true)" >ثبت</div>
                <div class="my-2 w-20 text-center mr-2 rounded-lg border-solid border-2 border-greenFreelancer text-greenFreelancer click"  @click="acceptPayment(i.id ,false)">لغو</div>
              </div>
            </div>
          </div>
        <div class="flex flex-wrap justify-space-between">
        <div>
          <div class="flex items-center">
            <div v-if="project.freelancer.profile.avatar">
              <img :src="project.freelancer.profile.avatar.path"  class="w-12 h-12 rounded-full">
            </div>
            <div v-else>
              <img src="/images/Logo.png"  class="w-12 h-12 rounded-full">
            </div>
            <div class="mr-4">
              <nuxt-link :to="`/profiles/${project.freelancer.id}`" class="ir-medium text-lg text-gray-600" v-if="project.freelancer">{{project.freelancer.username}}</nuxt-link>
              <rating-component :value="project.freelancer.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
              <div class="text-gray-600 text-sm">
                <span class="mx-1 ir-medium">{{project.selected_request.price.toLocaleString() | toPersianNumber}}</span>ریال
            در <span class="mx-1 ir-medium">{{project.selected_request.delivery_date | toPersianNumber}}</span>روز
            </div>
            </div>
          </div>
          <div class="w-32 px-3 py-1 mt-5 mb-3 rounded-lg border-solid border-2 border-greenFreelancer text-greenFreelancer flex items-center" v-if="project.status == 'finished'">
            <i class="fad fa-check"></i>
            <span class="mr-2 ">انجام شده</span>
          </div>
          <div class="w-32 px-3 py-1 mt-5 mb-3  rounded-lg border-solid border-2 border-gray-500 text-gray-500 flex items-center text-sm" v-else>
            <i class="fad fa-spinner"></i>
            <span class="mr-2 ">در دست اقدام</span>
          </div>
        </div>
        <div class="mx-auto">
          <div class="px-5 py-3 border-2 flex border-solid border-gray-400 rounded-lg">
            <div class="px-10 border-l-2 border-gray-400">
              <div class="border-gray-600 text-gray-500"><span class="mx-1 text-black">{{project.selected_request.delivery_date | toPersianNumber}}</span>روز</div>
              <div class="mt-3 text-gray-500">کل زمان</div>
            </div>
              <div class="px-10">
                <div class="border-gray-600 text-gray-500"><span class="mx-1 text-black">{{project.request_select_date | toPersianNumber}}</span>روز</div>
                <div class="mt-3 text-gray-500">گذشته</div>
              </div>
          </div>
          <div class="mt-5 p-3 border-solid border-2 border-pink-200 bg-white rounded-lg shadow-lg text-center " v-if="project.cancel_request && !isFreelancer">
            <div >
              <div class="mb-2 ir-bold">فریلنسر درخواست لغو پروژه را دارد</div>
              <div class="flex justify-center">
              <div class="my-2 w-32 text-sm text-center rounded-lg border-solid border-2 border-pink-200 text-pink-200 click" @click="deleteProjectEmployer(project.id , false)">رد درخواست</div>
              <div class="my-2 w-32 text-sm text-center mr-2 rounded-lg border-solid border-2 border-pink-200 text-pink-200 click" @click="deleteProjectEmployer(project.id , true)">تایید درخواست</div>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="my-10 text-center text-white">
              <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="openModalPayment" >درخواست پرداخت امن</button>
            </div>
            <div class="w-10 h-10 px-2 py-2 mr-3 rounded-lg text-greentype border-solid border-2 border-greentype" @click="showFinishBox=!showFinishBox">
              <i class="far fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div class="md:w-1/5 w-full">
        <nuxt-link to="/messages" class="px-10 w-64 py-1 text-center rounded-lg text-greentype border-solid border-2 border-greentype items-center">
          <i class="fal fa-comment-alt-dots"></i>
          <span class="mr-2"> گفتگو</span>
        </nuxt-link>


<!--          comment Employer-->
          <div class="mt-10" v-if="project.employer_rate ">
          <div class="employerSuggest">
            <div class="flex justify-center" style="align-items: center;">
<div>
              <div v-if="project.employer_rate.rater.profile.avatar">
                <img :src="project.employer_rate.rater.profile.avatar.path"  class="w-20 h-20 rounded-full">
              </div>
              <div v-else>
                <img src="/images/Logo.png"  class="w-20 h-20 rounded-full" alt="">
              </div>
</div>
              <div class="mr-1 text-gray-600 ">
                نظر کارفرما درباره ی فریلنسر
              </div>
            </div>
            <div class="my-5 flex justify-between align-center">
              <div class="text-gray-700 ir-light text-sm">امتیاز کارفرما به فریلنسر</div>
              <div>
                <rating-component :value="project.employer_rate.rate" :maxStars="5" :hasCounter="true" class="rate_size hover:none" :dis="true"/>
              </div>
            </div>

            <div class="text-gray-700">{{project.employer_rate.description}}</div>

          </div>
          </div>

<!--          endCommentEmployer-->

        </div>
      </div>
      <div class="mt-10  flex flex-wrap justify-between">
      <div class="bg-white rounded-lg shadow-lg w-full sm:w-2/3 over-sm">
      <div class="px-3 py-3 w-sm">
        <div class="border-b-2 border-gray-300 justify-between">
          <div class="w-56 pb-4 text-md text-black border-b-4 border-greenFreelancer ir-medium">مدیریت پرداخت های امن</div>
        </div>
        <div class="mt-5 py-2 px-6 flex bg-gray-300 justify-between rounded-lg">
          <div class="text-gray-600">توضیحات</div>
          <div class=" text-gray-600">مبلغ</div>
          <div class="text-gray-600">کاربر</div>
          <div class="text-gray-600">وضعیت</div>
          <div class="text-gray-600">عملیات</div>
        </div>
        <div class="my-8 pl-6 px-3 flex justify-between" v-for="(i , n) in SecurePayment">
          <div class="w-20 text-black text-sm">{{i.title}}</div>
          <div class="w-15 text-black text-sm">
            {{i.price.toLocaleString() | toPersianNumber}}
            <span style="font-size: 10px">ریال</span>
            </div>
          <div class="w-15 text-black text-sm">{{i.user.username}}</div>
          <div class="w-15 text-black text-sm">{{getStatus(i.status)  }}</div>
          <div class="w-12 text-black text-sm">
            <div class="click" v-if="isFreelancer && i.status !== 'payed' && i.status !== 'free' " @click="deletePayment(i.id)">حذف</div>
            <div v-else class="ml-3">
            <div class="w-20 p-3 mr-auto text-center rounded-lg bg-greenFreelancer text-white  click" v-if="i.status == 'accepted' && !isFreelancer " @click="paymentEmployer(i.id)">پرداخت</div>
            <div class="w-20 p-3 mr-auto text-center rounded-lg bg-purple-600 text-white  click" v-if="i.status == 'payed' && !isFreelancer" @click="openPayment(i.id)">آزادسازی</div>
            <div class="w-20 px-1 py-1 mr-auto ml-2 text-center rounded-lg bg-greenFreelancer text-white " v-if="i.status == 'free'">آزاد شده</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <client-only>
        <vue-snotify></vue-snotify>
      </client-only>
    </div>
</template>
<script>
    import RatingComponent from "../../RatingComponent";
    export default {
        name: "Desk",
        components: {RatingComponent},
        data(){
            return{
                rating:4,
                status:1,
                title:null,
                showPayment:false,
                showFinishBox:false,
                showPopUpFinished:false,
                showRatingBox:false,
                open:true,
                new_secure_payments:[],
                comment:{
                    description:null,
                    rate:0
                }
            }
        },
       mounted(){
                this.$store.dispatch('project/getDescriptionProject', this.$route.params.id)
                this.$store.dispatch('project/SecurePayment', this.$route.params.id)
                this.$store.dispatch('project/getpeymentEmployer', this.$route.params.id)
                },
        computed:{
            project(){
                return this.$store.getters['project/getDescriptionProject']
            },
            logInUser(){
                return this.$store.getters['user/user']
            },
            SecurePayment(){
                return this.$store.getters['project/SecurePayment']
            },
            isFinished(){
                return this.project.request_select_date >=this.project.selected_request.delivery_date
            },
            sumPrice() {
                let sumPrice = 0;
                this.new_secure_payments.forEach((p) => {
                    sumPrice += parseInt(p.price);
                });
                return sumPrice;
            },
            getpeymentEmployer(){
                return this.$store.getters['project/getpeymentEmployer']
            },
            isFreelancer(){
                return this.project && this.logInUser && this.logInUser.id ==  this.project.freelancer.id
            }
        },
        methods:{
            removePayment(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('project/removePayment',id)
                                .then(res => {
                                    this.$snotify.success('با موفقیت حذف شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                })
                        }
                    })
            },
          getStatus(i){
              if(i === 'accepted'){
                return "تایید شده"
              }
              else if(i === 'payed'){
                return "پرداخت شده"
              }
              else if(i === 'free'){
                return "آزاد شده"
              }

          },
            openModal(){
                this.$modal.show('changeStatus')
            },
            closeModal(){
                this.$modal.hide('changeStatus')
            },
            openModalPayment(){
                if(this.isFreelancer){
                    this.$modal.show('payment')
                }
                else {
                    this.showPayment= true
                }
            },
            sendDespute(){
                this.$modal.show('despute')
            },
            closeDespute(){
                this.$modal.hide('despute')
            },
            closeModalPayment(){
                this.$modal.hide('payment')
            },
            openModalSend(){
                this.$store.dispatch('project/finishProject' , this.project.id)
                    .then(res=>{
                        this.$modal.hide('changeStatus')
                        this.$modal.show('sendComment')
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
            rated(rate){
                this.comment.rate = rate;
            },
            addPaymentRow(){
                this.new_secure_payments.push({
                    price: 0,
                    description: null,
                })

            },
            paymentSend() {
                const data = {
                    new_secure_payments :this.new_secure_payments,
                    id: this.$route.params.id
                }
                this.$store.dispatch('project/paymentSend', data)
                    .then(res=>{
                        this.$snotify.success('پیشنهاد پرداخت امن شما با موفقیت ثبت شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                        this.$modal.hide('payment')
                    })
                  .catch(async err=>{
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
            acceptPayment(id, accepted){
                const data = {
                    id:id,
                    accepted :accepted
                }
                this.$store.dispatch('project/acceptPayment' ,data)
                    .then(res=>{
                        this.$snotify.success('با موفقیت انجام شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                      this.$router.go(0)
                    })

            },
            deletePayment(id){
                this.$store.dispatch('project/deletePayment' , id )
                    .then(res=>{
                        this.$snotify.success('با موفقیت حذف شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                    })
                    .catch(async err=>{
                        const keys = Object.keys(err.response.data.errors);
                        for (let i = 0; i < keys.length; i++){
                            for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                                this.message = err.response.data.errors[keys[i]][j];
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
            paymentEmployer(id){
                this.$store.dispatch('project/paymentEmployer' , id )
                    .then(res=>{
                        if(res.action)
                        { window.location.href = res.action }
                        else {
                          this.$snotify.success('پرداخت با موفقیت انجام شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                          })
                          this.$router.go(0)
                        }
                    })
            },
            openPayment(id){
                this.$store.dispatch('project/paymentEmployerFree' , id)
                    .then(res=>{
                        this.$snotify.success('آزاد سازی پرداخت امن با موفقیت انجام شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                      this.$router.go(0)
                    })
            },
            description(){
                const data={
                    id :this.project.id,
                    comment:this.comment
                };
                this.$store.dispatch('project/description' , data)
                    .then(() => {
                        this.$router.go(0)
                    })
            },
            deleteProjectFreelancer(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('project/deleteProjectFreelancer',id)
                                .then(res => {
                                    this.$snotify.success('پیشنهاد لغو پروژه برای کارفرما ارسال شد !!', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
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


                        }
                    })
            },
            deleteProjectEmployer(id , accepted){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('project/deleteProjectEmployer',{
                                id , accepted
                            })
                                .then(res=>{
                                    if(accepted === true ){
                                        this.$snotify.success('پروژه با موفقیت لغو شد', {
                                            timeout: 2000,
                                            showProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true
                                        })
                                        this.showFinishBox = false
                                        this.$router.replace('/myProject')
                                    }
                                    else
                                    {
                                        this.$snotify.success('درخواست فریلنسر لغو شد', {
                                            timeout: 2000,
                                            showProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true
                                        })
                                        this.showFinishBox = false
                                        this.$router.replace('/myProject')
                                    }
                                    this.showFinishBox = false
                                    this.$router.replace('/myProject')
                                })
                                .catch(async err=>{
                                    const keys = Object.keys(err.response.data.errors);
                                    for (let i = 0; i < keys.length; i++){
                                        for (let j = 0; j < err.response.data.errors[keys[i]].length; j++){
                                            this.message = err.response.data.errors[keys[i]][j];
                                            await this.$snotify.error(err.response.data.errors[keys[i]][j], {
                                                timeout: 2000,
                                                showProgressBar: false,
                                                closeOnClick: false,
                                                pauseOnHover: true
                                            })
                                        }
                                    }
                                })

                        }
                    })
            },
            desputedProject(){
                            this.$store.dispatch('project/desputedProject' , {
                                title : this.title,
                                project_id : this.project.id
                            })
                                .then(res => {
                                    this.$snotify.success('پیام حل اختلاف شما با موفقیت ارسال شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })

                                  setTimeout(() => this.$router.replace('/defferences'),
                                    800)
                                })
                                .catch(async err=>{
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

            }
        }
    }
</script>
<style>
  @media (max-width: 700px) {
    .over-sm{
      overflow-x: scroll
    }
    .w-sm{
      width: 700px
    }
  }
  .employerSuggest{
    width: 320px;
    padding: 5%;
    background: #EEEEEE 0% 0% no-repeat padding-box;
    border-radius: 8px;
    opacity: 1;
  }
</style>
