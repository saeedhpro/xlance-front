<template>
    <div class="container">
      <div class="px-5 py-12 bg-white rounded-lg shadow-md ">
        <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
          <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select' : status==='1'}">جستجوی پروژه ها</div>
         </div>
        <SearchInput :value="term" @input="e => this.term = e"/>
        <div class="flex flex-wrap justify-between">
          <div class="sm:w-2/3 w-full">
            <div class="my-2 ir-medium text-black">براساس مهارت</div>
            <MultiSelect v-model="selected_skills" :options="allSkills" @changed="onChange" class="h-10 w-full border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" />
          </div>
          <div>
          <div class="flex items-end">
          <div>
            <div class="my-2 ir-medium text-black">براساس قیمت</div>
            <div class="flex" style="position: relative">
              <input v-model="min" class="h-10 w-32 pr-3 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-600"/>
              <div class="mr-20 mt-2 text-gray-500" style="position: absolute">ریال</div>
            </div>
          </div>
            <div class="m-2 ir-medium text-gray-600">تا</div>
            <div class="flex" style="position: relative">
              <input v-model="max" class="h-10 w-32 pr-3 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-600"/>
              <div class="mr-20 mt-2 text-gray-500" style="position: absolute">ریال</div>
            </div>
          </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-end">
          <div class="mt-10 text-center text-greentype">
            <button type="button" class="w-40 h-12 p-1 ir-medium border-2 border-solid border-greentype  rounded-lg bg-white" @click="removeFilter">پاک کردن فیلترها</button>
          </div>
          <div class="mt-10 sm:mr-10 text-center text-white">
            <button type="button" class="w-40 h-12 p-1 ir-medium  rounded-lg bg-greentype"  @click="filter">به روز رسانی لیست</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import SearchInput from "../dashboard/global/SearchInput";
    import MultiSelect from "../dashboard/global/MultiSelect";
    export default {
        name: "Filters",
        components: {SearchInput,MultiSelect},
        data(){
            return{
                status:'1',
                term: null,
                min: null,
                max: null,
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
                this.$emit('filter', this.skills, this.term, this.min, this.max , this.selected_skills)
            },
            removeFilter(){
                this.term= null
                this.skills=[]
                this.min=null
                this.max=null
                this.selected_skills = []
                this.$emit('filter', this.skills, this.term, this.min, this.max , this.selected_skills)

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
