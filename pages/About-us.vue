<template>
  <div class="container">
    <!--      <img src="/images/header-backg-art.png" alt="" style="position:absolute;top: 0"/>-->
    <div class="flex flex-wrap items-center relative">
      <div class="lg:w-1/2 md:w-full sm:w-full text-right">
        <img src="/images/art1.png" class="mt-20 mr-20"/>
        <h1 class="text-purple-600 ir-bold text-3xl font-black	">ایکس لنس</h1>
        <div class="my-5 text-sm text-primary">محل حرفه ای برای انجام پروژه های شما</div>
        <div class="text-sm text-gray-600 text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
      </div>
      <div class="w-1/2 hidden sm:block text-center" style="margin-right: inherit">
        <h1 class="text-purple-600 ir-bold text-3xl font-black	">درباره ما</h1>
        <img class="mt-10 w-32 mr-auto ml-auto" src="/images/logo.png"/>
      </div>
    </div>
    <div class="flex flex-wrap mt-20 items-start">
      <div>
        <img src="/images/art2.png" class="mt-2"/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-bold text-2xl">تیم ما</div>
        <div class="mt-3 text-sm text-gray-700 text-right">همه اینجاییم برای ساخت رویاهای بزرگ</div>
      </div>
    </div>
    <div class="flex flex-wrap team-item mt-20 text-right" v-for="i in items">
      <div class="relative" style="min-width: 175px;height: 175px">
        <div class="img-item absolute"></div>
        <img src="/images/stive.jfif" class="rounded-lg absolute"/>
      </div>
      <div class="mr-3">
        <div class="text-black">{{i.name}}</div>
        <div class="my-2 text-gray-700">{{i.m}}</div>
        <div class="text-gray-600">{{i.description}}</div>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="flex flex-wrap mt-20 items-start">
      <div>
        <img src="/images/art2.png" class="mt-2"/>
      </div>
      <div class="mr-3">
        <div class="text-black ir-bold text-2xl">چشم انداز</div>
        <div class="my-3 text-sm text-gray-700 text-right">برای آینده ایکس لنس چه چیزی متصوریم؟</div>
        <div class="text-sm text-gray-600 text-right">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</div>
      </div>
    </div>
    <Advantages/>
  </div>
</template>

<script>
import Advantages from "../components/client/home/Advantages";
export default {
  name: "About-us",
  components: {Advantages},
  head(){
    return {
      title: 'درباره ما'
    }
  },
  layout:'rule',
  data(){
    return{
      items:[
        {img:'', name:'مهتا زنگنه',m:'فرانت اند',description:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی'},
        {img:'', name:'مهتا زنگنه',m:'فرانت اند',description:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی'},
        {img:'', name:'مهتا زنگنه',m:'فرانت اند',description:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی'},
        {img:'', name:'مهتا زنگنه',m:'فرانت اند',description:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی'},
      ]
    }
  }
}
</script>

<style scoped lang="css">
.team-item {
  width: 80%;
}
.team-item:nth-child(even){
  float: left;
  position: relative;
}
.team-item:nth-child(even) .img-item{
  background-color: #C2FFE8;
  border-radius: 8px;
  width: 160px;
  height: 160px;
  bottom: 0px;
  right: 0px;
  z-index: 9;
}
.team-item:nth-child(odd) .img-item{
  background-color: #F2EBFF;
  border-radius: 8px;
  width: 160px;
  height: 160px;
  bottom: 0px;
  right: 0px;
  z-index: 9;
}
.team-item img{
  height: 160px;
  top: 0px;
  left: 0px;
  z-index: 9999;
  min-width: 160px;
  max-width: 160px;
}
</style>
