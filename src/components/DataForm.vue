<template>
    <form v-on:submit.prevent class="data-form">
        <md-field>
            <input
                    :value="enteredValue"
                    @input="inputValue"
                    placeholder="Node value"
                    class="data-value"
                    type="number"
            >
        </md-field>
        <md-button
                class="md-raised"
                @click="addValue"
                type="submit"
        >Add item</md-button>
    </form>
</template>

<script>
    export default {
        name: "DataForm",
        props: {
            enteredValue: String,
        },
        methods: {
            inputValue: function (event) {
                const { value } = event.target;
                this.$emit('inputValue', value);
            },

            addValue() {
                this.$emit('addValue');
            }
        }
    }
</script>

<style scoped lang="scss">
    .data {
        &-form {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }

        &-value {
            font-size: 14px;
            border: solid #8897aa;
            border-width: 0 0 1px 0;
            box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.1);
            transition: all 0.5s;

            &:hover,
            &:focus {
                border-color: #2a25c7;
                outline: none;
            }
        }
    }

    .md-field {
        width: auto;
        margin: 0 0 10px;
        padding-top: 10px;
    }
</style>
