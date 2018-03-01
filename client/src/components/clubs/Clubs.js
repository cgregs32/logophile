import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchClubs } from '../../actions/clubs';
import { fetchUserClubs } from '../../actions/userClubs';
import ClubForm from './ClubForm';
import styled from 'styled-components';
import { Divider, Grid, Header } from 'semantic-ui-react';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1%;
`;

class Clubs extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchClubs());
    dispatch(fetchUserClubs());
  }

  displayClubs = () => {
    const { clubs } = this.props;
    return clubs.map(c => {
      return (
        <Grid.Column
          key={c.id}
          mobile="16"
          tablet="5"
          computer="4"
          largeScreen="3"
        >
          <Link to={`/clubs/${c.id}`}>
            <Header>{c.name}</Header>
          </Link>
          <p>{c.description}</p>
        </Grid.Column>
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <ClubForm />
        <Divider hidden />
        <Grid>{this.displayClubs()}</Grid>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {

    clubs: state.clubs,
    user: state.user
  };
};

export default connect(mapStateToProps)(Clubs);