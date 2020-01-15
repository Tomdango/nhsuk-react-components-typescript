import React, {
  HTMLProps,
  useContext,
  useState,
  ReactNode,
  useEffect,
  PureComponent,
  Ref,
} from 'react';
import classNames from 'classnames';
import Label from '../label';
import Hint from '../hint';
import FormContext from '../form/FormContext';
import ErrorMessage from '../error-message';
import CheckboxContext, { ICheckboxContext } from './CheckboxContext';

interface BoxProps extends HTMLProps<HTMLInputElement> {
  hint?: string;
  inputRef?: Ref<HTMLInputElement>;
  conditional?: ReactNode;
}

const Box: React.FC<BoxProps> = ({
  className,
  children,
  id,
  hint,
  conditional,
  checked,
  onClick,
  name,
  inputRef,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(Boolean(checked));
  const [boxId, setBoxId] = useState<string | undefined>(undefined);
  const context = useContext<ICheckboxContext>(CheckboxContext);

  useEffect(() => {
    if (typeof checked !== 'undefined' && checked !== isChecked) {
      setIsChecked(checked);
    }
  }, [checked, isChecked]);

  useEffect(() => {
    if (id) {
      setBoxId(id);
    } else if (context.isCheckbox) {
      setBoxId(context.getBoxId());
    }
  }, [id]);

  return (
    <div className={classNames('nhsuk-checkboxes__item', className)}>
      <input
        className="nhsuk-checkboxes__input"
        {...rest}
        id={boxId}
        ref={inputRef}
        name={context.isCheckbox ? name || context.name : name}
        checked={isChecked || checked}
      ></input>
      <Label
        className="nhsuk-checkboxes__label"
        id={id ? `${boxId}--label` : undefined}
        htmlFor={boxId}
      >
        {children}
      </Label>
      {hint ? (
        <Hint className="nhsuk-checkboxes__hint" id={id ? `${id}--hint` : undefined}>
          {hint}
        </Hint>
      ) : null}
      {conditional && isChecked ? (
        <div
          className={classNames('nhsuk-checkboxes__conditional', {
            'nhsuk-checkboxes__conditional--hidden': !isChecked,
          })}
        >
          {conditional}
        </div>
      ) : null}
    </div>
  );
};

Box.defaultProps = {
  type: 'checkbox',
};

interface CheckboxesProps extends HTMLProps<HTMLDivElement> {
  error?: string | boolean;
  idPrefix?: string;
}

interface CheckboxesState {
  name: string;
}

interface Checkboxes {
  boxCount: number;
}

class Checkboxes extends PureComponent<CheckboxesProps, CheckboxesState> {
  static contextType = FormContext;

  static Box: React.FC<BoxProps> = Box;

  constructor(props: CheckboxesProps, ...rest: any[]) {
    super(props, ...rest);
    this.state = {
      name: props.name || `checkbox_${(Math.random() + 1).toString(36).substring(2, 7)}`,
    };
    this.boxCount = 0;
  }

  getBoxId = (): string | undefined => {
    const { idPrefix } = this.props;
    const { name } = this.state;
    if (!name && !idPrefix) {
      return undefined;
    }
    ++this.boxCount;
    return `${idPrefix || name}-${this.boxCount}`;
  };

  render() {
    const { error, className, id, children, ...rest } = this.props;
    const { name } = this.state;
    const { isForm, setError } = this.context;

    if (isForm) {
      setError(name, Boolean(error));
    }

    return (
      <CheckboxContext.Provider value={{ isCheckbox: true, name, getBoxId: this.getBoxId }}>
        <div className={classNames('nhsuk-checkboxes', className)} id={id} {...rest}>
          {error && typeof error === 'string' ? (
            <ErrorMessage id={id ? `${id}--error` : undefined}>{error}</ErrorMessage>
          ) : null}
          {children}
        </div>
      </CheckboxContext.Provider>
    );
  }
}

export default Checkboxes;
