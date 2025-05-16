---
name: ww-input-checkbox
description: A fully functional checkbox input component for forms that requires the ww-checkbox component for visual representation
keywords: checkbox, input, form, selection, toggle, boolean
---

#### Input Checkbox

Properties:
- `value`: `boolean` - The initial value of the checkbox. Default: `false`
- `required`: `boolean` - Whether the checkbox is required. Default: `false`
- `readonly`: `boolean` - Whether the checkbox is read-only. Default: `false`
- `fieldName`: `string` - The field name for form submission. Default: `''`
- `customValidation`: `boolean` - Whether to use custom validation. Default: `false`
- `validation`: `Formula` - Custom validation formula to apply when customValidation is true. Default: `''`

Layout Options:
- `isEmbeddedContainer`: `boolean` - Whether to show an embedded container for additional content. Default: `false`
- `containerPosition`: `'right' | 'left' | 'top' | 'bottom'` - Position of the embedded container relative to the checkbox. Default: `'right'`

Hidden Properties:
- `embeddedContainer`: `object` - The embedded container element configuration (auto-generated when isEmbeddedContainer is true)
- `checkbox`: `object` - The visual checkbox element configuration (uses ww-checkbox component)

Events:
- `change`: Triggered when the checkbox value changes
- `initValueChange`: Triggered when the initial value changes

States:
- `checked`: Applied when the checkbox is checked
- `readonly`: Applied when the checkbox is read-only

Behavior:
- Uses a hidden native HTML checkbox input for accessibility
- Visual representation provided by the ww-checkbox component
- Supports custom container for labels or additional content
- Provides two-way binding with value updates
- Integrates with WeWeb forms when placed inside a form container