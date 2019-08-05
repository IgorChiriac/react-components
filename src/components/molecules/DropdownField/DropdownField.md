`<DropdownField />` has exactly the same behaviour as `<TextField />`, the only difference being that it renders a `<Dropdown />` instead of `<InputText />`.

```jsx
import { DropdownField } from '@zopauk/react-components';

<DropdownField label="Your cool dropdown ❤" errorMessage="You need to choose something!" size="short" name="foo">
  <option value="first">First value</option>
  <option value="second">Second value</option>
  <option value="third">Third value</option>
</DropdownField>;
```
