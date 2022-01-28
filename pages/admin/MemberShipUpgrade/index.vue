<template>
  <div class="container">
    <form
      v-if="!doUpdate"
      id="app"
      method="post"
      class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
    >
      <div>
        <label for="name">نوع پکیج </label>
        <input
          id="name"
          v-model="type"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div>
        <label for="name">عنوان </label>
        <input
          id="name"
          v-model="title"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div class="my-5">
        <label for="name">قیمت </label>
        <input
          id="name"
          v-model="price"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div>
        <label for="name">تعداد پیشنهاد </label>
        <input
          id="name"
          v-model="number"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div class="my-10 sm:text-left text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="save">ثبت </button>
      </div>
    </form>
    <form
      v-else
      id="app"
      method="put"
      class="w-full sm:w-80 p-5 rounded-lg border-2 border-gray-500 border-solid"
    >
      <div>
        <label for="name">نوع پکیج </label>
        <input
          id="name"
          v-model="type"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div>
        <label for="name">عنوان </label>
        <input
          id="name"
          v-model="p.title"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div class="my-5">
        <label for="name">قیمت </label>
        <input
          id="name"
          v-model="p.price"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>
      <div>
        <label for="name">تعداد پیشنهاد </label>
        <input
          id="name"
          v-model="p.number"
          type="text"
          name="name"
          class="w-full rounded-lg border-2 border-gray-500 border-solid"
        >
      </div>

      <div class="my-10 sm:text-left text-center text-white">
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-greentype btnSave"  @click="doUpdatePackage">ثبت </button>
        <button type="button" class="w-64 h-10 p-1 ir-medium  rounded-lg bg-pink-200 btnSave"  @click="cancelUpdatePackage">لغو </button>
      </div>
    </form>
    <div class="mt-10 relative bg-white rounded-lg shadow-lg">
      <TableAdmin>
        <div slot="head-name">لیست پکیج های ارتقا عضویت</div>
        <div slot="head1">ردیف</div>
        <div slot="head2">نوع پکیج</div>
        <div slot="head3">عنوان</div>
        <div slot="head4">قیمت</div>
        <div slot="head5">تعداد پیشنهاد</div>
        <div slot="head6">عملیات</div>
      </TableAdmin>
      <div v-for="(item, index) in getRequest" :key="index" class="my-8 px-6 pb-5 flex justify-between border-b-2 border-gray-400 border-dashed justify-around">
        <div class="text-black text-sm">{{index + 1}}</div>
        <div class="text-black text-sm">{{item.type}}</div>
        <div class="text-black text-sm">{{item.title}}</div>
        <div class="text-black text-sm">{{item.price.toLocaleString()}}</div>
        <div class="text-black text-sm">{{item.number}}</div>
        <div class="text-black text-sm">
          <span @click="updatePackage(item)" style="cursor: pointer">
            <i class="fal fa-edit" ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import TableAdmin from "../../../components/admin/TableAdmin";
    export default {
        name: "index",
        components: {TableAdmin},
        layout:'admin',
        middleware:'admin',
        data(){
            return{
                title: null,
                type:null,
                number:null,
                price:null,
                p: {
                    id: null,
                    type:null,
                    title: null,
                    number:null,
                    price:null,
                },
                doUpdate: false,
            }
        },
        methods:{
            async save(){
                await this.$store.dispatch('upgrate/addPac',{
                    title : this.title,
                    type: this.type,
                    number :this.number,
                    price:this.price

                })
                    .then(res=>{
                        this.$swal('با موفقیت ثبت شد', {
                            icon: 'success'
                        });
                    })
                    .catch(async err => {
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
            getUpgrate(){
                this.$store.dispatch('upgrate/getUpgrate')
            },
            updatePackage(p) {
                this.doUpdate = true;
                this.p = {...p};
            },
            doUpdatePackage() {
              this.$store.dispatch('upgrate/updatePac', this.p)
                  .then(res => {
                      this.doUpdate = false;
                      this.p = {
                          id: null,
                          type:null,
                          title: null,
                          number:null,
                          price:null,
                      };
                      this.$swal('با موفقیت ثبت شد', {
                          icon: 'success'
                      });
                  })
                  .catch(err => {
                  })
            },
            cancelUpdatePackage() {
                this.doUpdate = false;
                this.p = {
                    id: null,
                    type:null,
                    title: null,
                    number:null,
                    price:null,
                };
            }
        },

        mounted(){
            this.getUpgrate()
        },
        computed:{
            getRequest() {
                return this.$store.getters['upgrate/getUpgrate']
            },
            getBalance()
            {
                return  this.$store.getters['user/getBalance']
            },

        },
    }
</script>
