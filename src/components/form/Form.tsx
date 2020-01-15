import React, { HTMLProps, useState } from 'react';
import classNames from 'classnames';
import FormContext from './FormContext';

const Form: React.FC<HTMLProps<HTMLFormElement>> = ({ className, ...rest }) => {
  const [errors, setErrors] = useState<Array<string>>([]);

  const setError = (name: string, hasError: boolean): void => {
    const hasExistingError = errors.includes(name);
    if (hasExistingError && !hasError) {
      const newErrors = errors.filter(x => x !== name);
      setErrors(newErrors);
    } else if (!hasExistingError && hasError) {
      setErrors([...errors, name]);
    }
  };

  const hasErrors = errors.length > 0;

  return (
    <FormContext.Provider value={{ setError, isForm: true }}>
      <div
        className={classNames(
          'nhsuk-form-group',
          { 'nhsuk-form-group--error': hasErrors },
          className,
        )}
      >
        <form {...rest}></form>
      </div>
    </FormContext.Provider>
  );
};

export default Form;
