import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';
import NextLink from 'next/link';
import useForm from 'react-hook-form';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';

import useStyles from './FormAuth.styles';
import emailValidate from '../../util/emailValidate';
import passwordValidate from '../../util/passwordValidate';
import TextInput from '../TextInput';
import ButtonWithSpinner from '../ButtonWithSpinner';
import InqueriesErrorSnackbar from '../InqueriesErrorSnackbar';

import { useInquery } from '../../restClient';

const makeSubmitHandler = ({ register }, actionInquery, handleSubmit) =>
  handleSubmit((data, event) => {
    event.preventDefault();
    actionInquery.send({
      endpoint: `/api/${register ? 'register' : 'login'}`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

const FormAuth = props => {
  const { register } = props;

  const { actions, card, mobileHeader, snackbar } = useStyles();
  const validations = useForm({
    validationFields: ['email', 'password'].concat(register ? ['name', 'repeat'] : []),
  });
  const actionInquery = useInquery(register ? 'register' : 'login');

  const { errors, handleSubmit, register: registerInputValidation, getValues } = validations;
  const { name, email, password, repeat } = errors;
  const onSubmit = makeSubmitHandler(props, actionInquery, handleSubmit);
  return (
    <Card component="form" raised className={card} onSubmit={onSubmit}>
      <Typography variant="h6" className={mobileHeader}>
        {register ? 'Register' : 'Login'}
      </Typography>
      <br />
      {register && (
        <TextInput
          id="name-input"
          label="Name"
          name="name"
          autoComplete="name"
          inputRef={registerInputValidation({
            required: 'Required field',
            minLength: { value: 3, message: 'Minimum 3 characters' },
            maxLength: { value: 50, message: 'Maximum 50 characters' },
          })}
          error={!!name}
          helperText={name && name.message}
        />
      )}
      <TextInput
        id="email-input"
        label="Email"
        name="email"
        autoComplete={register ? undefined : 'email'}
        inputRef={registerInputValidation({
          required: 'Required field',
          validate: emailValidate,
        })}
        error={!!email}
        helperText={email && email.message}
      />
      <TextInput
        id="password-input"
        label="Password"
        type="password"
        name="password"
        inputRef={registerInputValidation({
          required: 'Required field',
          validate: passwordValidate,
          minLength: { value: 6, message: 'Minimum 6 characters' },
        })}
        error={!!password}
        helperText={password && password.message}
      />
      {register && (
        <TextInput
          id="repeat-input"
          label="Repeat password"
          type="password"
          name="repeat"
          inputRef={registerInputValidation({
            required: 'Required field',
            validate: repeatValue => repeatValue === getValues().password || 'Repeat not match',
          })}
          error={!!repeat}
          helperText={repeat && repeat.message}
        />
      )}
      <CardActions className={actions}>
        <ButtonWithSpinner
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          busy={actionInquery.getState().isLoading}
        >
          Submit
        </ButtonWithSpinner>
        <NextLink href={register ? '/' : '/?mode=register'} passHref>
          <Link underline="always" color="secondary">
            {register ? 'Login to exists account' : 'Register new account'}
          </Link>
        </NextLink>
      </CardActions>
      <InqueriesErrorSnackbar global={false} className={snackbar} />
    </Card>
  );
};

FormAuth.propTypes = {
  register: PropTypes.bool,
};

FormAuth.defaultProps = {
  register: false,
};

export default withRouter(FormAuth);
