import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';

import useStyles from './Pagination.styles';

const getPageLink = ({ pathname, query }, page) => ({ pathname, query: { ...query, page } });

const PageButton = ({ currentPage, className, selectedPage, ...props }) => {
  const { pageButton } = useStyles();
  const router = useRouter();
  return (
    <Link href={getPageLink(router, currentPage)} passHref>
      <Button
        title={currentPage}
        className={clsx(pageButton, className)}
        disabled={currentPage === selectedPage}
        variant="outlined"
        {...props}
      >
        {currentPage}
      </Button>
    </Link>
  );
};

PageButton.propTypes = {
  currentPage: PropTypes.number.isRequired,
  className: PropTypes.string,
  selectedPage: PropTypes.number.isRequired,
};

PageButton.defaultProps = {
  className: '',
};

export default PageButton;
