<template>
    <main>
        <h2>Linked List</h2>
        <DataForm
                :entered-value="nodeValue"
                @inputValue="setNodeValue"
                @addValue="addNode"
        />
        <canvas id="linked-list" width="900" height="550" class="visualisation-field"></canvas>
    </main>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import DataForm from '@/components/DataForm.vue';
    import { LinkedListVisualisation } from '@/dataStructures/LinkedListVisualisation';

    Component.registerHooks([
        'mounted'
    ])

    @Component({
        components: { DataForm }
    })
    export default class LinkedListPage extends Vue {
        nodeValue = '';
        private list: LinkedListVisualisation | any;

        mounted() {
            this.list = new LinkedListVisualisation({ elementId: 'linked-list' });
        }

        setNodeValue(newValue: string) {
            this.nodeValue = newValue;
        }

        addNode() {
            if (this.nodeValue) {
                const value = Number.parseInt(this.nodeValue, 10);
                this.list.insertNode(value);
                this.setNodeValue('');
            }
        }
    }
</script>

<style scoped lang="scss">
    #linked-list {
        height: 70vh;
    }

    h2 {
        padding: 15px 0 0;
        margin: 5px auto 0;
        font-weight: 400;
    }
</style>
