<template>
  <div >
  <div>
    <div class="px-3">
      <div class="pb-2 mb-5 flex border-b-2 border-gray-300">
        <div class="pb-3 pt-3 text-sm text-gray-500 ir-medium"  @click="status='1'" :class="{'select' : status==='1'}">
          <slot name="head-name"> fi .jsdbckjbzds</slot>
        </div>
      </div>
      <div class="overflow-auto">
        <div style="min-width: 700px">
          <div class="py-2 pl-2 pr-3 flex bg-gray-300 justify-around rounded-lg">
            <div class="text-gray-600">
              <slot name="head1"></slot>
            </div>
            <div class=" text-gray-600">
              <slot name="head2"></slot>
            </div>
            <div class="text-gray-600">
              <slot name="head3"></slot>
            </div>
            <div class="text-gray-600">
              <slot name="head4"></slot>
            </div>
            <div  class="text-gray-600">
              <slot name="head5"></slot>
            </div>
            <div  class="text-gray-600">
              <slot name="head6"></slot>
            </div>
            <div   class="text-gray-600">
              <slot name="head7"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "TableAdmin",
        data(){
            return{
                status:'1'
            }
        }
    }
</script>
