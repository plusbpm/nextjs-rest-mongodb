import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 2),
  },
  icon: {
    position: 'relative',
  },
  sortButton: {
    marginRight: theme.spacing(1),
  },
}));

const list = [
  { id: 'correspondent', label: 'Name' },
  { id: 'amount', label: 'Amount' },
  { id: 'dt', label: 'Date' },
];

const getStateFromValue = value => {
  const emptyState = { id: null, direction: null };
  if (!value) return emptyState;
  const [id, direction] = value.split('_');
  const ids = list.map(({ id: currentId }) => currentId);
  if (!['asc', 'desc'].includes(direction) || !ids.includes(id)) return emptyState;
  return { id, direction };
};

const getValueFromState = ({ id, direction }) => (direction ? `${id}_${direction}` : '');

const Sorting = ({ value, onChange }) => {
  const { container, icon, sortButton } = useStyles();
  const { id, direction } = getStateFromValue(value);

  const makeHandleClick = nextID => event => {
    event.preventDefault();

    let nextDirection = null;
    if (direction === 'asc') nextDirection = 'desc';
    if (direction === 'desc') nextDirection = null;
    if (!direction || nextID !== id) nextDirection = 'asc';

    const nextState = { id: nextID, direction: nextDirection };
    onChange({ target: { value: getValueFromState(nextState) } });
  };

  const getIcon = currentId => {
    if (currentId !== id || !direction) return null;
    const Element = direction === 'asc' ? ExpandLess : ExpandMore;
    return <Element color="secondary" className={icon} />;
  };

  return (
    <Grid container className={container}>
      {list.map(({ id: currentId, label }) => (
        <Button key={currentId} className={sortButton} onClick={makeHandleClick(currentId)}>
          {label}
          {getIcon(currentId)}
        </Button>
      ))}
      <input type="hidden" value={value} name="sort" />
    </Grid>
  );
};

Sorting.propTypes = {
  value: PropTypes.oneOf([
    '',
    'correspondent_asc',
    'correspondent_desc',
    'amount_asc',
    'amount_desc',
    'dt_asc',
    'dt_desc',
  ]),
  onChange: PropTypes.func.isRequired,
};

Sorting.defaultProps = {
  value: '',
};

export default Sorting;
