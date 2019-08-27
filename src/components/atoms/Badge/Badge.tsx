import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import CheckMark from '../../icons/CheckMark/CheckMark';
import Text from '../Text/Text';

type TStyling = 'confirmed' | 'default' | 'invalid' | 'waiting';
type IBgColors = { [S in TStyling]: string };
type IFontColors = { [S in TStyling]: string };

interface IStyledBadgeProps {
  /**
   * The style you want to assign to your badge.
   */
  styling?: TStyling;
}

interface IBadgeProps extends IStyledBadgeProps {
  /**
   * The string of text you want to render in your badge
   */
  children: string;
}

const backgroundColors: IBgColors = {
  confirmed: colors.semantic.success,
  default: colors.neutral.dark,
  invalid: colors.semantic.error,
  waiting: colors.semantic.alert,
};

const fontColors: IFontColors = {
  confirmed: colors.neutral.white,
  default: colors.neutral.white,
  invalid: colors.neutral.white,
  waiting: colors.neutral.dark,
};

const StyledBadge = styled(Text)<IStyledBadgeProps>`
  color: ${({ styling }) => styling && fontColors[styling]};
  background-color: ${({ styling }) => styling && backgroundColors[styling]};
  display: inline-block;
  padding: 3px 8px;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
`;

const StyledCheckMark = styled(CheckMark)`
  display: inline-block;
  margin-right: 5px;
`;

function Badge({ children, styling, ...rest }: IBadgeProps) {
  return (
    <StyledBadge styling={styling} {...rest}>
      {styling === 'confirmed' && <StyledCheckMark color={fontColors.confirmed} />}
      {children}
    </StyledBadge>
  );
}

Badge.defaultProps = {
  styling: 'default',
};

export default Badge;
