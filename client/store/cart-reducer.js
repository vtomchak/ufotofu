import axios from 'axios'

//action constant
export const GET_CART_ITEMS = 'GET_CART_ITEMS'

//action creator
export const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

//thunk
export const fetchCart = userId => {
  return async dispatch => {
    try {
      console.log('userId', userId)
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(getCartItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}
//reducer is changing your state
export default function getCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems
    default:
      return state
  }
}
