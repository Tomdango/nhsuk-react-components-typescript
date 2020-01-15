# Checkboxes

This component can be found in the `nhsuk-frontend` repository [here](https://github.com/nhsuk/nhsuk-frontend/tree/master/packages/components/checkboxes).

## Implementation Notes

For details on the new form design pattern, check the documentation for the `Form` component.

The `Checkbox` component provides a `CheckboxContext` context, which the `Checkbox.Box` components use. When each box initially renders, it will attempt to assign itself an `id` by calling the `getBoxId` method in the context. This will assign each box a sequential ID using either the `idPrefix` or `name` supplied to the Checkbox. If neither are provided, the element will generate it's own unique identifier.

## Usage

**Note:** More detailed implementations can be found in the [Storybook](https://tomdango.github.io/nhsuk-react-components).

### Standard

```jsx
import { Checkboxes } from "nhsuk-react-components";

const Element = () => {
    return (
        <CareCard type="non-urgent">
            <CareCard.Heading>Speak to a GP if:</CareCard.Heading>
            <CareCard.Content>
                <ul>
                    <li>you're not sure it's chickenpox</li>
                    <li>the skin around the blisters is red, hot or painful (signs of infection)</li>
                    <li>your child is <a href="https://www.nhs.uk/conditions/dehydration">dehydrated</a></li>
                    <li>you're concerned about your child or they get worse</li>
                </ul>
                <p>Tell the receptionist you think it's chickenpox before going in. They may recommend a special appointment time if other patients are at risk.</p>
            </CareCard.Content>
        </CareCard>
    );
}
```
