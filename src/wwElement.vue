<template v-if="content.globalSettings">
    <div class="ww-form-checkbox">
        <input
            :id="`${content.globalSettings.name}-${uniqueId}-${uid}`"
            class="ww-form-checkbox__elem"
            :class="{ editing: isEditing }"
            type="checkbox"
            :name="`${content.globalSettings.name}-${uniqueId}-${uid}`"
            :required="content.globalSettings.required"
        />
        <component :is="isEditing ? 'div' : 'label'" :for="`${content.globalSettings.name}-${uniqueId}-${uid}`">
            <wwElement v-bind="content.wwObject" />
        </component>
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
        uid: { type: String, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    setup() {
        return { uniqueId: wwLib.wwUtils.getUid() };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-form-checkbox {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    padding: 0.4rem 0;
    align-items: center;
    &__elem {
        outline: none;
        margin-right: 0.8rem;
        /* wwEditor:start */
        &.editing {
            pointer-events: none;
        }
        /* wwEditor:end */
    }
}
</style>
