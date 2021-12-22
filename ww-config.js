export default {
    editor: {
        label: {
            en: 'Checkbox',
            fr: 'Checkbox',
        },
        icon: 'fontawesome/solid/check-square',
        menuOptions: {
            quick: {
                label: { en: 'Checkbox' },
                sections: ['variableId', 'initialValue'],
            },
        },
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
        variableId: {
            label: {
                en: 'Associated variable (Boolean)',
            },
            type: 'Variable',
            options: {
                types: ['Boolean'],
            },
            section: 'settings',
            defaultValue: null,
            hidden: content => !content.variableId,
        },
        initialValue: {
            label: {
                en: 'Initial value',
            },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            hidden: content => content.variableId,
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
        embeddedContainer: {
            hidden: true,
            defaultValue: null,
        },
    },
};
