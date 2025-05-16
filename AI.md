---
name: ww-input-checkbox
description: A fully functional checkbox input component for forms that requires the ww-checkbox component for visual representation
keywords: [checkbox, input, form, selection, toggle, boolean]
---

#### ww-input-checkbox

***Purpose:***
Provides a complete checkbox input implementation with form integration, state management, and accessibility support. This component uses ww-checkbox for the visual representation while handling all input logic and form submission.

***Features:***
- Full form integration with validation support
- Accessibility-compliant with native checkbox input
- Customizable container for labels or additional content
- Two-way data binding with real-time updates
- Support for custom validation formulas

***Properties:***
- value: boolean - The initial value of the checkbox. Default: false
- required: boolean - Whether the checkbox is required. Default: false
- readonly: boolean - Whether the checkbox is read-only. Default: false
- fieldName: string - The field name for form submission. Default: ''
- customValidation: boolean - Whether to use custom validation. Default: false
- validation: Formula - Custom validation formula to apply when customValidation is true. Default: ''
- isEmbeddedContainer: boolean - Whether to show an embedded container for additional content. Default: false
- containerPosition: 'right'|'left'|'top'|'bottom' - Position of the embedded container relative to the checkbox. Default: 'right'

***Slots:***
- checkbox: (element) ww-checkbox - The visual checkbox element that displays the check mark. Supports checked and readonly states
- embeddedContainer: (element) ww-div - Optional container for labels or additional content. Hidden when isEmbeddedContainer is false

***Exposed Variables:***
- value: ***READ/WRITE*** The current checkbox value. (path: variables['current_element_uid-value'])

***Events:***
- change: Triggered when the checkbox value changes. Payload: { "domEvent": Event, "value": boolean }
- initValueChange: Triggered when the initial value changes. Payload: { "value": boolean }

***Exposed Element Actions:***
None

***Notes:***
- Uses a hidden native HTML checkbox input for accessibility
- Visual representation provided by the ww-checkbox component
- Integrates with WeWeb forms when placed inside a form container
- States 'checked' and 'readonly' are automatically applied based on value and readonly properties

***Example:***
<elements>
{"uid":0,"tag":"9ecb2cfc-cef7-4be8-b736-3e17a3b7e9ff","name":"Terms Agreement Form","props":{"default":{"validation":"submit","autocomplete":true,"debounceDelay":"500ms"}},"styles":{"default":{"display":"flex","rowGap":"16px"}},"slots":{"formContent":[{"uid":1}]}}
{"uid":1,"tag":"b46ed165-7038-4e4b-8047-6d89cab35051","name":"Terms Agreement Checkbox","props":{"default":{"value":false,"readonly":false,"required":false,"fieldName":"term_and_agreement","validation":"","customValidation":false,"containerPosition":"right","isEmbeddedContainer":true}},"styles":{"default":{"cursor":"pointer","display":"flex","alignItems":"center"}},"slots":{"checkbox":{"uid":2},"embeddedContainer":{"uid":3}}}
{"uid":2,"tag":"97a63460-5c25-4d74-ac1f-86693c2e4a08","name":"Checkbox Icon","states":[{"id":"_wwHover","label":"hover"},{"id":"zna45c","label":"checked"}],"props":{"default":{"icon":"lucide/check","color":"#0075df00","fontSize":14},"zna45c_default":{"color":"#0A89FF"}},"styles":{"default":{"width":"24px","border":"1px solid #c2c7ce","cursor":"pointer","height":"24px","display":"flex","borderRadius":"4px","alignItems":"center","justifyContent":"center"},"_wwHover_default":{"backgroundColor":"rgba(0, 117, 223, 0.1)"}}}
{"uid":3,"tag":"b783dc65-d528-4f74-8c14-e27c934c39b1","name":"Checkbox Label Container","styles":{"default":{"cursor":"pointer","display":"flex","padding":"0 0 0 12px","alignItems":"center"}},"slots":{"children":[{"uid":4}]}}
{"uid":4,"tag":"d7904e9d-fc9a-4d80-9e32-728e097879ad","name":"Terms Agreement Text","props":{"default":{"tag":"p","text":{"0":"N","1":"e","2":"w","3":" ","4":"t","5":"e","6":"x","7":"t","en":"I agree to the terms and conditions"}}},"styles":{"default":{"cursor":"pointer","color":"#2a2f34","fontSize":"14px","fontFamily":"sans-serif","lineHeight":"1.5"}}}
</elements>