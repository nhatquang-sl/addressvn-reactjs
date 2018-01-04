let initialState = {
    addresses: [],
    address: {},
    pending: false
}
export default function reducer(state = initialState, action) {
    let addresses = [];
    switch (action.type) {
        case "CREATE_ADDRESS_FULFILLED":
            addresses = JSON.parse(JSON.stringify(state.addresses));
            addresses.unshift({ id: action.payload.data.name });
            state = Object.assign({}, state, { addresses, pending: false });
            break;
        case "UPDATE_ADDRESS_FULFILLED":
            addresses = JSON.parse(JSON.stringify(state.addresses));
            addresses = addresses.map((adr) => {
                if (adr.id == action.payload.id) return action.payload;
                else return adr;
            });
            state = Object.assign({}, state, { addresses, address: {}, pending: false });
            break;
        case "GET_ADDRESSES_FULFILLED":
            if (action.payload.data) {
                Object.getOwnPropertyNames(action.payload.data).forEach(
                    function (val) {
                        addresses.push(Object.assign({}, action.payload.data[val], { id: val }));
                    }
                );
                addresses = addresses.sort(function (a, b) { return b.createdDate - a.createdDate });
            }
            state = Object.assign({}, state, { addresses, pending: false });
            break;
        case "GET_CURRENT_ADDRESS_FULFILLED":
            state = Object.assign({}, state, { address: action.payload, pending: false });
            break;
        case "CREATE_ADDRESS_PENDING":
        case "UPDATE_ADDRESS_PENDING":
        case "GET_ADDRESSES_PENDING":
        case "GET_CURRENT_ADDRESS_PENDING":
            state = Object.assign({}, state, { pending: true });
            break;
    }

    return state;
}