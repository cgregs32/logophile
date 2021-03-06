import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/shelvings.js';
import { editShelving } from '../../actions/shelvings';
import styled from 'styled-components';
import { ButtonAction } from '../../styles/styles';
import { Dropdown } from 'semantic-ui-react';

const DropdownStyle = styled.div`
  &&& {
    margin: 0 auto;
  }
`;

class BookshelfDropdown extends React.Component {
  state = { bookshelf: '' };

  bookshelfOptions = () => {
    const { bookshelves } = this.props;
    return bookshelves.map(shelf => {
      return { key: shelf.id, text: shelf.name, value: shelf.name };
    });
  };

  handleSelection = (e, { value }) => {
    this.setState({ bookshelf: value });
  };

  handleSubmit = () => {
    const { bookshelf } = this.state;
    const { book, editBook, bookshelves, dispatch } = this.props;
    if (editBook === undefined) {
      const shelf = bookshelves.find(shelf => shelf.name === bookshelf);
      dispatch(addBook(book, shelf));
    } else {
      const shelf = bookshelves.find(shelf => shelf.name === bookshelf);
      const fromShelf = editBook.bookshelf_id;
      const shelving = {
        id: editBook.shelving_id,
        book_id: editBook.id,
        bookshelf_id: shelf.id
      };
      dispatch(editShelving(shelf, shelving, fromShelf));
    }
  };

  render() {
    return (
      <DropdownStyle>
        <span>
          <ButtonAction
            onClick={() => this.handleSubmit()}
            disabled={this.state.bookshelf.length < 1 ? true : false}
          >
            Select Bookshelf
          </ButtonAction>
          <Dropdown
            placeholder="Will Read"
            selection
            options={this.bookshelfOptions()}
            onChange={this.handleSelection}
          />
        </span>
      </DropdownStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.activeBook,
    bookshelves: state.bookshelves,
    shelvings: state.shelvings
  };
};

export default connect(mapStateToProps)(BookshelfDropdown);
