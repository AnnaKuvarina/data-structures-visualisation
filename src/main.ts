import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from '@/routes';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.use(VueRouter);

Vue.directive('outside-click', {
    bind: function (el: any, binding, vnode: any) {
        el.clickOutsideEvent = function (event: any) {
            event.stopPropagation();
            const { exceptions, handler } = binding.value;

            let clickedOnExcludedEl;

            const excludedEl = vnode.context.$refs[exceptions];
            clickedOnExcludedEl = excludedEl.contains(event.target);

            if (!(el.contains(event.target) || clickedOnExcludedEl)) {
                vnode.context[handler](event);
            }
        };

        document.body.addEventListener('click', el.clickOutsideEvent);
    },

    unbind: function (el: any) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
