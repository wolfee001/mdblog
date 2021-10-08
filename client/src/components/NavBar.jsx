import React from 'react';
import styled from 'styled-components';

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
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>MDBlog</Logo>
        </Left>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>LOGIN</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
