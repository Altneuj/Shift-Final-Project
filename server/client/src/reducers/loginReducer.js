import { SUBMIT_USER } from "../actions/types";

export default function(state = null, action) {
    switch (action.type) {
        case SUBMIT_USER:
            return action.payload.data || null;

      default:
        return state;
    }
  }
