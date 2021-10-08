import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Container = styled.div`
    min-height: 60px;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 10px;
`;

const Logo = styled.h3`
`;

const Text = styled.span`
    margin: 5px 0px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Center = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    padding: 0px 10px;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
`;

const IconSet = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>MDBlog</Logo>
          <Text>The next standard of blogging</Text>
        </Left>
        <Center>
          <Text>(c) All rights reserved and so on... Nah, just kidding. It's MIT stuff.</Text>
          <GitHubIcon style={{ cursor: 'pointer' }} onClick={() => { window.open('https://github.com/wolfee001/mdblog', '_blank'); }} />
        </Center>
        <Right>
          <Text>If you like this page, you can reach me out!</Text>
          <IconSet>
            <LinkedInIcon fontSize='large' style={{ cursor: 'pointer', margin: '0px 20px' }} onClick={() => { window.open('https://www.linkedin.com/in/wolfee-dm/', '_blank'); }} />
            <GitHubIcon fontSize='large' cursor='pointer' onClick={() => { window.open('https://github.com/wolfee001', '_blank'); }} />
          </IconSet>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
