<template>
  <div class="container">
    <p class="mb-6 text-2xl ir-bold ">ایجاد استان</p>
    <input
      id="name"
      v-model="state.name"
      type="text"
      name="name"
      class="w-full rounded-lg border-2 border-gray-500 border-solid"
    >
    <div class="my-10 mt-20 sm:text-left text-center text-white">
      <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="saveState">ثبت استان</button>
    </div>

    <form
      id="app"
      action="https://vuejs.org/"
      method="post"
      class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
    >

      <div>
        <label for="name">ایجاد شهر</label>
        <input
          id="name"
          v-model="city.name"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div class="mt-6 mb-6">
        <label for="category">انتخاب استان</label>
        <select
          id="category"
          v-model="city.state_id"
          name="movie"
          class="w-full rounded-lg border-2 border-gray-500 border-solid">
          <option v-for="(i , index) in getStates" :key="index" :value="i.id" >
            {{i.name}}
          </option>
        </select>
      </div>
      <div class="my-10 sm:text-left text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="saveCity">ثبت شهرستان</button>
      </div>
    </form>
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
        <div slot="head-name">لیست استان ها</div>
        <div slot="head1">ردیف</div>
        <div slot="head3">استان</div>
        <div slot="head7">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in getStates" :key="index" class="my-8 px-6 pb-5 flex justify-around border-b-2 border-gray-400 border-dashed">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.name}}</div>
        <div class="text-black text-sm">
          <span @click="deleteState(item.id)"><i class="fal fa-trash-alt mr-3"></i></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        layout:'admin',
        middleware:'admin',
        components: {TableAdmin},
        data(){
            return{
                state:{
                    name:null,
                    country_id:1
                },
                city:{
                    name:null,
                    state_id:null,
                    country_id:1
                }
            }
        },
        methods:{
            saveState(){
                this.$store.dispatch('userAdmin/addState',this.state)
                    .then(res=>{
                        this.$swal('استان جدید با موفقیت ثبت شد', {
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
            saveCity(){
                this.$store.dispatch('userAdmin/addCity', this.city)
                    .then(res=>{
                        this.$swal('شهر جدید با موفقیت ثبت شد', {
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
            deleteState(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('userAdmin/deleteState', id)
                                .then(res => {
                                    this.$swal('با موفقیت حذف شد!', {
                                        icon: 'success'
                                    });
                                })
                        }
                    })
            }

        },
        mounted(){
          this.$store.dispatch('userAdmin/getStates')
        },
        computed:{
            getStates(){
                return this.$store.getters['userAdmin/getStates']
            }
        }
    }
</script>
