import {
  GET_SHOP,
  EDIT_SHOP_SUCCESS,
  EDIT_SHOP_FAILURE,
  EDIT_SHOP_RESET,
  ARCHIVE_SHOP,
  GET_PLATFORMS
} from '../actions/shop';

let initial = {
  shop: {},
  editShopError: false,
  platforms: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case GET_SHOP:
      return {...state, shop: action.payload};
    case EDIT_SHOP_SUCCESS:
      return {...state, shop: action.payload, editShopError: false};
    case EDIT_SHOP_FAILURE:
      return {...state, editShopError: true};
    case EDIT_SHOP_RESET:
      return {...state, editShopError: false};
    case ARCHIVE_SHOP:
      return {...state, shop: action.payload};
    case GET_PLATFORMS:
      return {...state, platforms: action.payload};
    default:
      return state;
  }
};