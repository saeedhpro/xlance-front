<template>
  <div class="container">
    <div class="relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
      <div slot="head-name">لیست استوری ها</div>
      <div slot="head1">ردیف</div>
      <div slot="head2">عکس استوری</div>
      <div slot="head3">نام کاربر</div>
      <div slot="head4">زمان ایجاد</div>
      <div slot="head7">عملیات</div>
    </TableAdmin>
      <client-only>
        <light v-if="media.length > 0" :media="media" :showLightBox="showLightBox" @onClosed="closeLightBox">
        </light>
      </client-only>
    <div v-for="(item, index) in getStory" :key="index" class="my-8 px-20 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed">
      <div class="text-black text-sm">{{index + 1}}</div>
      <div class="-mr-20 text-black text-sm">
        <img @click="setLight(item.media.path)" class="w-20 h-20 rounded-lg" v-if="item.media" :src="item.media.path"/>
      </div>
      <div class="text-black text-sm">{{item.user.username}}</div>
      <div class="text-black text-sm">{{item.cteated_at}}</div>
      <div class="text-black text-sm">
        <span @click="deleteStory(item.id)"><i class="fal fa-trash-alt mr-3"></i></span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "StoreisList",
        layout:'admin',
        components:{TableAdmin},
        middleware:'admin',
        data() {
            return{
              media: [],
              showLightBox: false
            }
        },
        mounted(){
            this.$store.dispatch('socialMediaAdmin/getStory')
        },
        computed:{
            getStory(){
                return this.$store.getters['socialMediaAdmin/stories']
            }
        },
        methods: {
            deleteStory(id){
                this.$swal('آیا مطمئن هستید؟')
                    .then(res => {
                        if(res.value) {
                            this.$store.dispatch('socialMediaAdmin/deleteStory', id)
                                .then(res => {
                                    this.$swal('با موفقیت حذف شد!', {
                                        icon: 'success'
                                    });
                                })
                        }
                    })
            },
            setLight(path) {
                this.media = [{
                    thumb: path,
                    src: path
                }];
                this.showLightBox = true;
            },
            closeLightBox() {
                this.media = [];
                this.showLightBox = false;
            }
        }
    }
</script>
