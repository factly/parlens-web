import Cookies from 'js-cookie';
import { appConstants } from '../constants';

const initialState: { theme: string } = { theme: 'light' };

function app(
  state = initialState,
  action: { type: string; data: string }
): { theme: string } {
  switch (action.type) {
    case appConstants.CHANGE_THEME:
      Cookies.remove('theme');
      Cookies.set('theme', action.data);
      return {
        ...state,
        theme: action.data
      };
    default:
      return state;
  }
}

export default app;
