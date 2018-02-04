import React from 'react';
import { connect } from 'react-redux';
import BookCover from './BookCover';
import { Grid } from 'semantic-ui-react';

const Books = ({ books, toggleDescription }) => (
  books.map( book => {
    return (
      <Grid.Column
        key={book.id}
        onClick={ () => toggleDescription(book) }
      >
        <BookCover book={book} />
      </Grid.Column>
    )
  })
)

const mapStateToProps = (state) => {
  return { books: state.books }
}

export default connect(mapStateToProps)(Books);
