export default {
    editor: {
        label: {
            en: 'Checkbox',
            fr: 'Checkbox',
        },
        icon: 'fontawesome/solid/check-square',
    },
    triggerEvents: [
        { name: 'change', label: { en: 'On change' }, event: { value: '' }, default: true },
        { name: 'initValueChange', label: { en: 'On init value change' }, event: { value: '' } },
    ],
    properties: {
        value: {
            label: {
                en: 'Init value',
            },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
        },
        required: {
            label: 'Required',
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
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
        checkbox: {
            hidden: true,
            defaultValue: {
                isWwObject: true,
                type: 'ww-checkbox',
                content: {
                    color: '#FFFFFF',
                    fontSize: 10,
                    icon: 'fas fa-check',
                },
                state: {
                    states: ['checked'],
                    style: {
                        default: {
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #767676',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            height: 'auto',
                            padding: '2px',
                            width: 'auto',
                        },
                        checked_default: {
                            backgroundColor: '#767676',
                        },
                    },
                },
            },
        },
    },
};
