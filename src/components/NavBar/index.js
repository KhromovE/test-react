import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

const { Item } = Menu;

export default function () {
  return (
    <nav className="ui large top fixed menu">
      <Container>
        <Item header>{'TODO list'}</Item>
      </Container>
    </nav>
  );
}
