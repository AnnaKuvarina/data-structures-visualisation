<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Home from './components/Home.vue';
    import Header from './components/Header.vue';

    @Component({
        components: {
            Home,
            Header
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .visualisation-field {
        margin: 10px auto;
        width: 900px;
        height: 70vh;
        border: 1px solid #989b9c;
        border-radius: 10px;
        box-shadow:
                2px 2px 4px 1px rgba(0, 0, 0, 0.25),
                -2px -2px 4px 1px rgba(215, 206, 206, 0.25);
    }
</style>
