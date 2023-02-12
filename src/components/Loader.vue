<template>
    <div class="loader" v-if="loader">
        <div class="loader__element" ></div>
    </div>
</template>

<script>

    export default {
        name: "LoaderView",
        props: {
            loader:{default: true}
        },
        data: () => ({

        }),
        methods: {}
    }
</script>

<style lang="scss">
    :root {
        --main-color: #111;
        --loader-color: #9698a2;
        --back-color: #dbdfed;
        --time: 3s;
        --size: 3px;
    }

    .loader {
        background-color: var(--main-color);
        overflow: hidden;
        width: 100%;
        position: absolute;
        //left: -70px;

        display: flex;
        align-items: center;
        align-content: center;
        justify-content: flex-start;
        z-index: 1;
        left: 0;
        top: 0;
    }

    .loader__element {
        height: var(--size);
        width: 100%;
        background: var(--back-color);

    }

    .loader__element:before {
        content: '';
        display: block;
        background-color: var(--loader-color);
        height: var(--size);
        width: 0;
        animation: getWidth var(--time) ease-in infinite;
    }

    @keyframes getWidth {
        100% { width: 100%; }
    }
</style>
