import React, {
  HTMLProps,
  PureComponent,
  useContext,
  FormEvent,
  RefObject,
  useRef,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import Label from '../label';
import DateContext, { IDateContext } from './DateContext';
import isDev from '../../util/IsDev';
import Hint from '../hint';
import FormContext from '../form/FormContext';
import ErrorMessage from '../error-message';

export enum DateInputElementTypes {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

interface IndividualDateInput extends HTMLProps<HTMLInputElement> {
  disableCharacterLimit?: boolean;
  allowTextInput?: boolean;
  defaultValue?: string;
  error?: boolean;
}

interface BaseInputProps extends IndividualDateInput {
  inputType: DateInputElementTypes;
}

const sanitiseInput = (
  values: { previous: string; next: string },
  options: {
    allowTextInput?: boolean;
    disableCharacterLimit?: boolean;
    inputType: DateInputElementTypes;
  },
): string => {
  const isYear = options.inputType === DateInputElementTypes.YEAR;
  const { allowTextInput, disableCharacterLimit } = options;
  let sanitisedString = values.next;
  if (!allowTextInput) {
    sanitisedString = sanitisedString.replace(/[^0-9]+/, '');
  }
  if (!disableCharacterLimit) {
    if (isYear && sanitisedString.length > 4) {
      sanitisedString = sanitisedString.substr(0, 4);
    } else if (!isYear && sanitisedString.length > 2) {
      sanitisedString = sanitisedString.substr(0, 2);
    }
  }
  return sanitisedString;
};

const BaseInput: React.FC<BaseInputProps> = ({
  disableCharacterLimit,
  allowTextInput,
  label,
  id,
  inputType,
  onChange,
  onInput,
  error,
  className,
  defaultValue,
  ...rest
}) => {
  const context = useContext<IDateContext>(DateContext);
  const refContainer = useRef(null);
  const [value, setValue] = useState<string>(defaultValue || '');

  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    let newValue = sanitiseInput(
      { next: element.value, previous: value },
      { disableCharacterLimit, allowTextInput, inputType },
    );
    setValue(newValue);
    e.target['value'] = newValue;
    e.currentTarget.value = newValue;
    e.persist();
    if (onChange) {
      onChange(e);
    }
    if (context.isDate) {
      context.handleChange(e, inputType);
    }
  };
  const handleOnInput = (e: FormEvent<HTMLInputElement>) => {
    e.persist();
    if (onInput) {
      onInput(e);
    }
    if (context.isDate) {
      context.handleInput(e);
    }
  };

  useEffect(() => {
    if (inputType !== DateInputElementTypes.DAY && context.isDate && refContainer) {
      context.passBackRef(inputType, refContainer);
    }
  }, [refContainer]);

  useEffect(() => {
    if (context.isDate) {
      // context.passError(inputType, Boolean(error));
    }
  }, [error]);

  const inputId = id || `${context.id || context.name}-${inputType}`;

  return (
    <div className="nhsuk-date-input__item">
      {label ? (
        <Label id={`${inputId}-label`} htmlFor={inputId}>
          {label}
        </Label>
      ) : null}
      <input
        className={classNames(
          'nhsuk-input nhsuk-date-input__input',
          {
            'nhsuk-input--width-4': inputType === DateInputElementTypes.YEAR,
          },
          {
            'nhsuk-input--width-2': inputType !== DateInputElementTypes.YEAR,
          },
          { 'nhsuk-input--error': typeof error === 'boolean' ? error : error || context.error },
          className,
        )}
        value={value}
        name={name ? `${name}-${inputType}` : `${context.name}-${inputType}`}
        id={inputId}
        onChange={handleOnChange}
        ref={refContainer}
        onInput={handleOnInput}
        {...rest}
      />
    </div>
  );
};

BaseInput.defaultProps = {
  type: 'text',
  pattern: '[0-9]*',
};

const DayInput: React.FC<IndividualDateInput> = props => (
  <BaseInput inputType={DateInputElementTypes.DAY} {...props}></BaseInput>
);

DayInput.defaultProps = {
  label: 'Day',
};

const MonthInput: React.FC<IndividualDateInput> = props => (
  <BaseInput inputType={DateInputElementTypes.MONTH} {...props}></BaseInput>
);

MonthInput.defaultProps = {
  label: 'Month',
};

const YearInput: React.FC<IndividualDateInput> = props => (
  <BaseInput inputType={DateInputElementTypes.YEAR} {...props}></BaseInput>
);

YearInput.defaultProps = {
  label: 'Year',
};

interface DateInput {
  monthRef: RefObject<HTMLInputElement>;
  yearRef: RefObject<HTMLInputElement>;
}

interface DateInputProps extends HTMLProps<HTMLInputElement> {
  autoFocusNext?: boolean;
  onDateChange?: (e: FormEvent<HTMLInputElement>, data: DateState<string>) => void;
  error?: string | boolean;
  hint?: string;
}

type DateState<T> = {
  day: T;
  month: T;
  year: T;
};

interface DateInputState {
  data: DateState<string>;
  errors: DateState<boolean>;
  name: string;
}

class DateInput extends PureComponent<DateInputProps, DateInputState> {
  static contextType = FormContext;
  static Day = DayInput;
  static Month = MonthInput;
  static Year = YearInput;

  constructor(props: DateInputProps, ...rest: any[]) {
    super(props, ...rest);
    this.monthRef = React.createRef<HTMLInputElement>();
    this.yearRef = React.createRef<HTMLInputElement>();

    this.state = {
      data: { day: '', month: '', year: '' },
      errors: { day: false, month: false, year: false },
      name: props.name || `dateinput_${(Math.random() + 1).toString(36).substring(2, 7)}`,
    };
  }

  componentDidUpdate() {
    const { name } = this.props;
    if (name && name !== this.state.name) {
      this.setState({ name });
    }
  }

  handleChange = (e: FormEvent<HTMLInputElement>, elementType: DateInputElementTypes) => {
    const { onChange, autoFocusNext, onDateChange } = this.props;

    if (autoFocusNext) {
      if (
        elementType === DateInputElementTypes.DAY &&
        e.currentTarget.value.length === 2 &&
        this.monthRef.current
      ) {
        this.monthRef.current.focus();
      } else if (
        elementType === DateInputElementTypes.MONTH &&
        e.currentTarget.value.length === 2 &&
        this.yearRef.current
      ) {
        this.yearRef.current.focus();
      } else if (
        elementType === DateInputElementTypes.DAY &&
        !this.monthRef.current &&
        this.yearRef.current &&
        e.currentTarget.value.length === 2
      ) {
        this.yearRef.current.focus();
      }
    }
    const { data } = this.state;
    this.setState({ data: { ...data, [elementType]: e.currentTarget.value } }, () => {
      if (onChange) {
        onChange(e);
      }
      if (onDateChange) {
        onDateChange(e, this.state.data);
      }
    });
  };

  handleInput = (e: FormEvent<HTMLInputElement>) => {
    const { onInput } = this.props;
    if (onInput) {
      onInput(e);
    }
  };

  passBackRef = (elementType: DateInputElementTypes, ref: RefObject<HTMLInputElement>) => {
    if (elementType === DateInputElementTypes.MONTH) {
      if (this.monthRef.current && isDev()) {
        console.warn(
          'Multiple Instances of <DateInput.*> elements detected within a single <DateInput> element. This may cause issues with autoSelectNext functionality.',
        );
      }

      this.monthRef = ref;
    } else if (elementType === DateInputElementTypes.YEAR) {
      if (this.yearRef.current && isDev()) {
        console.warn(
          'Multiple Instances of <DateInput.*> elements detected within a single <DateInput> element. This may cause issues with autoSelectNext functionality.',
        );
      }
      this.yearRef = ref;
    }
  };

  // passError = (inputType: DateInputElementTypes, hasError: boolean): void => {};

  render() {
    const {
      className,
      id,
      hint,
      error,
      children,
      onChange,
      onInput,
      onKeyDown,
      onKeyDownCapture,
      onKeyPress,
      onKeyPressCapture,
      onKeyUp,
      onKeyUpCapture,
      onDateChange,
      autoFocusNext,
      ...rest
    } = this.props;
    const { name } = this.state;
    const contextValue: IDateContext = {
      isDate: true,
      id,
      name,
      error: Boolean(error),
      handleChange: this.handleChange,
      handleInput: this.handleInput,
      passBackRef: this.passBackRef,
      // passError: this.passError,
    };

    if (this.context.isForm && error) {
      //  || errorInChildren
      this.context.setError(name, Boolean(error));
    }
    return (
      <>
        {hint ? <Hint className={id ? `${id}-hint` : undefined}>{hint}</Hint> : null}
        {error && typeof error === 'string' ? (
          <ErrorMessage className={id ? `${id}-error` : undefined}>{error}</ErrorMessage>
        ) : null}
        <div className={classNames('nhsuk-date-input', className)} {...rest}>
          <DateContext.Provider value={contextValue}>
            {children || (
              <>
                <DayInput />
                <MonthInput />
                <YearInput />
              </>
            )}
          </DateContext.Provider>
        </div>
      </>
    );
  }
}

export default DateInput;
