import { routesConfig } from '@/configs/routes.config';
import BinaryTreePage from '@/components/BinaryTreePage.vue';
import Home from '@/components/Home.vue';
import LinkedListPage from '@/components/LinkedListPage.vue';

export const routes = [
    { path: routesConfig.home.path, component: Home,  },
    { path: routesConfig.dataStructures.binaryTree.path, component: BinaryTreePage },
    { path: routesConfig.dataStructures.linkedList.path, component: LinkedListPage }
]
