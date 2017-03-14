import React from 'react';
import NavBar from '../../components/NavBar';
import { Segment, Grid, Container } from 'semantic-ui-react';

// Components
import List from '../../components/List';
import AddItem from '../../components/AddItem';

import styles from './styles.scss';

import baseStyles from '../../assets/styles/base.scss';

const Dashboard = () => (
  <div>
    <Segment vertical className={baseStyles['segment-without-border']}>
      <NavBar />
    </Segment>
    <Segment vertical className={`${styles['app-dashboard-content']} ${baseStyles['segment-without-border']}`}>
      <Container>
        <Grid>
          <Grid.Row centered columns={1}>
            <Grid.Column computer={10}>
              <Segment>
                <AddItem />
                <List />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
);

export default Dashboard;
