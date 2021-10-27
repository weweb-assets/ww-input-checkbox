export default {
    editor: {
        label: {
            en: 'Checkbox',
            fr: 'Checkbox',
        },
        icon: 'fontawesome/solid/check-square',
    },
    triggerEvents: [{ name: 'change', label: { en: 'On change' }, event: { value: '' } }],
    properties: {
        name: {
            label: { en: 'Name', fr: 'Name' },
            type: 'Text',
            options: { placeholder: 'Name' },
            section: 'settings',
            defaultValue: 'checkbox',
        },
        isEmbeddedContainer: {
            type: 'OnOff',
            label: {
                en: 'Embedded container',
                fr: 'Embedded container',
            },
            section: 'settings',
            responsive: true,
            defaultValue: false,
        },
        containerPosition: {
            hidden: content => !content.isEmbeddedContainer,
            label: {
                en: 'Container position',
                fr: 'Position du container',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'right', label: { en: 'Right' } },
                    { value: 'left', label: { en: 'Left' } },
                    { value: 'top', label: { en: 'Top' } },
                    { value: 'bottom', label: { en: 'Bottom' } },
                ],
            },
            section: 'settings',
            responsive: true,
            defaultValue: 'right',
        },
        variable: {
            label: {
                en: 'Associated variable (Boolean)',
            },
            type: 'Variable',
            options: {
                type: 'Boolean',
            },
            section: 'settings',
            bindable: true,
            defaultValue: null,
        },
        embeddedContainer: {
            hidden: true,
            defaultValue: null,
        },
    },
};
