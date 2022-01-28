<template>
  <div class="container py-2 px-10 bg-white rounded-lg shadow-lg">
    <div v-if="user" class="px-3">
    <div class="pb-2 flex border-b-2 border-gray-300">
      <div class="pb-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">رزومه</div>
    </div>
    <div>
      <div class="mt-5 mb-2 text-black text-sm">عنوان و سمت شما در ایکس لنس</div>
      <input type="text" class="lg:w-1/3 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid" :value="user.profile.position" name="position" @input="setPosition">
    </div>
    <div>
      <div class="mt-5 mb-2 text-black text-sm">توضیحات پروفایل</div>
      <div class="mt-2 mb-2 ir-ultraLight text-sm">این متن در بالای صفحه پروفایل شما قرار می‌گیرد. می‌توانید با یک متن جذاب، دیگران را تحت تاثیر قرار دهید</div>
      <input type="text" class="lg:w-1/3 md:w-full sm:w-full p-2 rounded-lg border-gray-500 border-2 border-solid" :value="user.profile.description" name="description" @input="setPosition">
    </div>
      <div>
    <div class="flex my-10">
      <div>
        <img src="/images/art2.png"/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-medium">سوابق کاری</div>
      </div>
    </div>
    <CvList v-for="(c, i) in user.experiences" @delete="deleteExperience(c.id)" :key="i" :id="c.id" :position="c.position" :company="c.company" :from_date="c.from_date" :to_date="c.to_date" :up_to_now="c.up_to_now"/>
    <div class="py-5 px-3 bg-gray-100 rounded-lg flex flex-wrap">
      <div class="sm:border-l-2 sm:pl-2 sm:border-gray-500 lg:w-2/3 sm:w-full md:w-full">
        <div class="flex flex-wrap justify-between -mx-1">
        <div class="sm:w-1/2 w-full px-1">
          <div class="my-2">سمت</div>
          <input v-model="cv.position" type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
        <div class="sm:w-1/2 w-full px-1">
          <div class="my-2">شرکت</div>
          <input v-model="cv.company" type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
        </div>
        <div class="px-1">
          <div class="my-2">توضیحات</div>
          <textarea type="text" class="h-32 w-full border-solid border-2 border-gray-600 rounded-lg bg-white" v-model="cv.description"></textarea>
        </div>
      </div>
      <div class="lg:w-1/3 sm:pr-2 sm:w-full md:w-full">
        <div>
          <div class="my-2">از تاریخ</div>
<!--          <input type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">-->
          <client-only>
          <DateInput @onChange="e => this.cv.from_date = e" :value="cv.from_date"/>
          </client-only>
        </div>
        <div>
          <div class="my-2">تا تاریخ</div>
          <client-only>
            <DateInput @onChange="e => this.cv.to_date = e" :value="cv.to_date"/>
          </client-only>
        </div>
        <div class="flex" style="align-items: center">
          <div class="ml-2">تا به امروز</div>
          <div>
            <ClientOnly>
              <toggle-button v-model="cv.up_to_now"
                             class="my-3"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="mr-auto text-left items-left justify-end">
      <div class="p-2 px-3 w-1/8 mr-auto border-greentype rounded-lg border-solid border-2 text-greentype flex">
        <div>
        <i class="fal fa-plus-circle "></i>
        </div>
        <div class="mr-2 click" @click="addCv">افزودن سابقه</div>
      </div>
      </div>
    </div>
  </div>
      <div>
    <div class="flex my-10">
      <div>
        <img src="/images/art2.png" alt=""/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-medium">سوابق تحصیلی</div>
      </div>
    </div>
    <CvList v-for="(c, i) in user.educations" @delete="deleteEducation(c.id)" :id="c.id" :key="i" :position="c.degree" :company="c.school_name" :from_date="c.from_date" :to_date="c.to_date" :up_to_now="c.up_to_now"/>
    <div class="py-5 px-3 bg-gray-100 rounded-lg flex flex-wrap">
      <div class="sm:border-l-2 sm:pl-2 sm:border-gray-500 lg:w-2/3 sm:w-full md:w-full">
        <div class="flex flex-wrap justify-between -mx-1">
        <div class="w-full px-1">
          <div class="my-2">مدرک</div>
          <input v-model="ev.degree" type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
        </div>
        <div class="mt-4 px-1">
          <div class="my-2">دانشگاه</div>
          <input v-model="ev.school_name" type="text" class=" w-full h-10 border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
      </div>
      <div class="lg:w-1/3 sm:pr-2 sm:w-full md:w-full">
        <div>
          <div class="my-2">از تاریخ</div>
<!--          <input type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">-->
          <client-only>
            <DateInput @onChange="e => this.ev.from_date = e" :value="ev.from_date"/>
          </client-only>
        </div>
        <div>
          <div class="my-2">تا تاریخ</div>
<!--          <input type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">-->
          <client-only>
            <DateInput @onChange="e => this.ev.to_date = e" :value="ev.to_date"/>
          </client-only>
        </div>
        <div class="flex" style="align-items: center">
          <div class="ml-2">تا به امروز</div>
          <div>
          <ClientOnly>
            <toggle-button v-model="ev.up_to_now"
                           class="my-3"
            />
          </ClientOnly>
          </div>
        </div>
      </div>
      <div class="mr-auto text-left items-left justify-end">
      <div class="p-2 px-3 w-1/8 mr-auto border-greentype rounded-lg border-solid border-2 text-greentype flex">
        <div>
        <i class="fal fa-plus-circle "></i>
        </div>
        <div class="mr-2 click" @click="addEv">افزودن سابقه</div>
      </div>
      </div>
    </div>
  </div>
      <div>
    <div class="flex my-10">
      <div>
        <img src="/images/art2.png" alt=""/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-medium">دستاوردها</div>
      </div>
    </div>
    <CvList v-for="(c, i) in user.achievements" @delete="deleteAchievement(c.id)" :id="c.id" :key="i" :position="c.title" :company="c.event_name" :from_date="null" :to_date="null" :up_to_now="null"/>
    <div class="py-5 px-3 bg-gray-100 rounded-lg">
        <div class="flex flex-wrap justify-between -mx-1">
        <div class="sm:w-1/2 w-full px-1">
          <div class="my-2">عنوان</div>
          <input v-model="ac.title" type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
        <div class="sm:w-1/2 w-full px-1">
          <div class="my-2">رویداد</div>
          <input v-model="ac.event_name" type="text" class=" w-full h-10 border-solid border-2 border-gray-600 rounded-lg bg-white">
        </div>
      </div>
      <div class="p-2 px-3 my-10 w-1/8 mr-auto border-greentype rounded-lg border-solid border-2 text-greentype flex" style="width: fit-content;">
        <div>
        <i class="fal fa-plus-circle "></i>
        </div>
        <div class="mr-2 click" @click="addAc">افزودن دستاورد</div>
      </div>
      </div>
  </div>
      <div>
    <div class="flex my-10">
      <div>
        <img src="/images/art2.png" alt=""/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-medium">سایر اطلاعات</div>
      </div>
    </div>
    <div class="py-5 px-3 bg-gray-100 rounded-lg">
        <div class="flex flex-wrap justify-between -mx-1">
        <div class="sm:w-1/3 w-full px-1 sm:border-l-2 sm:border-gray-500">
          <div class="my-2">تاریخ تولد</div>
          <client-only>
            <DateInput @onChange="e => this.birth_date = e" :value="birth_date" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white"/>
          </client-only>
<!--          <input v-model="cv1.birth_date" type="text" class="h-10 w-full border-solid border-2 border-gray-600 rounded-lg bg-white">-->
        </div>
          <div class="sm:w-1/3 sm:px-10 w-full px-1 sm:border-l-2 sm:border-gray-500">
          <div class="my-2">جنسیت</div>
          <div class="flex justify-right">
            <div class="  py-3 px-10 w-32 h-12 text-center text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm"  @click="setGenderMan" :class="{'selectedGreen1' : menuStatus === '2'}">آقا</div>
            <div class=" py-3 px-10 w-32 h-12 text-center  text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm" @click="setGenderWoman" :class="{'selectedGreen1' : menuStatus === '1'}">خانم</div>
          </div>
          </div>
          <div class="sm:w-1/3 sm:px-10 w-full px-1">
          <div class="my-2">وضعیت تاهل</div>
          <div class="flex justify-right">
            <div class="py-3 px-10 w-32 h-12 text-center text-gray-500 border-2 border-gray-500 rounded-lg border-l-2 rounded-tl-none	rounded-bl-none	 border-gray-600 text-sm click"  @click="setSingle" :class="{'selectedGreen1' : menuStatus1 === '2'}">مجرد</div>
            <div class="py-3 px-10 w-32 h-12 text-center  text-gray-500 border-2 border-gray-500 rounded-lg rounded-br-none	rounded-tr-none  text-sm click" @click="setMarried" :class="{'selectedGreen1' : menuStatus1 === '1'}">متاهل</div>
          </div>
          </div>
      </div>
      <div class="w-full mt-5 px-1">
        <div class="my-2">زبان هایی که تسلط دارید</div>
          <div class="text-sm text-gray-500 ir-light">بعد از وارد کردن هر زبان، "اینتر" را کلیک کنید </div>
          <input  type="text" class="w-full sm:w-2/4  h-10 border-solid border-2 border-gray-600 rounded-lg bg-white" @keydown.enter="addLanguage" v-model="language">
          <div class="flex flex-row justify-start pa-3 languages-box">
            <span @click="removeLanguage(l)" v-for="(l,i) in languages" :key="i" class="ir-light m-2 bg-greenFreelancer rounded-2xl click" style="color: #EEEEEE; padding: 8px;">{{l}}</span>
          </div>
        </div>
      </div>
  </div>
      <div class="my-10 text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype" @click="saveCv">
          <span v-if="loadingText">ذخیره رزومه</span>
          <img src="/images/Rolling-1s-200px.svg" v-if="loadingbtn" class="mx-auto w-12 h-8" alt=""/>
        </button>
      </div>
    </div>
    <client-only>
      <vue-snotify></vue-snotify>
    </client-only>
  </div>
</template>

<script>
import CvList from "./CvList";
import DateInput from "./DateInput";
import MultiSelect from "../global/MultiSelect";

export default {

        name: "Cv",
        components: {MultiSelect, CvList,DateInput},
        data () {
            return {
                user: null,
                language: null,
                onchange:false,
                status:'1',
                birth_date: null,
              description:null,
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                modal: false,
                menu2: false,
                up_to_now: false,
                menuStatus:null,
                menuStatus1:null,
                cvList: [],
                evList:[],
                acList:[],
                selected_skills:[],
                languages:[],
              loadingText :true,
              loadingbtn :false,
                cv: {
                    position: null,
                    company:null,
                    description:null,
                    from_date:null,
                    to_date:null,
                    up_to_now:false
                },
                ev:{
                    degree:null,
                    school_name:null,
                    from_date:null,
                    to_date:null,
                    up_to_now:false
                },
                ac:{
                    title:null,
                    event_name:null
                },
                cv1: {
                    position:null,
                    description:null,
                    languages:[],
                    birth_date:null,
                    gender:null,
                    marital_status:null,
                }

            }
        },
        methods: {
          setPosition(e){
            const data = e.target
            // this.user.profile = {
            //   ...this.user.profile , [data.name] : data.value
            // }
            this.setProfile(data)
          },
          setProfile(data){
            this.user.profile = {
              ...this.user.profile , [data.name] : data.value
            }
          },
          addLanguage() {
            const l = this.languages.find(i => i == this.language);
            if(!l) {
              const language = this.language
              this.languages = [
                ...this.languages.slice() , language
              ]
              this.language = null;
            }
          },
          removeLanguage(lang) {
            const l = this.languages.findIndex(i => i == lang);
            if(l > -1) {
              // this.languages.splice(l,1);
              this.languages = [
                ...this.languages.filter(i => i != lang)
              ]
            }
          },
          async getUser() {
            const u = await this.$store.dispatch('account/me');
            this.user = {...u}
            this.languages = this.user.profile.languages
            if(this.user.profile.marital_status != null){
              this.menuStatus1 = this.user.profile.marital_status ? '1' : '2'
            }
            console.log(this.user.profile.marital_status ? '1' : '2');
            if(this.user.profile.gender != null){
              this.menuStatus = this.user.profile.gender ? '1' : '2'
            }
            this.birth_date = this.user.profile.birth_date;
          },
            addCv(){
            this.loadingbtn = true
              this.loadingText = false
                if(this.cv.position != null && this.cv.company != null) {
                    this.$store.dispatch('skills/saveExperience', this.cv)
                    .then(res=>{
                        this.cvList= [
                          ...this.cvList ,res
                        ]
                        this.cv = {
                            position: null,
                            company:null,
                            description:null,
                            from_date:null,
                            to_date:null,
                            up_to_now:false
                        };
                        this.$snotify.success(' با موفقیت ایجاد شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                      location.reload();
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
            },
            addEv(){
                if(this.ev.degree != null && this.ev.school_name != null) {
                    this.$store.dispatch('skills/saveEducation', this.ev)
                        .then(res => {
                            this.evList= [
                              ...this.evList ,res
                            ]
                            this.ev = {
                                degree: null,
                                school_name: null,
                                from_date: null,
                                to_date: null,
                                up_to_now: false
                            }
                            this.$snotify.success(' با موفقیت ایجاد شد', {
                                timeout: 2000,
                                showProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true
                            })
                          location.reload();

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

            },
            addAc(){
                if(this.ac.title != null && this.ac.event_name != null) {
                    this.$store.dispatch('skills/saveAchievement', this.ac)
                        .then(res=>{
                            this.acList = [
                              ...this.acList ,res
                            ]
                            this.ac = {
                                title:null,
                                event_name:null
                            };
                            this.$snotify.success(' با موفقیت ایجاد شد', {
                                timeout: 2000,
                                showProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true
                            })
                          location.reload();
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
            },
            setGenderMan(){
                this .menuStatus= '2';
                // this .user.profile.gender = 0
              const data = {
                  name : 'gender',
                value : 0
              }
              this.setProfile(data)
            },
            setGenderWoman(){
                this .menuStatus= '1';
                // this .user.profile.gender = 1
              const data = {
                name : 'gender',
                value : 1
              }
              this.setProfile(data)
            },
            setSingle(){
                this .menuStatus1= '2';
              const data = {
                name : 'marital_status',
                value : 0
              }
              this.setProfile(data)
              // this.$store.commit('user/setMarried' , 0)
            },
            setMarried(){
                this .menuStatus1= '1';
              const data = {
                name : 'marital_status',
                value : 1
              }
              this.setProfile(data)
                // this .user.profile.marital_status = 1
              // this.$store.commit('user/setMarried' , 1)
            },
            saveCv(){
            const data =
              {
                ...this.user.profile,
                birth_date: this.birth_date,
                languages_list: this.languages,
                // gender:this.menuStatus ? 0 :1 ,
                marital_status:this.user.profile.marital_status,
                gender:this.user.profile.gender,

              }
                this.$store.dispatch('skills/saveCv' , data )
                    . then(res=>{
                      this.$snotify.success(' با موفقیت ثبت شد', {
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
                                await this.$swal(err.response.data.errors[keys[i]][j], {
                                    icon: 'error'
                                });
                            }
                        }
                    })
            },
            deleteExperience(id) {
                this.$store.dispatch('skills/deleteExperience', id)
                    .then(res => {
                        this.user.experiences = this.user.experiences.filter(i => i.id !== res)
                    })
            },
            deleteEducation(id) {
                this.$store.dispatch('skills/deleteEducation', id)
                    .then(res => {
                        this.user.educations = this.user.educations.filter(i => i.id !== res)
                    })
            },
            deleteAchievement(id) {
                this.$store.dispatch('skills/deleteAchievement', id)
                    .then(res => {
                        this.user.achievements = this.user.achievements.filter(i => i.id !== res)
                    })
            },
            onChange(languages) {
                this.selected_skills = languages
            }
        },
        async mounted() {
            this.$nextTick(async () => {
                this.$nuxt.$loading.start()
                await this.getUser();
                this.$nuxt.$loading.finish()
            })
        }
        }
</script>

<style scoped>
  .theme--light.v-sheet {
    background-color: unset!important;
  }
  .selectedGreen1{
    background: #EBFFF7 0% 0% no-repeat padding-box;
    border: 2px solid #00C379;
    color: #00C379;
  }
</style>
