<template>
  <div class="container">
    <div class="p-5 bg-white rounded-lg shadow-md">
      <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
        <div class="pb-3 text-sm text-gray-500 ir-medium text-lg"  @click="status='1'" :class="{'select-purple' : status==='1'}">جستجوی فریلنسرها</div>
      </div>
      <div class="flex flex-wrap my-5">
      <SearchInput :value="term" @input="e => this.term = e"/>
        <SelectInput :options="options"/>
      </div>
        <div class="w-full">
          <div class="my-2 ir-medium text-black">براساس مهارت</div>
          <MultiSelect v-model="selected_skills" :options="allSkills" @changed="onChange" class="h-10 w-full border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-500" />
        </div>
      <div class="flex flex-wrap justify-end">
        <div class="mt-10 text-center text-purple-600">
          <button type="button" class="w-40 h-12 p-1 ir-medium border-2 border-solid border-purple-600  rounded-lg bg-white" @click="removeFilter">پاک کردن فیلترها</button>
        </div>
        <div class="mt-10 sm:mr-10 text-center text-white">
          <button type="button" class="w-40 h-12 p-1 ir-medium  rounded-lg bg-purple-600" @click="filter">به روز رسانی لیست</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MultiSelect from "../global/MultiSelect";
  import SearchInput from "../global/SearchInput";
  import SelectInput from "../global/SelectInput";
    export default {
        name: "FleelancerFilter",
        components:{SelectInput, SearchInput,MultiSelect},
        data(){
            return{
                status:'1',
                term: null,
                skills: [],
                selected_skills: [],
                options:[10,25,50],
                selectepurple:'1'

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
                this.$emit('filter', this.skills, this.term)
            },
            removeFilter(){
                this.term= null
                this.skills=[]
                this.selected_skills = []
                this.$emit('filter', this.skills, this.term , this.selected_skills)

            }
        },
        computed: {
            allSkills() {
                return this.$store.getters['skills/getSkills']
            }
        }
    }
</script>
