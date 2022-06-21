<template>
    <header>
        <md-toolbar>
            <transition name="fade">
                <router-link :to="homeRoute.linkPath" class="nav-link">
                    {{ homeRoute.title }}
                </router-link>
            </transition>

            <md-menu
                    md-direction="bottom-end"
                    md-size="medium"
                    v-bind:class="{'md-menu-active': isListShown}"
            >
                <button @click="toggleList()" ref="show-list-button" class="md-button">
                    Data structures
                </button>

                <transition name="fade">
                    <ul
                            class="nav-list" v-if="isListShown"
                            v-outside-click="{
                                exceptions: 'show-list-button',
                                handler: 'hideList'
                            }"
                    >
                        <li
                                class="nav-item"
                                v-for="name in dataStructures"
                                :key="name.title"
                                v-on:click="hideList()"
                        >
                            <router-link :to="name.linkPath" class="nav-link">
                                {{ name.title }}
                            </router-link>
                        </li>
                    </ul>
                </transition>
            </md-menu>
        </md-toolbar>
    </header>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { routesConfig } from '@/configs/routes.config';

    @Component
    export default class Header extends Vue {
        homeRoute = routesConfig.home;
        dataStructures = routesConfig.dataStructures;
        isListShown = false;

        toggleList() {
            this.isListShown = !this.isListShown;
        }

        hideList() {
            this.isListShown = false;
        }
    }
</script>

<style scoped lang="scss">
    a.nav-link {
        margin-right: 10px;
        color: #2c3e50;
        text-transform: uppercase;
        padding: 8px;

        &:hover {
            text-decoration: none;
            background: #e6e8ea;
            border-radius: 2px;
            box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
        }
    }

    .nav {
        &-list {
            margin: 0;
            padding: 10px 0 0;
            position: absolute;
            top: 100%;
            width: 100%;
            list-style: none;
            background: #fff;
            border-radius: 2px;
            box-shadow: 2px 3px 2px 1px rgba(0, 0, 0, 0.2);
        }

        &-item {
            text-align: left;
            width: 100%;

            .nav-link {
                margin: 0;
                padding: 8px;
                display: block;
            }
        }
    }

    .md {
        &-button {
            color: #2c3e50;
            padding: 8px;
        }

        &-menu {
            position: relative;

            &:hover,
            &-active {
                box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.2);
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
