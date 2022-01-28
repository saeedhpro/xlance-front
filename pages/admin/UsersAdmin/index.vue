<template>
  <div class="container">
    <FilterUsers @filter="filterUsers"/>
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
      <div slot="head-name">لیست کاربران</div>
      <div slot="head1">ردیف</div>
      <div slot="head2">نام و نام خانوادگی</div>
      <div slot="head3">نام کاربری</div>
      <div slot="head4">وضعیت</div>
      <div slot="head6">عملیات</div>
    </TableAdmin>
      <div style="overflow: auto">
    <div v-for="(item, index) in users" :key="index" class="my-8 px-20 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed" style="min-width: 1000px">
      <div class="text-black text-sm">{{index + 1}}</div>
      <div class="text-black text-sm" >{{item.full_name || 'پروفایل کامل نیست'}} </div>
      <div class="text-black text-sm">{{item.username}}</div>
      <div class="text-black text-sm">{{item.verified ? 'تایید شده' : 'تایید نشده'}}</div>
      <div class="text-black text-sm">
        <button type="button" @click="blockAdmin1(item.id)" v-if="item.blocked_by_admin" class="p-1 rounded-lg text-white bg-greenFreelancer">فعال کردن کاربر</button>
        <button type="button" @click="blockAdmin(item.id)" class="p-1 mx-2 rounded-lg text-white bg-pink-200" v-else >غیرفعال کردن کاربر</button>
        <nuxt-link :to="`/profiles/${item.id}`"  ><i class="fal fa-eye mx-3"></i></nuxt-link>
        <nuxt-link :to="`/admin/VirifiUser/${item.id}`" class="px-2 bg-greentype text-white border-greentype border-2 border-solid rounded-lg"  >
          تایید مدارک کاربر
        </nuxt-link>
        <nuxt-link :to="`/admin/Charge/${item.id}`" class="px-2 bg-danger text-white border-danger border-2 border-solid rounded-lg"  >
          شارژ کیف پول کاربر
        </nuxt-link>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
    import TableAdmin from "../../../components/admin/TableAdmin";
    import FilterUsers from "../../../components/admin/FilterUsers";
    export default {
        name: "index",
        layout:'admin',
        middleware:'admin',
        components:{FilterUsers, TableAdmin},
        asyncData(context) {
            let skills = context.route.query.skills;
            let phone = context.route.query.phone;
            let email = context.route.query.email;
            let username = context.route.query.username;
            let role = context.route.query.role || 'both';
            let r = '';
            let sl = skills ? skills.split(',') : [];
            let q = [];
            sl.forEach(s => q.push(`skills[]=${s}`));
            if(phone) {
                q.push(`phone=${phone}`)
            }
            if(email) {
                q.push(`email=${email}`)
            }
            if(username) {
                q.push(`username=${username}`)
            }
            if(role) {
                q.push(`role=${role}`)
            }
            r += '?' + q.join('&');
            context.store.dispatch('userAdmin/searchProjects', r)
        },

        methods:{
            blockAdmin(id){
                this.$store.dispatch('userAdmin/blockAdmin',id)
                    .then(res=>{
                        this.$swal('با موفقیت غیرفعال شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err => {

                    })
            },
            blockAdmin1(id){
                this.$store.dispatch('userAdmin/blockAdmin',id)
                    .then(res=>{
                        this.$swal('با موفقیت فعال شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err => {

                    })
            },
            filterUsers(email, phone, role,username,skills ){
                let r = '/admin/UsersAdmin';
                let q = [];
                let sl = skills.join(',');
                if(sl) {
                    q.push(`skills=${sl}`)
                }
                if(phone) {
                    q.push(`phone=${phone}`)
                }
                if(email) {
                    q.push(`email=${email}`)
                }
                if(username) {
                    q.push(`username=${username}`)
                }
                if(role) {
                    q.push(`role=${role}`)
                }
                r += '?' + q.join('&');
                this.$router.push({path: r})
            }
        },
      // mounted () {
      //     this.$store.dispatch('userAdmin/users')
      // },
      computed:{
            users(){
                return this.$store.getters['userAdmin/getSearchUsersList']
            }
        },
        watchQuery: true,

    }
</script>
