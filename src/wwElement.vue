<template>
    <component
        :is="isEditing ? 'div' : 'label'"
        class="ww-webapp-checkbox"
        :style="cssVariables"
        :class="{ editing: isEditing }"
        :for="`${wwElementState.name}-${uniqueId}-${uid}`"
    >
        <input
            :id="`${wwElementState.name}-${uniqueId}-${uid}`"
            ref="checkboxInput"
            :checked="value"
            :value="value"
            type="checkbox"
            :name="`${wwElementState.name}-${uniqueId}-${uid}`"
            :class="{ 'ww-webapp-checkbox__native-input': content.checkbox }"
            :required="content.required"
            :disabled="isReadonly"
            v-bind="attributes"
            @input="handleManualInput($event)"
            @click.stop="handleClick($event)"
            @invalid="handleInvalid($event)"
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
    </component>
</template>

<script>
import { computed, inject, ref, provide } from 'vue';

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
    setup(props, { emit }) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'boolean',
            defaultValue: computed(() => (props.content.value === undefined ? false : props.content.value)),
        });

        // Form integration
        const useForm = inject('_wwForm:useForm', () => {});
        const formInfo = inject('_wwForm:info', null);

        const fieldName = computed(() => props.content.fieldName);
        const validation = computed(() => props.content.validation);
        const customValidation = computed(() => props.content.customValidation);
        const required = computed(() => props.content.required);

        useForm(
            variableValue,
            { fieldName, validation, customValidation, required, initialValue: computed(() => props.content.value) },
            { elementState: props.wwElementState, emit, sidepanelFormPath: 'form', setValue }
        );

        /* wwEditor:start */
        const { createElement } = wwLib.useCreateElement();
        /* wwEditor:end */

        const reactiveCheckboxStates = ref([]);

        // Provide the reactive states to child components
        provide('checkboxStates', reactiveCheckboxStates);

        return {
            variableValue,
            setValue,
            formInfo,
            uniqueId: wwLib.wwUtils.getUid(),
            reactiveCheckboxStates,

            /* wwEditor:start */
            createElement,
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

            const variables = {
                '--container-direction': flexDirection,
            };
            
            // Add container gap
            if (this.content.containerGap) {
                variables['--container-gap'] = this.content.containerGap;
            } else {
                variables['--container-gap'] = '0px';
            }

            return variables;
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
            
            // Update the provided reactive states
            this.reactiveCheckboxStates.splice(0, this.reactiveCheckboxStates.length, ...states);
            
            return states;
        },
    },
    watch: {
        /* wwEditor:start */
        'content.isEmbeddedContainer': {
            async handler(value) {
                if (value && !this.content.embeddedContainer) {
                    const embeddedContainer = await this.createElement('ww-flexbox');
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
            this.logDebug('init value changed', { nextValue: newValue, previousValue: this.value });
            this.setValue(newValue);
            this.$emit('trigger-event', { name: 'initValueChange', event: { value: newValue } });
        },
        'content.required': {
            immediate: true,
            handler(value, oldValue) {
                this.logDebug('required changed', {
                    required: !!value,
                    previousRequired: oldValue === undefined ? undefined : !!oldValue,
                    input: this.getInputDebugInfo(),
                });
            },
        },
        'content.checkbox': {
            immediate: true,
            handler(value) {
                this.logDebug('custom checkbox changed', {
                    hasCustomCheckbox: !!value,
                    input: this.getInputDebugInfo(),
                });
            },
        },
        isReadonly: {
            immediate: true,
            handler(value) {
                this.logDebug('readonly state changed', { readonly: value });
                if (value) {
                    this.$emit('add-state', 'readonly');
                } else {
                    this.$emit('remove-state', 'readonly');
                }
            },
        },
        value: {
            immediate: true,
            handler(value, oldValue) {
                this.logDebug('value state changed', {
                    value,
                    previousValue: oldValue,
                    checkedStateApplied: value && !this.isSelected,
                });
                if (value) {
                    this.$emit('add-state', 'checked');
                } else {
                    this.$emit('remove-state', 'checked');
                }
            },
        },
    },
    mounted() {
        this.logDebug('mounted', {
            input: this.getInputDebugInfo(),
        });
    },
    methods: {
        logDebug(message, payload = {}) {
            console.info(`[ww-input-checkbox] ${message}`, {
                uid: this.uid,
                elementUid: this.wwElementState?.uid,
                elementName: this.wwElementState?.name,
                fieldName: this.content.fieldName || this.wwElementState?.name,
                value: this.value,
                required: !!this.content.required,
                readonly: this.isReadonly,
                form: this.getFormDebugInfo(),
                ...payload,
            });
        },
        getFormDebugInfo() {
            if (!this.formInfo) return null;

            return {
                uid: this.formInfo.uid,
                componentId: this.formInfo.componentId,
                name: this.formInfo.name?.value,
                validationType: this.formInfo.validationType?.value,
                debounceDelay: this.formInfo.debounceDelay?.value,
            };
        },
        getInputDebugInfo() {
            const input = this.$refs.checkboxInput;
            if (!input || typeof window === 'undefined') return null;

            const rect = input.getBoundingClientRect();
            const styles = window.getComputedStyle(input);

            return {
                id: input.id,
                name: input.name,
                className: input.className,
                checked: input.checked,
                required: input.required,
                disabled: input.disabled,
                willValidate: input.willValidate,
                validationMessage: input.validationMessage,
                validity: {
                    valid: input.validity.valid,
                    valueMissing: input.validity.valueMissing,
                    customError: input.validity.customError,
                },
                rect: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                },
                styles: {
                    position: styles.position,
                    top: styles.top,
                    right: styles.right,
                    bottom: styles.bottom,
                    left: styles.left,
                    width: styles.width,
                    height: styles.height,
                    opacity: styles.opacity,
                    pointerEvents: styles.pointerEvents,
                    display: styles.display,
                    visibility: styles.visibility,
                },
            };
        },
        handleClick(event) {
            this.logDebug('click', {
                nativeChecked: event.target.checked,
                input: this.getInputDebugInfo(),
            });
        },
        handleInvalid(event) {
            this.logDebug('native invalid event', {
                defaultPrevented: event.defaultPrevented,
                input: this.getInputDebugInfo(),
            });
        },
        handleManualInput(event) {
            const value = !!event.target.checked;
            this.logDebug('input event', {
                nextValue: value,
                previousValue: this.value,
                sameValue: value === this.value,
                input: this.getInputDebugInfo(),
            });
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
    --container-gap: 0;
}
.ww-webapp-checkbox {
    flex-direction: var(--container-direction);
    align-items: center;
    position: relative;
    isolation: isolate;
    gap: var(--container-gap);

    &__native-input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        cursor: pointer;
    }
}
</style>
