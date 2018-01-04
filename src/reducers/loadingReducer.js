export default function reducer(state = {}, action) {
    switch (action.type) {
        case "SHOW":
            state = Object.assign({}, state, { isShow: true });
            break;
        case "HIDE":
            state = Object.assign({}, state, { isShow: false });
            break;
    }

    return state;
}