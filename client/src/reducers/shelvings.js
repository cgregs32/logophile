const shelvings = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SHELVING':
    debugger
      return action.shelvings;
    default:
      return state;
  }
}

export default shelvings;
