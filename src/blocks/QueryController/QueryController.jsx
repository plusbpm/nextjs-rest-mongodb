import React, { useState, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

import { pushQueryPatch } from './util';
import useStyles from './QueryController.styles';

function QueryController({ children, showLabel, hideLabel, ...rest }) {
  const [open, setOpen] = useState(false);
  const [filledKeys, setFilledKeys] = useState([]);
  const { bage, wrap } = useStyles();

  const onChange = (key, value) => {
    if (value && !filledKeys.includes(key)) {
      setFilledKeys(keys => [...keys, key]);
    }
    if (!value && filledKeys.includes(key)) {
      setFilledKeys(keys => keys.filter(currentKey => currentKey !== key));
    }
  };

  const cloneChildren = currentChildren =>
    cloneElement(currentChildren, { ...currentChildren.props, onChange, onPatch: pushQueryPatch });

  return (
    <div className={wrap}>
      <Collapse in={open} {...rest}>
        {Children.map(children, cloneChildren)}
      </Collapse>
      <Button
        onClick={() => setOpen(!open)}
        variant="outlined"
        size="small"
        className={clsx('switch-button', open && 'open')}
        color="secondary"
      >
        {open ? hideLabel : showLabel}
        <Badge badgeContent={filledKeys.length} color="primary" className={bage} />
      </Button>
    </div>
  );
}

QueryController.propTypes = {
  children: PropTypes.node.isRequired,
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired,
};

export default QueryController;
