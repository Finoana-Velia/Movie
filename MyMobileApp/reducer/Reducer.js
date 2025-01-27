const initialState = { favorites : []}

function toggleFavorite(state = initialState, action){
    let nextState;

    switch(action.type) {
        case 'TOGGLE_FAVORITE' :
            const favoriteIndex = state.favorites.findIndex(item => item.id  === action.value.id);
            if(favoriteIndex !== -1 ){
                //suppression dans la liste des favorite si on n'y trouve pas son index
                nextState = {
                    ...state,
                    favorites : [...state.favorites.filter((item,index) => index !== favoriteIndex),action.value]
                }
            }else {
                //rajoute le film dans la liste des favorie
                nextState = {
                    ...state,
                    favorites : [...state.favorites,action.value]
                }
            }
            return nextState || state;
        default : 
        return state;
    }
}

export default toggleFavorite;