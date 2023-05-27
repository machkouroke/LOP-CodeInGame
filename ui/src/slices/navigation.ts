import {createSlice} from "@reduxjs/toolkit";

const navigation = createSlice({
        name: 'navigation',
        initialState: {
            previousPages: [],
            hasPrevious: false,
        },
        reducers: {
            previous: (state, action: {
                payload: {
                    history: any,
                }
            }) => {
                const {history} = action.payload;
                const previousPage = state.previousPages.pop()
                if (state.previousPages.length === 0) {
                    state.hasPrevious = false;
                }
                history.push(previousPage)
            },
            next: (state, action: {
                       payload: {
                           currentPath: string,
                           history: any,
                           nextPath: string,
                       }
                   }
            ) => {
                const {currentPath, history, nextPath} = action.payload;
                state.previousPages.push(currentPath)
                state.hasPrevious = true;
                history.push(nextPath)
            }
        }
    }
)

export const {
    previous,
    next
} = navigation.actions;
export default navigation.reducer;