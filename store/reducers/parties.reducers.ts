import { partyConstants } from '../constants';
import { typePartyObject } from '../../types';

const initialState: typePartyObject = {};

function parties(state = initialState, action: { type: string; data: any }) {
  switch (action.type) {
    case partyConstants.SET_PARTY:
      return { ...state, [action.data.PID]: action.data };

    case partyConstants.ADD_PARTY_MEMBERS:
      return {
        ...state,
        [action.data.pid]: {
          ...state[action.data.pid],
          members: state[action.data.pid].members.concat(action.data.members)
        }
      };
    default:
      return state;
  }
}

export default parties;