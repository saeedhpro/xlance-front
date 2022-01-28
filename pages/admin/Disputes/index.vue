<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
        <div slot="head-name">لیست اختلاف های ایجاد شده ها</div>
        <div slot="head1">ردیف</div>
        <div slot="head2">نام پروژه</div>
        <div slot="head3">نام کارفرما</div>
        <div slot="head4">نام فریلنسر</div>
        <div slot="head5">تاریخ ایجاد</div>
        <div slot="head6">وضعیت</div>
        <div slot="head7">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in dispute" :key="index" class="my-8 pr-10 pl-2 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.project.title}}</div>
        <div class="text-black text-sm">{{item.employer.username}}</div>
        <div class="text-black text-sm">{{item.freelancer.username}}</div>
        <div class="text-black text-sm">{{ $moment(item.created_at).format('jYYYY/jM/jDD') }}</div>
        <div class="text-black text-sm">{{chooseStatus(item.status)}}</div>
        <div>
          <div>
            <div v-if="item.status == 'closed'" class="text-greenFreelancer">تمام شده</div>
        <div class="flex justify-center" v-else>
          <div @click="finishDispute(item)" class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white">اتمام اختلاف</div>
          <div @click="inprogress(item)" class="px-2 py-3 h-12 bg-danger rounded-lg text-white">در حال بررسی</div>
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
    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        components: {TableAdmin},
        layout:'admin',
        middleware:'admin',
        mounted(){
          this.$store.dispatch('projectsAdmin/getDispute')
        },
        methods:{
            chooseStatus(status){
                switch (status) {
                    case 'created':
                        return 'ایجاد شده'
                    case 'closed':
                        return 'تمام شده'
                    case 'inprogress':
                        return  'در حال بررسی'
                }

            },
            finishDispute(item){
                this.$store.dispatch('projectsAdmin/finishDispute', item.id)
                    .then(res => {
                        this.$snotify.success('حل اختلاف به پابان رسید', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                    })
                    .catch(err=>{

                    })
            },
            inprogress(item){
                this.$store.dispatch('projectsAdmin/inprogressDispute' , item.id)
                    .then(res => {
                        this.$snotify.success(' اختلاف در حال بررسی می باشد', {
                            timeout: 2000,
                            showProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true
                        })
                    })
                    .catch(err=>{

                    })
            } ,
        },
        computed:{
            dispute()
            {
                return this.$store.getters['projectsAdmin/getDispute']
            }
        }
    }
</script>
