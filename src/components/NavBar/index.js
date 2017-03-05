import React from 'react';
import { browserHistory } from 'react-router';

import { Menu, Container } from 'semantic-ui-react';

const { Item } = Menu;

export default function () {
  return (
    <nav className="ui large top fixed menu">
      <Container>
        <Menu.Item header>{'TODO list'}</Menu.Item>
      </Container>
    </nav>
  );
}
