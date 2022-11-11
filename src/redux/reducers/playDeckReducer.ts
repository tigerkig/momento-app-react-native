import { DeckAction } from "../actions";

let initialState: boolean = false ;

const PlayDeckReducer = async (state: boolean  = initialState, action: DeckAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SAVE_PLAY_DECK":
      return payload
    default:
      return state;
  }
};

export { PlayDeckReducer };
