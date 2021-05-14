

export const init = {
  loader:false
};

const reducer = (
  state = init,
  action: { payload: any; type: string }
) => {
  switch (action.type) {
    case 'SET_TRUE':
      return {
        ...state,
        loader:true
      };
      case 'SET_FALSE':
        return {
          ...state,
          loader:false
        };
   
    default:
      return state;
  }
};
export default reducer;
