<template>
  <div class="container">
  <form
    id="app"
    action="https://vuejs.org/"
    method="post"
    class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
  >

    <div>
      <label for="name">عنوان مهارت</label>
      <input
        id="name"
        v-model="name"
        type="text"
        name="name"
        class="w-full rounded-lg border-2 border-gray-500 border-solid"
      >
    </div>

    <div class="mt-6 mb-6">
      <label for="color">انتخاب رنگ مهارت</label>
      <input type="color" v-model="color">
    </div>
<!--    <div class="mt-6 mb-6">-->
<!--      <label for="status">وضعیت مهارت</label>-->
<!--      <div class="flex items-center align-center justify-start">-->
<!--        <v-checkbox-->
<!--          v-model="ex4"-->
<!--          color="greenFreelancer"-->
<!--          value="success"-->
<!--        ></v-checkbox>-->
<!--      </div>-->
<!--    </div>-->
    <div class="mt-6 mb-6">
      <label for="category">انتخاب دسته بندی</label>
      <select
        id="category"
        v-model="category_id"
        name="movie"
        class="w-full rounded-lg border-2 border-gray-500 border-solid">
        <option v-for="(i , index) in category" :key="index" :value="i.id" >{{i.name}}</option>
      </select>
    </div>
    <div class="my-10 sm:text-left text-center text-white">
      <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="saveSkills">ثبت مهارت</button>
    </div>
  </form>
  </div>
</template>
<script>
    export default {
        name: "create",
        layout:'admin',
        middleware:'admin',
        data(){
            return{
                ex4:true,
                name:null,
                color:null,
                category_id: null
            }
        },
        methods:{
            saveSkills(){
                this.$store.dispatch('skillsAdmin/addSkills', {
                    name:this.name,
                    color:this.color,
                    category_id:this.category_id,
                    image_id:this.image ? this.image.id :null
                })
                    .then(res=>{
                        this.$router.replace('/admin/SkillsAdmin')
                        this.$swal('مهارت شما با موفقیت ثبت شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err=>{
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
            getCategory(){
                this.$store.dispatch('skillsAdmin/getSkillCategoried',{
                    name:this.name,
                    color:null,
                    category_id:this.category_id,

                })
            }

        },
        mounted(){
          this.$store.dispatch('skillsAdmin/getSkillCategoried')
        },
        computed:{
            category(){
                return this.$store.getters['skillsAdmin/getSkillCategoried']
            }
        }
    }
</script>
