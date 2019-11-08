import { useState, useRef } from 'react';
import getFormData from 'get-form-data';
import get from 'lodash/get';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';
import invariant from '../../shared/util/invariant';

const omitPredicate = value => ['', null, undefined, NaN].indexOf(value) !== -1;

const getData = node => (node ? omitBy(getFormData(node), omitPredicate) : {});

const getErrorsMap = errors =>
  (errors || []).reduce((acc, error) => {
    const { dataPath, keyword, message: originalMessage, params, parentSchema } = error;
    const { missingProperty } = params || {};
    const propertyPath = missingProperty || dataPath.replace(/^\./, '');
    const customMessage = get(
      parentSchema,
      missingProperty
        ? ['properties', missingProperty, 'messages', keyword]
        : ['messages', keyword],
    );
    const message = customMessage || originalMessage;
    return { ...acc, [propertyPath]: { ...error, message } };
  }, {});

export default ({ validate, submit, validateOnChange }) => {
  invariant(!!validate, 'Validate function is required.');

  const ref = useRef(null);
  const [state, setState] = useState({ errors: {}, submitedOnce: false });

  const validateEvent = () => {
    const form = getData(ref.current);
    const valid = validate(form);
    const nextState = { ...state, errors: getErrorsMap(validate.errors) };
    return [nextState, valid, form];
  };

  const onSubmit = event => {
    event.preventDefault();
    const [nextState, valid, form] = validateEvent();
    setState({ ...nextState, submitedOnce: true });
    if (valid && submit) submit(form);
  };

  const onChange = () => {
    if (isEmpty(state.errors) && !state.submitedOnce && !validateOnChange) return;
    const [nextState, valid] = validateEvent();
    const complete = state.submitedOnce && valid;
    setState({ ...nextState, submitedOnce: complete ? false : nextState.submitedOnce });
  };

  const toggleValidate = () => {
    const validateResult = validateEvent();
    setState(validateResult[0]);
    return validateResult;
  };

  const formProps = {
    ref,
    onSubmit,
    onChange,
  };

  const extra = {
    formData: getData(ref.current),
    toggleValidate,
  };

  return [formProps, state.errors, extra];
};
