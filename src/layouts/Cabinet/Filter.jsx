import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import get from 'lodash/get';
import delay from 'lodash/delay';

import TextInput from '../../blocks/TextInput';

class Filter extends Component {
  componentDidMount() {
    this.props.onChange(this.paramName, this.defaultValue);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  get defaultValue() {
    const { router, type } = this.props;
    const value = get(router, ['query', this.paramName]);
    switch (type) {
      case 'text':
        return value;
      case 'number':
        return Number.isNaN(parseFloat(value)) ? null : value;
      case 'date':
        return Number.isNaN(new Date(value).getTime()) ? null : value;
      default:
        return null;
    }
  }

  get paramName() {
    return `filter_${this.props.id}`;
  }

  actToRoute = nextValue => {
    const { onChange, onPatch } = this.props;
    onChange(this.paramName, nextValue);
    onPatch({ [this.paramName]: nextValue });
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
  router: PropTypes.shape().isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPatch: PropTypes.func.isRequired,
};

export default withRouter(Filter);
