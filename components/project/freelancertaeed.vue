<template>
    <div class="w-full px-5 py-2 mb-10 flex flex-wrap rounded-lg border-solid border-2 border-greenFreelancer bg-greenKam">
      <div class="sm:w-3/4 w-full">
        <p class="mt-3 ir-medium">پیشنهاد شما انتخاب شد</p>
        <br/>
        <p class="ir-light">کارفرما، پیشنهاد شما را برای انجام این پروژه انتخاب کرده است. برای پذیرش یا رد انجام آن، حداکثر ۵ روز فرصت دارید</p>
      </div>
      <div class="sm:w-1/4 w-full">
        <div class="my-3 py-2 h-10 bg-greenFreelancer rounded-lg shadow-lg text-white text-center ir-medium text-sm click" @click="acceptRequest(true)">پذیرش و انجام پروژه</div>
        <div class="my-3 py-2 h-10 border-solid border-2 border-greenFreelancer rounded-lg shadow-lg text-greenFreelancer text-center text-sm ir-medium click" @click="acceptRequest(false)">لغو و عدم پذیرش</div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "freelancertaeed",
        props:['id', 'project_id'],
        methods:{
            acceptRequest(accepted){
                this.$store.dispatch('project/acceptFreelancer',
                    {id: this.id, project_id: this.project_id, accepted: accepted})
                    .then(res=>{
                        this.$snotify.success('پذیرش پروژه با موفقیت ثبت شد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                        this.$router.go(0)
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
        }
    }
</script>
