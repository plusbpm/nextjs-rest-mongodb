import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';

const BackWithFallback = ({ fallback, ...props }) => {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        return history.length > 1 ? router.back() : router.push(fallback);
      }}
    />
  );
};

BackWithFallback.propTypes = {
  fallback: PropTypes.string.isRequired,
};

export default BackWithFallback;
