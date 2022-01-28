<template>
    <div class="mb-5 flex items-center justify-between">
      <div class="flex" style="align-items: center">
        <img src="/images/art2.png" class="h-8"/>
        <div class="sm:mr-8 mr-1 -mt-2 text-purple-600 fo font-black">
        <slot  name="nameHead">
          <h4>اخرین مطالب</h4>
        </slot>
        </div>
<!--        <hr class="mr-5 text-gray-900" style="width: 50%;border-style:dashed"/>-->
      </div>

      <div v-if="link" class="btn-text">
      <a :href="link" class="p-1 sm:px-5 px-1 border-2 rounded-lg  border-purple-600 text-purple-600 ">
        <slot name="btnName">مشاهده</slot>
      </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        props:['link']
    }
</script>

<style>
  .fo{
    height: 45px;
    text-align: center;
    font: normal normal 900 2.5rem/2.8125rem Kalameh;
    letter-spacing: 0;
    color: #673AB7;
  }
  /*.h{*/
  /*  width: 100%;*/
  /*  border-top: 1px dashed #616161;*/
  /*}*/
  @media (max-width: 768px) {
    .fo{
      font-size: 1.8rem;
    }
    .btn-text{
    display: none;
    }
  }

</style>
