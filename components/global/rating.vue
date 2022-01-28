<template>
    <div class="flex text-sm text-gray-500">
<!--      <div @click="status='1'" :class="{'yellowSelect' : status === '1'}">-->
<!--      <i class="fal fa-star" ></i>-->
<!--      </div>-->
<!--      <div @click="status='2'" :class="{'yellowSelect' : status === '2'}">-->
<!--        <i class="fal fa-star" ></i>-->

<!--      </div>-->
<!--      <div @click="status='3'" :class="{'yellowSelect' : status === '3'}">-->
<!--        <i class="fal fa-star" ></i>-->

<!--      </div>-->
<!--      <div @click="status='4'" :class="{'yellowSelect' : status === '4'}">-->
<!--        <i class="fal fa-star" ></i>-->

<!--      </div>-->
<!--      <div @click="status='5'" :class="{'yellowSelect' : status === '5'}">-->
<!--        <i class="fal fa-star" ></i>-->
<!--      </div>-->
        <i class="fal fa-star" ></i>

        <i class="fal fa-star" ></i>

        <i class="fal fa-star" ></i>

        <i class="fal fa-star" ></i>
        <i class="fal fa-star" ></i>
    </div>
</template>

<script>
    export default {
        name: "rating",
        data(){
            return{
                status:'',
            }
        }
    }
</script>
<style>
  .yellowSelect{
    color: yellow;
    border-color: yellow;
  }
</style>
