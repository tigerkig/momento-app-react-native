import { Dispatch } from 'react'

export interface DeckPlayAction{
    readonly type: 'SET_SAVE_PLAY_DECK',
    payload: boolean
}

export type DeckAction = DeckPlayAction;

export const SetSavePlayDeck = (isSavePlayDeck: boolean) => { 
    return async ( dispatch: Dispatch<DeckAction>) => {
        try {           
            dispatch({
                type: 'SET_SAVE_PLAY_DECK',
                payload: isSavePlayDeck
            })
        } catch (error) {
           console.log(error)
        }
    }
}
