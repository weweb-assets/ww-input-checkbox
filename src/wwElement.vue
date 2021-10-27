<template>
    <div
        class="ww-webapp-checkbox"
        :style="cssVariables"
        :class="{ editing: isEditing, selected: isSelected }"
        @click="checked = !checked"
    >
        <input ref="checkboxInput" v-model="checked" type="checkbox" />
        <wwElement
            v-if="content.isEmbeddedContainer"
            class="embedded-container"
            v-bind="content.embeddedContainer"
        ></wwElement>

        <!-- wwEditor:start -->
        <div class="ww-webapp-checkbox__menu">
            <wwEditorIcon small name="fontawesome/solid/check-square" />
        </div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
    },
    emits: ['update:content:effect', 'trigger-event'],
    data() {
        return {
            internalChecked: false,
        };
    },
    computed: {
        checked: {
            get() {
                if (!this.content.variable) return this.internalChecked;
                return wwLib.wwVariable.getValue(this.content.variable);
            },
            set(value) {
                if (!this.content.variable) {
                    this.internalChecked = value;
                    return;
                }
                wwLib.wwVariable.updateValue(this.content.variable, value);
                this.$emit('trigger-event', { name: 'change', event: { value } });
            },
        },
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isSelected() {
            /* wwEditor:start */
            return this.wwEditorState.isSelected;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        cssVariables() {
            let flexDirection = 'row';
            if (this.content.containerPosition === 'left' || this.content.containerPosition === 'right') {
                if (this.content.containerPosition === 'left') flexDirection = 'row-reverse';
                else flexDirection = 'row';
            } else {
                if (this.content.containerPosition === 'top') flexDirection = 'column-reverse';
                else flexDirection = 'column';
            }

            return {
                '--container-direction': flexDirection,
            };
        },
    },
    watch: {
        'content.isEmbeddedContainer': {
            async handler(value) {
                if (value && !this.content.embeddedContainer) {
                    const embeddedContainer = await wwLib.createElement('ww-flexbox');
                    this.$emit('update:content:effect', { embeddedContainer });
                } else if (!value) {
                    this.$emit('update:content:effect', { embeddedContainer: null });
                }
            },
        },
    },
};
</script>

<style lang="scss" scoped>
:root {
    --container-direction: row;
}
.ww-webapp-checkbox {
    display: flex;
    flex-direction: var(--container-direction);
    align-items: center;

    /* wwEditor:start */
    &__status {
        position: absolute;
        top: -1px;
        color: var(--ww-color-white);
        padding: var(--ww-spacing-00) var(--ww-spacing-01);
        border-radius: var(--ww-spacing-00);
        background-color: var(--ww-color-blue-500);
        z-index: 10;
        opacity: 0;
        pointer-events: none;
        right: -1px;
    }
    &.selected {
        > .ww-webapp-checkbox__status {
            opacity: 1;
            pointer-events: all;
        }
    }
    &.editing:hover {
        & > .border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid var(--ww-editor-color);
            pointer-events: none;
            z-index: 10;
        }
        > .ww-webapp-checkbox__menu {
            opacity: 1;
            pointer-events: all;
        }
    }
    &__menu {
        display: flex;
        position: absolute;
        top: 0px;
        left: 5px;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        padding: var(--ww-spacing-01);
        transition: opacity 0.2s ease;
        z-index: 101;
        cursor: pointer;
        background-color: var(--ww-color-blue-500);
        color: var(--ww-color-white);
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
    /* wwEditor:end */
}
</style>
