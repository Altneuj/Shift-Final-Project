import { FETCH_NOUN } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_NOUN:
            return action.payload.data || null;
      default:
        return state;
    }
  }
