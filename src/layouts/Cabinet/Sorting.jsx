import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import get from 'lodash/get';

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

const paramKey = 'sort';

const Sorting = ({ list, onValueChange, onQueryPatch }) => {
  const [state, setState] = useState({ id: null, direction: null });
  const { container, icon, sortButton } = useStyles();
  const router = useRouter();

  const { id, direction } = state;

  const handleNextStateAndValue = (nextState, value) => {
    setState(nextState);
    onValueChange(paramKey, value);
  };

  const makeHandleClick = nextID => event => {
    event.preventDefault();

    let nextDirection = null;
    if (direction === 'asc') nextDirection = 'desc';
    if (direction === 'desc') nextDirection = null;
    if (!direction || nextID !== id) nextDirection = 'asc';

    const nextState = { id: nextID, direction: nextDirection };
    const value = nextDirection ? `${nextID}_${nextDirection}` : null;
    handleNextStateAndValue(nextState, value);

    onQueryPatch({ [paramKey]: value });
  };

  const getIcon = currentId => {
    if (currentId !== id || !direction) return null;
    const Element = direction === 'asc' ? ExpandLess : ExpandMore;
    return <Element color="secondary" className={icon} />;
  };

  useEffect(() => {
    const value = get(router, ['query', paramKey]);
    if (!value) return;

    const [defaultID, defaultDirection] = value.split('_');
    const ids = list.map(({ id: currentId }) => currentId);
    if (!['asc', 'desc'].includes(defaultDirection) || !ids.includes(defaultID)) return;

    handleNextStateAndValue({ id: defaultID, direction: defaultDirection }, value);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container className={container}>
      {list.map(({ id: currentId, label }) => (
        <Button
          key={currentId}
          className={sortButton}
          onClick={makeHandleClick(currentId)}
          variant="outlined"
        >
          {label}
          {getIcon(currentId)}
        </Button>
      ))}
    </Grid>
  );
};

Sorting.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onValueChange: PropTypes.func,
  onQueryPatch: PropTypes.func,
};

Sorting.defaultProps = {
  onValueChange: () => {},
  onQueryPatch: () => {},
};

export default Sorting;
