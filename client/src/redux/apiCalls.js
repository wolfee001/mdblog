import { request } from '../requestMethods';
import { setError, setFetching } from './authenticationStateRedux';
import { clearUser, loginSuccess } from './localSettingsRedux';

export const login = async (dispatch, user) => {
  dispatch(setFetching(true));
  dispatch(setError(false));
  dispatch(clearUser());
  try {
    const res = await request.post('/authentication/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(setError(true));
  }
  dispatch(setFetching(false));
};

export const register = async (dispatch, user) => {
  dispatch(setFetching(true));
  dispatch(setError(false));
  dispatch(clearUser());
  try {
    const res = await request.post('/authentication/register', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(setError(true));
  }
  dispatch(setFetching(false));
};

export const modifyUser = async (dispatch, user, jwt) => {
  dispatch(setFetching(true));
  dispatch(setError(false));
  try {
    const res = await request.post('/user/modify', user, { headers: { Authorization: `Bearer ${jwt}` } });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(setError(true));
    dispatch(clearUser());
  }
  dispatch(setFetching(false));
};

export const deleteUser = async (dispatch, jwt) => {
  dispatch(setFetching(true));
  dispatch(setError(false));
  try {
    await request.delete('/user/delete', { headers: { Authorization: `Bearer ${jwt}` } });
  } catch (err) {
    dispatch(setError(true));
  }
  dispatch(clearUser());
  dispatch(setFetching(false));
};
