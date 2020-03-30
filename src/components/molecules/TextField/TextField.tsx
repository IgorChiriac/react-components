import React, { forwardRef } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../../atoms/ErrorMessage/ErrorMessage';
import Text from '../../atoms/Text/Text';
import InputText from '../../atoms/InputText/InputText';
import InputLabel from '../../atoms/InputLabel/InputLabel';
import SizedContainer from '../../layout/SizedContainer/SizedContainer';
import { typography } from '../../../constants/typography';
import { colors } from '../../../constants/colors';
import { IField, IInput } from '../../types';

export interface ITextFieldProps extends IField, IInput {
  prefix?: string;
}

export interface IPrefixProps {
  prefix: string;
}

export interface ILabelProps {
  withHelpText?: boolean;
}
const Label = styled(InputLabel)<ILabelProps>`
  ${({ withHelpText }) => withHelpText && `margin-bottom: 0;`}
`;

const FieldError = styled(ErrorMessage)`
  margin-top: 5px;
`;

const HelpText = styled(Text).attrs({
  size: 'small',
})`
  margin-bottom: 5px;
  display: block;
`;

const Prefix = styled.span<IPrefixProps>`
  position: relative;
  display: block;
  
  &::before {
    content: '${({ prefix }: IPrefixProps) => prefix}';
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    font-size: ${typography.sizes.text.base};
    color: ${colors.greyDarkest};
  }
  
  input {
    padding-left: 24px;
  }
`;

const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ label, errorMessage, isValid, name, inputSize, helpText, prefix, ...rest }, ref) => {
    if (!name) {
      throw Error('Name must be set in inputProps. Check the docs.');
    }

    if (prefix && prefix.length > 1) {
      throw Error('Prefixes can only have one character');
    }

    const input = (
      <InputText
        id={`text-id-${name}`}
        type="text"
        hasError={!!errorMessage}
        isValid={isValid}
        aria-label={label ? undefined : name}
        ref={ref}
        name={name}
        {...rest}
      />
    );

    return (
      <>
        {label && (
          <Label withHelpText={!!helpText} htmlFor={`text-id-${name}`}>
            {label}
          </Label>
        )}
        {helpText && <HelpText size="small">{helpText}</HelpText>}
        <SizedContainer size={inputSize}>{prefix ? <Prefix prefix={prefix}>{input}</Prefix> : input}</SizedContainer>
        {errorMessage && <FieldError data-automation={`ZA.error-${name}`}>{errorMessage}</FieldError>}
      </>
    );
  },
);

export default TextField;
