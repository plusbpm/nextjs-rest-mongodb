import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  error: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Error = ({ statusCode }) => {
  const { error } = useStyles();
  return (
    <div className={error}>
      <Typography variant="h3" gutterBottom>
        Error
      </Typography>
      {statusCode ? (
        <Typography variant="subtitle1" gutterBottom>
          An error {statusCode} occurred on server
        </Typography>
      ) : (
        <Typography variant="subtitle1" gutterBottom>
          An error occurred on client
        </Typography>
      )}
      <Link href="/">
        <a>Home page</a>
      </Link>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const responseStatusCode = res ? res.statusCode : null;
  const errorStatusCode = err ? err.statusCode : null;
  const statusCode = errorStatusCode || responseStatusCode;
  if (res && statusCode) res.statusCode = statusCode;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
