import React from 'react';
import styled from 'styled-components';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../redux/localSettingsRedux';
import { Link } from 'react-router-dom';

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
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
`;

const NavBar = () => {
  const darkMode = useSelector(state => state.localSettings.darkMode);
  const dispatch = useDispatch();

  const changeMode = () => {
    dispatch(setDarkMode(!darkMode));
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>MDBlog</Logo>
          </Link>
        </Left>
        <Right>
          <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem>LOGIN</MenuItem>
          </Link>
          <MenuItem>
            {darkMode ? <LightModeIcon onClick={() => changeMode()} /> : <DarkModeIcon onClick={() => changeMode()} />}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
