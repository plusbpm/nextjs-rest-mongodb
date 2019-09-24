import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

import useStyles from './ListController.styles';

function ListController({ prefix, showLabel, hideLabel, component: Controller, list }) {
  const [open, setOpen] = useState(false);
  const [filledIds, setFilledIds] = useState([]);
  const { bage, wrap } = useStyles();

  const makeChangeHandler = id => value => {
    if (value && !filledIds.includes(id)) {
      setFilledIds(ids => [...ids, id]);
    }
    if (!value && filledIds.includes(id)) {
      setFilledIds(ids => ids.filter(currentId => currentId !== id));
    }
  };

  return (
    <div className={wrap}>
      <Collapse in={open}>
        {list.map(data => (
          <Controller
            key={data.id}
            {...data}
            prefix={prefix}
            onChange={makeChangeHandler(data.id)}
          />
        ))}
      </Collapse>
      <Button
        onClick={() => setOpen(!open)}
        variant="outlined"
        size="small"
        className={clsx('switch-button', open && 'open')}
      >
        {open ? hideLabel : showLabel}
        <Badge badgeContent={filledIds.length} color="primary" className={bage} />
      </Button>
    </div>
  );
}

ListController.propTypes = {
  prefix: PropTypes.string.isRequired,
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ListController;
