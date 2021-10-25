import React from 'react';
import styled from 'styled-components';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode, clearUser } from '../redux/localSettingsRedux';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { request } from '../requestMethods';
import { useHistory } from 'react-router';

const Container = styled.div`
    height: 60px;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
`;

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    flex: 1;
    padding: 0px 10px;
`;

const Logo = styled.h1`
    font-weight: bold;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    padding: 0px 10px;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    display: flex;
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
    align-items: center;
`;

const NavBar = () => {
  const darkMode = useSelector(state => state.localSettings.darkMode);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const user = useSelector(state => state.localSettings.user);

  const createArticle = async () => {
    try {
      const res = await request.put('/post/create', {}, { headers: { Authorization: `Bearer ${user.currentUser.accessToken}` } });
      history.push(`/edit/${res.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const openMyArticles = async () => {
    try {
      history.push(`/profile/${user.currentUser.user.username}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>MDBlog</Logo>
          </Link>
        </Left>
        {user.currentUser
          ? (<Right>
            <Link to='/modify' style={{ textDecoration: 'none', color: 'black' }}>
              <MenuItem>
                <Avatar value={user.currentUser.user.username} round size='40' style={{ marginRight: '5px' }} src={user.currentUser.user.avatar} />
                {user.currentUser.user.username}
              </MenuItem>
            </Link>
            <MenuItem onClick={() => { createArticle(); }}>CREATE ARTICLE</MenuItem>
            <MenuItem onClick={() => { openMyArticles(); }}>MY ARTICLES</MenuItem>
            <MenuItem onClick={() => { dispatch(clearUser()); }}>LOGOUT</MenuItem>
             </Right>)
          : (<Right>
            <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
              <MenuItem>LOGIN</MenuItem>
            </Link>
             </Right>)}
        <MenuItem>
          {darkMode ? <LightModeIcon onClick={() => changeMode()} /> : <DarkModeIcon onClick={() => changeMode()} />}
        </MenuItem>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
