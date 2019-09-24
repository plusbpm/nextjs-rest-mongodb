import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import get from 'lodash/get';
import delay from 'lodash/delay';

import TextInput from '../../blocks/TextInput';

class Filter extends Component {
  componentDidMount() {
    this.props.onChange(this.defaultValue);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  get defaultValue() {
    return get(this.props.router, ['query', this.paramName]);
  }

  get paramName() {
    const { id, prefix } = this.props;
    return `${prefix}_${id}`;
  }

  actToRoute = nextValue => {
    const { pathname, query, push } = this.props.router;
    push({ pathname, query: { ...query, [this.paramName]: nextValue } });
    this.props.onChange(nextValue);
  };

  handleChange = event => {
    clearTimeout(this.timer);
    this.timer = delay(this.actToRoute, 500, event.target.value);
  };

  render() {
    const { label, type } = this.props;
    return (
      <TextInput
        className="filterField"
        type={type}
        label={label}
        defaultValue={this.defaultValue}
        onChange={this.handleChange}
        inputProps={type === 'number' ? { step: 0.01 } : undefined}
        InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      />
    );
  }
}

Filter.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  router: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withRouter(Filter);
