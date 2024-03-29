import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withInquery } from '../../restClient';
import TextInput from '../TextInput';

class TextInputSuggest extends Component {
  constructor(props) {
    super(props);

    this.throttledHandler = throttle(this.handleValue, 300, { leading: false });
    const value = typeof props.value !== 'undefined' ? props.value : props.defaultValue;
    this.state = {
      highlighted: null,
      reseted: false,
      value,
      visible: false,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  get inquery() {
    return this.props.autocompleteInquery;
  }

  get inqueryState() {
    const inqueryState = this.inquery.getState();
    return {
      ...inqueryState,
      list: inqueryState.data || [],
    };
  }

  get listContent() {
    const { list, isLoading } = this.inqueryState;
    const { highlighted, visible } = this.state;

    if (!visible) return null;

    if (list.length === 0 && isLoading)
      return (
        <ListItem dense>
          <CircularProgress size={16} style={{ marginRight: 10 }} />
          <ListItemText primary={<span>Loading...</span>} />
        </ListItem>
      );

    if (list.length === 0 && !isLoading)
      return (
        <ListItem dense>
          <ListItemText primary="Nothing" />
        </ListItem>
      );

    if (list.length > 0)
      return list.map(({ label, value }, index) => (
        <ListItem
          key={value}
          dense
          disabled={isLoading}
          button
          selected={highlighted === index}
          onMouseDown={() => this.select(index)}
        >
          <ListItemText primary={label} />
        </ListItem>
      ));

    return null;
  }

  get ref() {
    const { inputRef } = this.props;
    if (inputRef) return inputRef;
    this.inputRef = this.inputRef || createRef();
    return this.inputRef;
  }

  handleFocus = () => {
    const { value } = this.state;
    const { data } = this.inqueryState;
    if (!data && value.length >= this.props.minLength) {
      this.inquery.send({ query: { q: value } });
    }
    this.patchState({ visible: true });
  };

  handleChange = event => {
    const trimmedValue = (event.target.value || '').trim();
    const { value, reseted } = this.state;
    const { onReset, minLength } = this.props;

    if (trimmedValue === value) return;
    if (!reseted) onReset();

    const patch = { visible: true, reseted: true, value: trimmedValue };
    if (trimmedValue.length >= minLength) {
      this.throttledHandler(trimmedValue);
    }
    this.patchState(patch);
  };

  handleValue = value => {
    this.patchState({ highlighted: null });
    this.inquery.send({ query: { q: value } });
  };

  handleKeydown = event => {
    const { highlighted, visible } = this.state;
    const { list, isLoading } = this.inqueryState;

    if (!visible || isLoading) return;
    const noHighlighted = highlighted === null;

    const patch = {};
    switch (event.keyCode) {
      case 38: {
        // up
        event.preventDefault();
        const nextHighlighted = noHighlighted ? list.length - 1 : highlighted - 1;
        patch.highlighted = Math.max(0, nextHighlighted);
        break;
      }
      case 40: {
        // down
        event.preventDefault();
        const nextHighlighted = noHighlighted ? 0 : highlighted + 1;
        patch.highlighted = Math.min(list.length - 1, nextHighlighted);
        break;
      }
      case 27: {
        // esc
        event.preventDefault();
        this.ref.current.blur();
        break;
      }
      case 13: {
        // enter
        event.preventDefault();
        this.select(highlighted);
        break;
      }
      default:
    }
    this.patchState(patch);
  };

  patchState = patch => {
    const nextState = { ...this.state, ...patch };
    if (isEqual(this.state, nextState)) return;
    this.setState(nextState);
  };

  select = index => {
    const item = this.inqueryState.list[index];
    this.patchState({ reseted: false, visible: false, value: item.label });
    this.props.onSelect(item);
  };

  render() {
    const {
      autocompleteInquery,
      defaultValue,
      endpoint,
      minLength,
      onReset,
      onSelect,
      ...rest
    } = this.props;
    return (
      <>
        <TextInput
          {...rest}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={() => this.patchState({ visible: false })}
          autoComplete="off"
          inputRef={this.ref}
          value={this.state.value}
        />
        {this.state.visible && <List>{this.listContent}</List>}
      </>
    );
  }
}

TextInputSuggest.propTypes = {
  autocompleteInquery: PropTypes.shape().isRequired,
  defaultValue: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  inputRef: PropTypes.shape(),
  minLength: PropTypes.number,
  onReset: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
};

TextInputSuggest.defaultProps = {
  inputRef: undefined,
  defaultValue: '',
  minLength: 2,
  value: undefined,
};

const propsToOptions = ({ endpoint }) => ({ endpoint });

export default withInquery('autocomplete', propsToOptions)(TextInputSuggest);
