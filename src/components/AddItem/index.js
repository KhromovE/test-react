import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { createTODOItem } from '../../actions';

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(event, data) {
    this.setState({
      input: data.value,
    });
  }

  onSubmit() {
    this.props.createTODOItem({
      title: this.state.input,
    });

    this.setState({
      input: '',
    });
  }

  render() {
    const { input } = this.state;
    return (
      <Input
        value={input}
        onChange={this.onChangeInput}
        action={<Button disabled={!this.state.input} onClick={this.onSubmit}>Add</Button>}
        placeholder="Add item"
        fluid
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createTODOItem: item => dispatch(createTODOItem(item)),
  };
}

function mapStateToProps() {
  return {};
}

AddItem.propTypes = {
  createTODOItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
