<template>
  <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
<script>
    export default {
        name: "DisputedChart",
        data() {
return {
    // series:[],
    // series: [{
    //     name: 'PRODUCT A',
    //     data: [44, 55, 41, 67, 22, 43]
    // }, {
    //     name: 'PRODUCT B',
    //     data: [13, 23, 20, 8, 13, 27]
    // },
    // ],
    chartOptions: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            // stackType: '100%'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        xaxis: {
            categories: [' اختلاف های مذاکره شده ها','اختلاف های بسته شده',' اختلاف های در حال داوری',]
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'right',
            offsetX: 0,
            offsetY: 50
        },
    },
}

        },
        fetch(){
            this.$store.dispatch('userAdmin/disputedChart')

        },
        computed:{
            series(){
                let info = this.$store.getters['userAdmin/disputedChart'];
                if(info.length>0){
                    return info
                }
               return [{name:"",data:[]}];


            }
        }
    }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto);
</style>
