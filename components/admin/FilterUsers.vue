<template>
  <div class="container">
    <div class="px-5 py-2 bg-white rounded-lg ">
      <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">جستجوی پروژه ها</div>
      </div>
      <div class="my-4">
      <span >جستجو بر اساس نام کاربری</span>
      <SearchInput :value="username" @input="e => this.username = e"/>
      </div>
      <div class="my-4">
      <span class="my-4">جستجو بر اساس ایمیل</span>

      <SearchInput :value="email" @input="e => this.email = e"/>
      </div>
      <div class="my-4">
      <span class="my-4">جستجو بر اساس شماره همراه</span>

      <SearchInput :value="phone" @input="e => this.phone = e"/>
      </div>
        <div class="my-4">
          <div class="my-2 ir-medium text-black">براساس مهارت</div>
          <MultiSelect v-model="selected_skills" :options="allSkills" @changed="onChange" class="h-12 sm:w-3/4 w-full border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" />
        </div>
        <div class="my-4">
          <span class="my-4">جستجو بر اساس نقش کاربر</span>
          <select v-model="role" class="w-20 text-center border-2 border-solid border-gray-500 rounded-lg">
            <option value="both" selected>هر دو</option>
            <option value="freelancer">فریلنسر</option>
            <option value="employer">کارفرما</option>
          </select>
      </div>
      <div class="flex flex-wrap justify-end">
        <div class="my-10 text-center text-greentype">
          <button type="button" class="w-40 h-12 p-1 ir-medium border-2 border-solid border-greentype  rounded-lg bg-white" @click="removeFilter">پاک کردن فیلترها</button>
        </div>
        <div class="my-10 sm:mr-10 text-center text-white">
          <button type="button" class="w-40 h-12 p-1 ir-medium  rounded-lg bg-greentype shadow-2xl" @click="filter">به روز رسانی لیست</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import SearchInput from "../dashboard/global/SearchInput";
    import MultiSelect from "../dashboard/global/MultiSelect";
    export default {
        name: "FilterUsers",
        components: {SearchInput,MultiSelect},
        data(){
            return{
                status:'1',
                email: null,
                username: null,
                phone: null,
                role:'both',
                skills: [],
                selected_skills: [],
            }
        },
        mounted() {
            this.$store.dispatch('skills/getSkills')
        },
        methods: {
            onChange(skills) {
                this.selected_skills = skills;
                this.skills = skills.map(i => i.id)
            },
            filter() {
                this.$emit('filter', this.email, this.phone, this.role, this.username  , this.selected_skills)
            },
            removeFilter(){
                this.email = null;
                this.username = null;
                this.phone= null;
                this.role='both';
                this.selected_skills= [];
                this.$emit('filter', this.email, this.phone, this.role, this.username  , this.selected_skills)

            }
        },
        computed: {
            allSkills() {
                return this.$store.getters['skills/getSkills']
            }
        }
    }
</script>
<style scoped>
  .select{
    color: black;
    border-bottom: 4px solid #00C379;
  }
</style>
