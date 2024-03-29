<template>
    <component
        :is="isEditing ? 'div' : 'label'"
        class="ww-webapp-checkbox"
        :style="cssVariables"
        :class="{ editing: isEditing, selected: isSelected }"
        :for="`${wwElementState.name}-${uniqueId}-${uid}`"
    >
        <input
            :id="`${wwElementState.name}-${uniqueId}-${uid}`"
            ref="checkboxInput"
            :checked="value"
            :value="value"
            type="checkbox"
            :name="`${wwElementState.name}-${uniqueId}-${uid}`"
            :class="content.checkbox && 'hidden'"
            :required="content.required"
            :disabled="isReadonly"
            v-bind="attributes"
            @input="handleManualInput($event)"
            @click.stop
        />
        <component
            :is="isEditing ? 'div' : 'label'"
            v-if="content.checkbox"
            :for="`${wwElementState.name}-${uniqueId}-${uid}`"
        >
            <wwElement v-bind="content.checkbox" :states="checkboxStates"></wwElement>
        </component>

        <component :is="isEditing ? 'div' : 'label'" :for="`${wwElementState.name}-${uniqueId}-${uid}`">
            <wwElement
                v-if="content.isEmbeddedContainer"
                class="embedded-container"
                v-bind="content.embeddedContainer"
            ></wwElement>
        </component>

        <!-- wwEditor:start -->
        <div class="ww-webapp-checkbox__menu">
            <wwEditorIcon small name="chevron-down" />
        </div>
        <!-- wwEditor:end -->
    </component>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
        wwFrontState: { type: Object, required: true },
        wwElementState: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['update:content:effect', 'trigger-event', 'add-state', 'remove-state'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'boolean',
            defaultValue: computed(() => (props.content.value === undefined ? false : props.content.value)),
        });

        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */

        return { 
            variableValue, 
            setValue, 
            uniqueId: wwLib.wwUtils.getUid(), 
            
            /* wwEditor:start */
            createElement  
            /* wwEditor:end */
        };
    },
    computed: {
        value() {
            return !!this.variableValue;
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
        isReadonly() {
            /* wwEditor:start */
            if (this.wwEditorState.isSelected) {
                return this.wwElementState.states.includes('readonly');
            }
            /* wwEditor:end */
            return this.wwElementState.props.readonly === undefined
                ? this.content.readonly
                : this.wwElementState.props.readonly;
        },
        attributes() {
            return this.wwElementState.props.attributes;
        },
        checkboxStates() {
            const states = [];
            if (this.value && !this.isSelected) {
                states.push('checked');
            }
            if (this.isReadonly) {
                states.push('readonly');
            }
            return states;
        },
    },
    watch: {
        /* wwEditor:start */
        'content.isEmbeddedContainer': {
            async handler(value) {
                if (value && !this.content.embeddedContainer) {
                    const embeddedContainer = await this.createElement(
                        'ww-flexbox'
                    );
                    this.$emit('update:content:effect', { embeddedContainer });
                } else if (!value) {
                    this.$emit('update:content:effect', { embeddedContainer: null });
                }
            },
        },
        /* wwEditor:end */
        'content.value'(newValue) {
            newValue = !!newValue;
            if (newValue === this.value) return;
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
        isReadonly: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.$emit('add-state', 'readonly');
                } else {
                    this.$emit('remove-state', 'readonly');
                }
            },
        },
    },
    methods: {
        handleManualInput(event) {
            const value = !!event.target.checked;
            if (value === this.value) return;
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { domEvent: event, value } });
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
    position: relative;

    & .hidden {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        pointer-events: none;
    }

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

    &.editing {
        pointer-events: none;
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
