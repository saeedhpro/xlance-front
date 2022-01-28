<template>
<div class="p-10">
  <div class="flex flex-wrap justify-space-between">
    <div class="sm:w-1/2 w-full">
      <div class="my-10">اطلاعات کلی ازتعداد کاربران</div>
      <ClientOnly>
     <ColumnChart/>
      </ClientOnly>
    </div>
    <div class="sm:w-1/2 w-full">
      <div class="my-10">اطلاعات کلی ازتعداد پروژه ها</div>
      <ClientOnly>
        <ProjctChart/>
      </ClientOnly>
    </div>
  </div>
  <div class="my-5">
    <div class="my-10">اطلاعات کلی ازوضعیت مالی</div>
    <div class="w-full">
      <ClientOnly>
      <LineCharts/>
      </ClientOnly>
    </div>
  </div>
  <div class="flex flex-wrap justify-space-between">
    <div class="sm:w-1/2 w-full">
      <div class="my-10">اطلاعات کلی از ایجاد اختلاف</div>
      <ClientOnly>
        <DisputedChart/>
      </ClientOnly>
    </div>
<!--    <div class="sm:w-1/2 w-full">-->
<!--      <div class="my-10">تعداد باگ ها</div>-->
<!--      <ClientOnly>-->
<!--        <LineCharts/>-->
<!--      </ClientOnly>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
    import ColumnChart from "../../components/admin/chart/ColumnChart";
    import LineCharts from "../../components/admin/chart/LineCharts";
    import ProjctChart from "../../components/admin/chart/ProjectChart";
    import DisputedChart from "../../components/admin/chart/DisputedChart";
    export default {
        name: "DashboardAdmin",
        components: {DisputedChart, ProjctChart, LineCharts, ColumnChart},
        layout:'admin',
        middleware:'admin',
      head(){
        return {
          title: 'داشبورد'
        }
      },
    }
</script>
