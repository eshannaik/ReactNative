import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        ids:[]
    },
    reducers: {
        addFavorite: (state, actions) => {
            state.ids.push(actions.payload.id);
        },
        removeFavorite: (state, actions) => {
            state.ids.splice(state.ids.indexOf(actions.payload.id),1); // removing the index
        }
    }
})

export const addFavorite = favoriteSlice.actions.addFavorite;
export const removeFavorite = favoriteSlice.actions.removeFavorite;
export default favoriteSlice.reducer;