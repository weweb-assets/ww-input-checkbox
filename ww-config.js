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
        value: {
            label: {
                en: 'Value',
            },
            type: 'OnOff',
            section: 'settings',
            bindable: true
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
