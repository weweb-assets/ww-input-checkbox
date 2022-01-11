export default {
    editor: {
        label: { fr: 'Case à choser de formulaire', en: 'Form checkbox' },
    },
    properties: {
        globalSettings: {
            type: 'Object',
            section: 'settings',
            options: {
                item: {
                    name: {
                        label: { en: 'Name', fr: 'Name' },
                        type: 'Text',
                        options: { placeholder: 'Name' },
                    },
                    required: {
                        label: { en: 'Required', fr: 'Requis' },
                        type: 'OnOff',
                    },
                },
            },
            defaultValue: { name: '', required: true },
        },
        wwObject: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
    },
};
