<template>
    <main>
        <h2>Binary Tree</h2>
        <DataForm
                :enteredValue="nodeValue"
                @inputValue="setNodeValue"
                @addValue="addNode"
        />
        <canvas id="binary-tree" width="900" height="550" class="visualisation-field"></canvas>
    </main>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import DataForm from '@/components/DataForm.vue';
    import { BinaryTreeVisualisation } from '@/dataStructures/BinaryTreeVisualisation';

    Component.registerHooks([
        'mounted'
    ])

    @Component({
        components: { DataForm }
    })
    export default class BinaryTreePage extends Vue {
        private tree: BinaryTreeVisualisation | any;
        nodeValue = '';

        mounted() {
            this.tree = new BinaryTreeVisualisation();
        }

        setNodeValue(newValue: string) {
            this.nodeValue = newValue;
        }

        addNode() {
            if (this.nodeValue) {
                const nodeValue = Number.parseInt(this.nodeValue, 10);
                this.tree.insertNode(nodeValue);

                this.setNodeValue('');
            }
        }
    }
</script>

<style scoped>
    #binary-tree {
        height: 70vh;
    }

    h2 {
        padding: 15px 0 0;
        margin: 5px auto 0;
        font-weight: 400;
    }
</style>
