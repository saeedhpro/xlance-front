<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
        <div slot="head-name">لیست پرداخت ها</div>
        <div slot="head1">ردیف</div>
        <div slot="head2">نام کاربر</div>
        <div slot="head3">مقدار کیف پول کاربر</div>
        <div slot="head4">زمان درخواست</div>
        <div slot="head5">مقدار درخواست</div>
        <div slot="head7">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in withdraws" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.user.first_name}}  {{item.user.last_name}}</div>
        <div class="text-black text-sm">{{item.user.balance.toLocaleString() | toPersianNumber }}</div>
        <div class="text-black text-sm">{{ $moment(item.created_at).format('jYYYY/jM/jDD') }}</div>
        <div class="text-black text-sm">{{item.amount.toLocaleString() | toPersianNumber}}</div>
        <div>
          <div class="flex justify-center" v-if="item.status == 'created'">
            <div class="px-2 py-3 h-12 ml-1 bg-greentype rounded-lg text-white click" @click="accept(true , item.id)">تایید پرداخت</div>
            <div class="px-2 py-3 h-12 bg-danger rounded-lg text-white click" @click="accept(false , item.id)">عدم تایید پرداخت</div>
          </div>
          <div v-else class="ml-20">
            انجام شده است
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
        components:{TableAdmin},
        layout:'admin',
        middleware:'admin',
        mounted() {
            this.$store.dispatch('walletAdmin/withdraws')
        },
        computed:{
            withdraws(){
                return this.$store.getters['walletAdmin/withdraws']
            }
        },
        methods:{
            accept(accepted, id){
                        this.$store.dispatch('walletAdmin/acceptWithdraws', {
                            id , accepted
                        })
                            .then(res=>{
                                if(accepted) {
                                    this.$snotify.success('تایید شد', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                }
                                else
                                {
                                    this.$snotify.error('عدم تایید پرداخت', {
                                        timeout: 2000,
                                        showProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true
                                    })
                                }
                            })
                            .catch(err=>{
                            })

                }
            }

    }
</script>
