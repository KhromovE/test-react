import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Icon, Checkbox, Message, Modal, Button, Input } from 'semantic-ui-react';
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from 'react-sortable-hoc';
import { removeTODOItem, editTODOItem } from '../../actions';

import styles from './styles.scss';

const DragHandle = SortableHandle((props) => {
  const { value } = props;
  return (<List.Content className={styles['app-list-value']}>{value}</List.Content>);
});

const SortableItem = SortableElement((props) => {
  const { value, onRemoveItem, onEditItem, modalShow } = props;
  return (
    <List.Item className={styles['app-list']}>
      <List.Content floated="right">
        <div className={styles['app-list-item-remove']}>
          <Icon onClick={() => onRemoveItem(value.id)} name="remove" />
        </div>
      </List.Content>
      <List.Content floated="right">
        <div className={styles['app-list-item-edit']}>
          <Icon onClick={() => modalShow(value.id)} name="edit" />
        </div>
      </List.Content>
      <List.Content floated="left">
        <Checkbox
          onClick={() => onEditItem(value.id, { completed: !value.completed })}
          checked={value.completed}
        />
      </List.Content>
      <DragHandle value={value.title} />
    </List.Item>
  );
});

const SortableList = SortableContainer((props) => {
  const { items, onRemoveItem, onEditItem, modalShow } = props;
  return (
    <List divided verticalAlign="middle">
      { !items.length ?
        <Message visible>
          No items found
        </Message> :
        null
      }
      {items.map((value, index) =>
        <SortableItem
          key={`item-${value.id}`}
          index={index}
          value={value}
          onRemoveItem={onRemoveItem}
          onEditItem={onEditItem}
          modalShow={modalShow}
        />,
      )}
    </List>
  );
});

class TODOList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list,
      item: {},
      modalOpen: false,
    };

    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalShow = this.modalShow.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onRemoveItem(id) {
    this.props.removeTODOItem(id); // eslint-disable-line
  }

  onSortEnd({ oldIndex, newIndex }) {
    if (oldIndex === newIndex) {
      return;
    }

    const firstItem = Object.assign({}, this.state.list[oldIndex]);
    const secondItem = Object.assign({}, this.state.list[newIndex]);
    const firstItemOrder = firstItem.order;
    const secondItemOrder = secondItem.order;

    this.onEditItem(firstItem.id, { order: secondItemOrder });
    this.onEditItem(secondItem.id, { order: firstItemOrder });

    this.setState({
      list: arrayMove(this.state.list, oldIndex, newIndex),
    });
  }

  modalClose() {
    this.setState({
      modalOpen: false,
      item: {},
    });
  }

  modalShow(id) {
    this.setState({
      modalOpen: true,
      item: Object.assign({}, this.state.list.find(element => element.id === id)),
    });
  }

  onEditItem(id, item) {
    this.props.editTODOItem(id, item);
  }

  onChangeTitle(data) {
    this.setState({
      item: Object.assign({}, this.state.item, { title: data.value }),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
    });
  }

  render() {
    const { list, modalOpen, item } = this.state;

    return (
      <div>
        { !this.props.processing ?
          <SortableList
            items={list}
            useDragHandle={true} // eslint-disable-line
            lockAxis="y"
            onSortEnd={this.onSortEnd}
            onRemoveItem={this.onRemoveItem}
            onEditItem={this.onEditItem}
            modalShow={this.modalShow}
          /> :
          <div className={styles['app-processing']}>
            <Message icon>
              <Icon name="circle notched" loading/>
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          </div>
        }

        <Modal size={'small'} open={modalOpen} onClose={this.modalClose}>
          <Modal.Header>
            {'Editing todo item'}
          </Modal.Header>
          <Modal.Content>
            <Input
              placeholder="Edit item" fluid
              value={item.title}
              onChange={(event, data) => this.onChangeTitle(data)}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.modalClose} negative>
              No
            </Button>
            <Button
              onClick={() => {
                this.onEditItem(item.id, { title: item.title });
                this.modalClose();
              }} positive
            >
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    removeTODOItem: id => dispatch(removeTODOItem(id)),
    editTODOItem: (id, item) => dispatch(editTODOItem(id, item)),
  };
};

const mapStateToProps = function (store) {
  return {
    list: store.TODO.list,
    processing: store.TODO.processing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TODOList);
