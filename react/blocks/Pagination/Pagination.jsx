import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import range from 'lodash/range';
import get from 'lodash/get';

import MoreHoriz from '@material-ui/icons/MoreHoriz';

import PageButton from './PageButton';
import useStyles from './Pagination.styles';
import { PAGINATION_BUTTON_WIDTH } from '../constants';

function Pagination({ total, itemsPerPage }) {
  const router = useRouter();
  const ref = useRef(null);
  const { pagination } = useStyles();
  const [sizes, setSizes] = useState({ wing: 4, offsetWidth: 600 });

  function updateWing() {
    if (!ref.current) return;
    const { offsetWidth } = ref.current;
    const nextWing = Math.floor((offsetWidth / PAGINATION_BUTTON_WIDTH - 5) / 2);
    setSizes({ wing: Math.max(nextWing, 1), offsetWidth });
  }

  useEffect(() => {
    updateWing();
    window.addEventListener('resize', updateWing);
    return () => {
      window.removeEventListener('resize', updateWing);
    };
  }, []);

  const totalPages = Math.ceil(total / itemsPerPage);
  if (totalPages === 0) return null;

  const page = parseInt(get(router, 'query.page'), 10) || 1;

  const beginPageByLeft = Math.max(page - sizes.wing, 1);
  const endPageByLeft = Math.min(beginPageByLeft + 2 * sizes.wing, totalPages);

  const endPageByRight = Math.min(page + sizes.wing, totalPages);
  const beginPageByRight = Math.max(endPageByRight - 2 * sizes.wing, 1);

  const beginPage = Math.min(beginPageByLeft, beginPageByRight);
  const endPage = Math.max(endPageByLeft, endPageByLeft);

  const showMore = sizes.offsetWidth >= 370;

  return (
    <div className={pagination} ref={ref}>
      {showMore && beginPage > 1 && (
        <PageButton currentPage={1} selectedPage={page} className="more" />
      )}
      {showMore && beginPage > 2 && <MoreHoriz className="more" />}
      {range(beginPage, endPage + 1).map(currentPage => (
        <PageButton
          currentPage={currentPage}
          selectedPage={page}
          disabled={currentPage === page}
          key={currentPage}
        />
      ))}
      {showMore && endPage < totalPages - 2 && <MoreHoriz className="more" />}
      {showMore && endPage < totalPages - 1 && (
        <PageButton currentPage={totalPages} selectedPage={page} className="more" />
      )}
    </div>
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagination;
