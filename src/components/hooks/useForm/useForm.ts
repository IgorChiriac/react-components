import { useState, useCallback, useMemo } from 'react';

type TValue = any;

export type TValues = Record<string, TValue>;

export type TErrors = Record<string, string | undefined>;

export interface IUseFormProps {
  initialValues: TValues;
  onSubmit: (values: TValues) => void;
  validate?: (values: TValues) => Promise<TErrors> | TErrors;
}

export interface IFieldProps {
  error: string | undefined;
  touched: boolean;
  value: TValue;
  onChange: (e: any) => void;
  onBlur: () => void;
}

export interface TUseFormValues {
  getFieldProps: (name: string) => IFieldProps;
  invalid: boolean;
  handleSubmit: (values: TValues) => void;
}

const useForm = ({ initialValues, validate, onSubmit }: IUseFormProps): TUseFormValues => {
  const [values, updateValues] = useState(initialValues);
  const [errors, updateErrors] = useState(validate ? validate(initialValues) : {});
  const [touched, updateTouched] = useState<Record<string, boolean>>({});

  const runValidation = async formValues => {
    if (validate) {
      const errors = await validate(formValues);
      updateErrors(errors);
    }
  };

  const invalid = useMemo(() => !!Object.keys(errors).length, [errors]);

  const getFieldProps = useCallback(
    name => ({
      error: errors[name],
      touched: !!touched[name],
      value: values[name],
      onChange(value) {
        const newValues = { ...values, [name]: value };
        updateValues(newValues);
        runValidation(newValues);
      },
      onBlur() {
        updateTouched({ ...touched, [name]: true });
      },
    }),
    [errors, runValidation, touched, values],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      updateTouched(
        Object.keys(initialValues).reduce(
          (acc, key) => ({
            ...acc,
            [key]: true,
          }),
          {},
        ),
      );
      if (!invalid) {
        onSubmit(values);
      }
    },
    [invalid, onSubmit, values],
  );

  return {
    getFieldProps,
    invalid,
    handleSubmit,
  };
};

export default useForm;
