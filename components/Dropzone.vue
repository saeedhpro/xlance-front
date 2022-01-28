<template>
  <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
</template>

<script>
    export default {
        name: "Dropzone",
        data() {
            return {
                // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
                options: {
                    url: "http://httpbin.org/anything"
                }
            }
        },
        mounted() {
            // Everything is mounted and you can access the dropzone instance
            const instance = this.$refs.el.dropzone
        }
    }
</script>
