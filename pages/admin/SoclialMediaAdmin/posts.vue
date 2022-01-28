<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
      <div slot="head-name">لیست پست ها</div>
      <div slot="head1">ردیف</div>
      <div slot="head2">عکس پست</div>
      <div slot="head3">متن پست</div>
      <div slot="head4">نام کاربر</div>
      <div slot="head5">زمان ایجاد</div>
<!--      <div slot="head6">عملیات</div>-->
    </TableAdmin>
    <div v-for="(item, index) in posts" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
      <div class="text-black text-sm">{{index + 1}}</div>
      <div class="-mr-20 text-black text-sm">
        <img class="w-32 h-32" v-if="item.media" :src="item.media.path"/>
      </div>
      <div class="w-40 text-black text-sm">{{item.caption}}</div>
      <div class="text-black text-sm">{{item.user.username}}</div>
      <div class="text-black text-sm">{{ ($moment(item.created_at).format('jYYYY/jM/jDD') ) | toPersianNumber }}</div>
<!--      <div class="text-black text-sm">عملیات</div>-->
    </div>
  </div>
  </div>
</template>

<script>
    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "posts",
        layout:'admin',
        middleware:'admin',

        components:{TableAdmin},
        mounted(){
            this.$store.dispatch('socialMediaAdmin/getPost')
        },
        computed:{
            posts(){
                return this.$store.getters['socialMediaAdmin/posts']
            }
        }
    }
</script>
