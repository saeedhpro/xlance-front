<template>
  <div class="sm:mt-0 mt-3">
  <div class="custom-select " :tabindex="tabindex" @blur="open = false" >
    <div class="px-10 border-solid border-gray-400 border-2 bg-gray-100 rounded-lg placeholder-gray-400" :class="{ open: open }" @click="open = !open">
      <span><i class="far fa-list-ul"></i></span>
      <span>
        نمایش {{  selected | toPersianNumber}} عدد
      </span>
      <span>
        <i class="far fa-chevron-down"></i>
        </span>
    </div>
    <div class="items border-b-2 border-gray-100" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option,
          open = false,
          $emit('change', option)
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
  </div>
</template>

<script>
    export default {
        name: "SelectInput",
        props: {
            options: {
                type: Array,
                required: true,
            },
            default: {
                type: String,
                required: false,
                default: null,
            },
            tabindex: {
                type: Number,
                required: false,
                default: 0,
            },
        },
        data() {
            return {
                selected: this.default
                    ? this.default
                    : this.options.length > 0
                        ? this.options[0]
                        : null,
                open: false,
            };
        },
        mounted() {
            this.$emit("change", this.selected);
        },
    }
</script>
<style scoped>

  .custom-select {
    direction: rtl;
    position: relative;
    color: #bdbdbd;
    text-align: right;
    outline: none;
    line-height: 47px;
  }

  .custom-select .selected {
    width: 162px;
    height: 48px;
    color: gray;
    border-color:gray!important; ;
    background-color: #fff;
    border-radius: 6px;
    padding-right: 1rem;
    cursor: pointer;
    user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
  }

  .custom-select .selected.open {
    border: 1px solid #0a0a0a;
    border-radius: 6px 6px 0px 0px;
  }

  .custom-select .selected span.showed {
    content: "";
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #0a0a0a transparent transparent transparent;
  }

  .custom-select .items {
    color: #0a0a0a;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .custom-select .items div {
    color: #0a0a0a;
    padding-right: 1em;
    cursor: pointer;
    user-select: none;
  }

  .custom-select .items div:hover {

  }

  .selectHide {
    display: none;
  }
</style>
