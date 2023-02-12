<template >
    <svg :class="'icon icon-'+id">
        <use :xlink:href="file+'#'+id" :href="file+'#'+id"></use>
    </svg>
</template>
<script>
    export default {
        name: "IconSprite",
        props: {
            id: {required: true},
            file: {default: "icon/sprite.svg"}
        },
        mounted() {
        }
    }
</script>
<style>
    .icon {
        height: 1em;
        width: 1em;
        fill: #000;
        cursor: pointer;
        position: relative;
    }
</style>
