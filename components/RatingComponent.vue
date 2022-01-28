<template>
  <div class="rate">
    <ul class="list-rate">
      <li @click="rate(star)" v-for="(star, i) in maxStars" :class="{ 'active': star <= value }" :key="i" class="star" dis="true">
      <i :class="star <= value ? 'fas fa-star' : 'far fa-star'"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'RatingComponent',
    props: {
        value: {
            type: Number,
        },
        maxStars: {
            type: Number
        },
        dis:{
            type: Boolean,
            default: false
        }    },

  methods: {
    rate(star) {
        if(this.dis) return;
      if (typeof star === 'number' && star <= this.maxStars && star >= 0) {
        this.value = this.value === star ? star - 1 : star
      }
        this.$emit('input' , this.value)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /*@import '../styles/rating.scss';*/
  @import "../assets/rating";

</style>
