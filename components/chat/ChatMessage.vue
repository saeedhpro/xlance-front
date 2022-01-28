<template>
  <div v-if="type === 'text'" class="message-box" :class="float ? 'left' : ''">
    <span class="ir-light">{{body}}</span>
    <span class="created_at ir-light text-sm text-gray-500">{{ ($moment(created_at).format('HH:mm - jYYYY/jM/jDD')) | toPersianNumber }}</span>
  </div>
  <div v-else class="message-box" :class="float ? 'left' : ''">
    <span v-if="file" class="ir-light">
      <img v-if="isImage(file.path)" :alt="file.name" :src="file.path">
      <a v-else download :href="file.path">{{file.name}}</a>
    </span>
    <span class="created_at ir-light text-sm text-gray-500">{{ ( $moment(created_at).format('HH:mm - jYYYY/jM/jDD') ) | toPersianNumber }}</span>
  </div>
</template>

<script>
    export default {
        name: "ChatMessage",
        props: {
            type: {
                type: String,
                required: true,
                default: 'text'
            },
            body: {
                type: String,
                default: ''
            },
            file: {
                type: Object | null,
                required: true,
                default: null
            },
            float: {
                type: Boolean,
                default: false
            },
            created_at: {
                type: String,
                required: true
            }
        },
        methods: {
            isImage(url) {
                return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
            }
        }
    }
</script>

<style scoped lang="scss">

  .message-box {
    background: #C2FFE8 0 0 no-repeat padding-box;
    border-radius: 8px 8px 0 8px;
    padding: 12px;
    margin: 12px;
    width: 80%;
    min-width: 293px;
    float: right;
    display: flex;
    flex-direction: column;
    &.left {
      border-radius: 8px 8px 8px 0;
      float: left;
      background: #EEEEEE 0% 0% no-repeat padding-box;
      .created_at {
        text-align: left;
      }
    }
    span {
      padding: 16px;
      line-height: 22px;
      letter-spacing: 0;
      color: #212121;
    }
    .created_at {
      text-align: left;
    }
  }
</style>
