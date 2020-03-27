import { axe } from 'jest-axe';
import React from 'react';
import { render } from '@testing-library/react';
import { colors } from '../../../constants/colors';
import { typography } from '../../../constants/typography';
import Heading from './Heading';
const {
  sizes: { heading: headingSizes },
} = typography;

describe('<Heading />', () => {
  it('renders without  a11y violations', async () => {
    const { container } = render(<Heading as="h1">Text</Heading>);
    const results = await axe(container.innerHTML);

    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it.each`
    tag     | expectedSize
    ${'h1'} | ${headingSizes.h1}
    ${'h2'} | ${headingSizes.h2}
    ${'h3'} | ${headingSizes.h3}
    ${'h4'} | ${headingSizes.h4}
    ${'h5'} | ${headingSizes.h5}
    ${'h6'} | ${headingSizes.h6}
  `('it can render with a different HTML tag: $tag', ({ tag, expectedSize }) => {
    const { container } = render(<Heading as={tag}>Header</Heading>);

    expect(container.firstChild).toHaveStyleRule('font-size', expectedSize);
    expect(container.querySelector(tag)).not.toBe(null);
  });

  it('allows to control the size despite the rendered HTML tag', () => {
    const { container } = render(
      <Heading as="h1" size="h3">
        Header
      </Heading>,
    );

    expect(container.firstChild).toHaveStyleRule('font-size', headingSizes.h3);
  });

  it('renders with H4 size as default when rendering a `span`', () => {
    const { container } = render(<Heading as="span">Header</Heading>);

    expect(container.firstChild).toHaveStyleRule('font-size', headingSizes.h4);
  });

  it('allows to control the size when rendering as a `span`', () => {
    const { container } = render(
      <Heading as="span" size="h4">
        Header
      </Heading>,
    );

    expect(container.firstChild).toHaveStyleRule('font-size', headingSizes.h4);
  });

  it.each`
    hex                     | name
    ${colors.neutral.white} | ${'White'}
    ${colors.neutral.dark}  | ${'Dark'}
  `('can render in different colors: $name – $hex', ({ hex }) => {
    const { container } = render(
      <Heading as="h2" color={hex}>
        Text
      </Heading>,
    );
    expect(container.firstChild).toHaveStyleRule('color', hex);
  });

  it('can render without margin bottom', () => {
    const { container } = render(
      <Heading as="h1" mb={false}>
        Header
      </Heading>,
    );

    expect(container.firstChild).toHaveStyleRule('margin', '0');
  });
});