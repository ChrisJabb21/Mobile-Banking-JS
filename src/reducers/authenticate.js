import { SIGN_IN, SIGN_OUT } from '../utils/constants';


{/* A reducer is a pure 
fcn that takes the previous state
 and an action and returns the next state. 

 It is like a converter
  for built-in state objects
  the state object is what holds property values of a component
  When state object changes the component rerenders  
*/}

{/* reducer function for altering authenication of user*/}
const authReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return action.user;
        case SIGN_OUT: 
            return {};
        default:
            return state;
    }

};

export default authReducer;