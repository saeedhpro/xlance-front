<template>
<PostFormat/>
</template>

<script>
    import PostFormat from "../../../components/dashboard/socialMedia/PostFormat";
    export default {
        name: "index.vue",
        components: {PostFormat},
        middleware:'auth',

    }
</script>
