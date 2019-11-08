import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useRouter } from 'next/router';

import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import createValidation from '../../../../shared/validation';
import schemas from '../../../../shared/validation/forms/transactionsListQuery';
import TextInput from '../../../blocks/TextInput';
import useFormValidation from '../../../blocks/useFormValidation';
import Sorting from './Sorting';
import useStyles from './Subheader.styles';

const validate = createValidation({ schemas }).getSchema('form_transactionslist');

export const allFields = [
  'filter_correspondent',
  'filter_amount_min',
  'filter_amount_max',
  'filter_dt',
  'sort',
];

const makeCountPredicate = (regex, formData, errors) => (count, field) =>
  count + (regex.test(field) && !!formData[field] && !errors[field] ? 1 : 0);

/* eslint-disable camelcase */
const getDefaultValues = ({
  filter_correspondent,
  filter_amount_min,
  filter_amount_max,
  filter_dt,
  sort,
}) => ({
  filter_correspondent,
  filter_amount_min: Number.isNaN(parseFloat(filter_amount_min)) ? undefined : filter_amount_min,
  filter_amount_max: Number.isNaN(parseFloat(filter_amount_max)) ? undefined : filter_amount_max,
  filter_dt: Number.isNaN(new Date(filter_dt).getTime()) ? undefined : filter_dt,
  sort,
});
/* eslint-enable camelcase */

function Subheader({ onChange }) {
  const { bage, wrap } = useStyles();
  const [openFilters, setOpenFilters] = useState(false);
  const [openSortings, setOpenSortings] = useState(false);
  const { query } = useRouter();

  const [formProps, errors, { toggleValidate, formData }] = useFormValidation({
    validate,
    validateOnChange: true,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChange(formData, errors), [formData, errors]);

  const defaultValues = getDefaultValues(query);

  const filtersCount = allFields.reduce(makeCountPredicate(/^filter/, formData, errors), 0);
  const sortsCount = allFields.reduce(makeCountPredicate(/^sort/, formData, errors), 0);

  return (
    <>
      <ListSubheader disableSticky>
        <Typography variant="h6" gutterBottom color="textPrimary">
          Transactions history
        </Typography>
      </ListSubheader>
      <form {...formProps}>
        <div className={wrap}>
          <Collapse in={openFilters}>
            <TextInput
              className="filterField"
              defaultValue={defaultValues.filter_correspondent}
              name="filter_correspondent"
              label="Correspondent name"
              error={!!errors.filter_correspondent}
              helperText={get(errors, 'filter_correspondent.message')}
            />
            <TextInput
              className="filterField"
              defaultValue={defaultValues.filter_amount_min}
              name="filter_amount_min"
              type="number"
              label="Amount min"
              min={0.01}
              inputProps={{ step: 0.01 }}
              error={!!errors.filter_amount_min}
              helperText={get(errors, 'filter_amount_min.message')}
            />
            <TextInput
              className="filterField"
              defaultValue={defaultValues.filter_amount_max}
              name="filter_amount_max"
              type="number"
              label="Amount max"
              min={0.01}
              inputProps={{ step: 0.01 }}
              error={!!errors.filter_amount_max}
              helperText={get(errors, 'filter_amount_max.message')}
            />
            <TextInput
              className="filterField"
              defaultValue={defaultValues.filter_dt}
              name="filter_dt"
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.filter_dt}
              helperText={get(errors, 'filter_dt.message')}
            />
          </Collapse>
          <Button
            onClick={() => setOpenFilters(!openFilters)}
            size="small"
            className={clsx('switch-button', openFilters && 'open')}
            color="secondary"
          >
            {openFilters ? 'Hide filters' : 'Show filters'}
            <Badge badgeContent={filtersCount} color="primary" className={bage} />
          </Button>
        </div>

        <div className={wrap}>
          <Collapse in={openSortings}>
            <Sorting onChange={toggleValidate} defaultValue={defaultValues.sort} />
          </Collapse>
          <Button
            onClick={() => setOpenSortings(!openSortings)}
            size="small"
            className={clsx('switch-button', openSortings && 'open')}
            color="secondary"
          >
            {openSortings ? 'Hide sortings' : 'Show sortings'}
            <Badge badgeContent={sortsCount} color="primary" className={bage} />
          </Button>
        </div>
      </form>
    </>
  );
}

Subheader.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Subheader;
