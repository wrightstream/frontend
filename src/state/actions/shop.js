import Shop from '../models/shop';

export const GET_SHOP = 'GET_SHOP';
export const EDIT_SHOP_SUCCESS = 'EDIT_SHOP_SUCCESS';
export const EDIT_SHOP_FAILURE = 'EDIT_SHOP_FAILURE';
export const EDIT_SHOP_RESET = 'EDIT_SHOP_RESET';
export const ARCHIVE_SHOP = 'ARCHIVE_SHOP';
export const GET_ROLES = 'GET_ROLES';
export const GET_STAFFS = 'GET_STAFFS';
export const GET_STAFFS_ARCHIVED = 'GET_STAFFS_ARCHIVED';
export const ADD_STAFF_SUCCESS = 'ADD_STAFF_SUCCESS';
export const ADD_STAFF_FAILURE = 'ADD_STAFF_FAILURE';
export const ADD_STAFF_RESET = 'ADD_STAFF_RESET';
export const EDIT_STAFF_SUCCESS = 'EDIT_STAFF_SUCCESS';
export const EDIT_STAFF_FAILURE = 'EDIT_STAFF_FAILURE';
export const EDIT_STAFF_RESET = 'EDIT_STAFF_RESET';
export const ARCHIVE_STAFF_SUCCESS = 'ARCHIVE_STAFF_SUCCESS';
export const ARCHIVE_STAFF_FAILURE = 'ARCHIVE_STAFF_FAILURE';
export const ARCHIVE_STAFF_RESET = 'ARCHIVE_STAFF_RESET';
export const RESTORE_STAFF = 'RESTORE_STAFF';
export const GET_PLATFORMS = 'GET_PLATFORMS';

export const getShop = () => {
  return async dispatch => {
    const payload = await Shop.getShop();
    dispatch({type: GET_SHOP, payload});
  };
};

export const editShop = shop => {
  return async dispatch => {
    try {
      const payload = await Shop.editShop(shop);
      dispatch({type: EDIT_SHOP_SUCCESS, payload});
    } catch (err) {
      dispatch({type: EDIT_SHOP_FAILURE, payload: err});
    }
  };
};

export const editShopReset = () => {
  return dispatch => {
    dispatch({type: EDIT_SHOP_RESET});
  };
};

export const archiveShop = () => {
  return async dispatch => {
    const payload = await Shop.archiveShop();
    dispatch({type: ARCHIVE_SHOP, payload});
  };
};

export const getRoles = () => {
  return async dispatch => {
    const payload = await Shop.getRoles();
    dispatch({type: GET_ROLES, payload});
  };
};

export const getStaffs = () => {
  return async dispatch => {
    const payload = await Shop.getStaffs();
    dispatch({type: GET_STAFFS, payload});
  };
};

export const addStaff = staff => {
  return async dispatch => {
    try {
      const payload = await Shop.addStaff(staff);
      dispatch({type: ADD_STAFF_SUCCESS, payload});
    } catch (err) {
      dispatch({type: ADD_STAFF_FAILURE, payload: err});
    }    
  };
};

export const addStaffReset = () => {
  return dispatch => {
    dispatch({type: ADD_STAFF_RESET});
  };
};

export const editStaff = (staff, staff_id) => {
  return async dispatch => {
    try {
      const payload = await Shop.editStaff(staff, staff_id);
      dispatch({type: EDIT_STAFF_SUCCESS, payload});
    } catch (err) {
      dispatch({type: EDIT_STAFF_FAILURE, payload: err});
    }
  };
};

export const editStaffReset = () => {
  return dispatch => {
    dispatch({type: EDIT_STAFF_RESET});
  };
};

export const archiveStaff = staff_id => {
  return async dispatch => {
    try {
      const payload = await Shop.archiveStaff(staff_id);
      dispatch({type: ARCHIVE_STAFF_SUCCESS, payload});
    } catch (err) {
      dispatch({type: ARCHIVE_STAFF_FAILURE, payload: err});
    }
  };
};

export const archiveStaffReset = () => {
  return dispatch => {
    dispatch({type: ARCHIVE_STAFF_RESET});
  };
};

export const restoreStaff = staff_id => {
  return async dispatch => {
    const payload = await Shop.restoreStaff(staff_id);
    dispatch({type: RESTORE_STAFF, payload});
  };
};

export const getPlatforms = () => {
  return async dispatch => {
    const payload = await Shop.getPlatforms();
    dispatch({type: GET_PLATFORMS, payload});
  };
};