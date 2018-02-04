import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { searchAll } from '../actions/books';
import { setActiveBook } from '../actions/activeBook';
import Banner from './Banner';
import BookDescription from './books/BookDescription';
import BookCover from './books/BookCover';
import Books from './books/Books';
import styled from 'styled-components';
import {
  Grid,
  Header,
 } from 'semantic-ui-react';

const EnlargeGrid = styled(Grid)`
  height: 100vh;
`

class Home extends React.Component {
  state = { searchLoaded: false, terms: {} }

  setSearchLoaded = () => this.setState({ searchLoaded: true });

  handleSearch = (terms) => {
    this.setState({terms: terms})
    this.props.dispatch(searchAll(this.setSearchLoaded, terms));
  }

  searchTerms = () => {
    const { terms } = this.state;
    let results = ''
    if (terms.title.length > 0) results += `${terms.title} `
    if (terms.author.length > 0) results += `${terms.author} `
    if (terms.ibsn.length > 0) results += terms.ibsn
    return results
  }

  toggleDescription = (book) => this.props.dispatch(setActiveBook(book))

  render() {
    const { searchLoaded } = this.state;
    const { book, books } = this.props;
    return (
      <div>
        <Banner searchTerms={this.handleSearch} />
        <Grid divided>
          <Grid.Column width={10}>
            { searchLoaded && <Header>Your Search Results for { this.searchTerms() }...</Header> }
            <Grid
              as={EnlargeGrid}
              columns={5}
            >
              { books && <Books toggleDescription={this.toggleDescription} /> }
            </Grid>
          </Grid.Column>
          <Grid.Column width={6}>
            { Object.keys(book).length !== 0 && <BookDescription /> }
          </Grid.Column>
        </Grid>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { books: state.books, book: state.activeBook }
}

export default connect(mapStateToProps)(Home);
