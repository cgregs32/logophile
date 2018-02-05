import React from 'react';
import { connect } from 'react-redux';
import { Message, Container, Header, Sticky } from 'semantic-ui-react';
import { clearFlash } from '../actions/flash';
import styled from 'styled-components'

const FlashStyle = styled(Container)`
  left: 10%;
`
const ContainerFlash = styled(Sticky)`
  z-index: 100000000 !important;
  position: relative;
`


class Flash extends React.Component{

  fadeFlash = dispatch => {
    setTimeout(() => {
      dispatch(clearFlash());
    }, 5500);
  };

  handleContextRef = contextRef => this.setState({ contextRef })

  render(){
    const { flash, dispatch, contextRef } = this.props

    if (flash.message) {
      return (
        <Sticky as={ContainerFlash} context={contextRef} offset={20}>
          <Container as={FlashStyle}>
            <Message
              onDismiss={() => dispatch(clearFlash())}
              color={flash.color}
              >
              <Header as='h5' textAlign='center'>{flash.message}</Header>
              {this.fadeFlash(dispatch)}
            </Message>
          </Container>
        </Sticky>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);
