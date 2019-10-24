import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import NextLink from 'next/link';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';

import useStyles from './FormAuth.styles';
import TextInput from '../TextInput';
import ButtonWithSpinner from '../ButtonWithSpinner';
import InqueriesErrorSnackbar from '../InqueriesErrorSnackbar';

import { Context } from '../../appProvider';
import { useInquery } from '../../restClient';
import useFormValidation from '../useFormValidation';

import createValidation from '../../../shared/validation';
import registerSchemas from '../../../shared/validation/forms/register';
import loginSchemas from '../../../shared/validation/forms/login';

const validation = createValidation({ schemas: [...registerSchemas, ...loginSchemas] });

const makeSubmitHandler = ({ register }, actionInquery, router) => data => {
  actionInquery
    .send({
      endpoint: `/${register ? 'register' : 'login'}`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      const { error } = actionInquery.getState();
      if (error) return;
      router.push(register ? '/' : '/cabinet');
    });
};

const FormAuth = props => {
  const { register } = props;
  const { actions, card, mobileHeader, snackbar } = useStyles();
  const actionInquery = useInquery(register ? 'register' : 'login');
  const router = useRouter();

  const [formProps, errors] = useFormValidation({
    validate: validation.getSchema(register ? 'form_register' : 'form_login'),
    submit: makeSubmitHandler(props, actionInquery, router),
  });
  const { nextRoutingOccur } = useContext(Context);

  const { name, email, password, repeat } = errors;
  return (
    <Card {...formProps} component="form" raised className={card}>
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
          error={!!name}
          helperText={name && name.message}
        />
      )}
      <TextInput
        id="email-input"
        label="Email"
        name="email"
        autoComplete={register ? undefined : 'email'}
        error={!!email}
        helperText={email && email.message}
      />
      <TextInput
        id="password-input"
        label="Password"
        type="password"
        name="password"
        error={!!password}
        helperText={password && password.message}
      />
      {register && (
        <TextInput
          id="repeat-input"
          label="Confirm password"
          type="password"
          name="repeat"
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
          busy={actionInquery.getState().isLoading || nextRoutingOccur}
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

export default FormAuth;
