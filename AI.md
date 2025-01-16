---
name: ww-input-checkbox
description: The `ww-input-checkbox` component provides a customizable checkbox input field that allows users to make binary choices, with options to embed additional content using a flexbox container and configure properties such as initial value, requirement, and read-only status.
keywords:
  - checkbox input
  - binary choice
  - toggle setting
  - boolean value
  - required field
  - read-only checkbox
  - embedded container
  - container position
  - ww-checkbox customization
  - ww-flexbox integration
---

#### ww-input-checkbox

Renders a checkbox input field for binary choice or toggle settings.

Properties:
- value: boolean - Initial checkbox value. Default: false
- required: boolean - If checkbox is required. Default: false
- readonly: boolean - If checkbox is read-only. Default: false
- isEmbeddedContainer: boolean - Enable container embedding. Default: false
- containerPosition: 'right' | 'left' | 'top' | 'bottom' - Container position. Default: "right"

Children:
- checkbox: Component(ww-checkbox) - Customizes checkbox appearance. Requires checked state
- embeddedContainer: Component(ww-flexbox) - Container for additional elements when isEmbeddedContainer is true

Example:
{"tag":"ww-input-checkbox","props":{"default":{"readonly":false,"required":false,"containerPosition":"right","isEmbeddedContainer":true}},"children":{"checkbox":{"tag":"ww-checkbox","states":[{"id":"R0Xabo","label":"checked"}],"props":{"default":{"icon":"fas fa-check","color":"transparent","fontSize":10},"R0Xabo_default":{"color":"#FFFFFF"}},"styles":{"default":{"width":"auto","border":"1px solid #767676","cursor":"pointer","height":"auto","padding":"2px","borderRadius":"4px","backgroundColor":"#FFFFFF"},"R0Xabo_default":{"borderColor":"#767676"}}},"embeddedContainer":{"tag":"ww-flexbox","styles":{"default":{"padding":"0 0 0 6px","flexWrap":true,"flexDirection":"row"}},"children":{"children":[{"tag":"ww-text","props":{"default":{"tag":"p","text":{"en":"<div>Checkbox</div>"}}},"styles":{"default":{"fontSize":"16px"}}}]}}}}

Events:
- change: Triggered when checkbox value changes
  Payload: { value: boolean, domEvent: Event }
- initValueChange: Triggered when initial value changes
  Payload: { value: boolean }

Variables:
- value: boolean - Current checkbox state

Note: Don't forget checked state on ww-checkbox, otherwise it will not work. Always give non-active styles if checked is not active.
