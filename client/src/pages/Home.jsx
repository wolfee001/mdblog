import React from 'react';
import styled from 'styled-components';
import CategoryTab from '../components/CategoryTab';
import SearchBar from '../components/SearchBar';
import { topCategories } from '../data';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainPanel = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding-top: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 10px 0px;
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
`;

const Home = () => {
  return (
    <Container>
      <SearchContainer>
        <SearchBar />
      </SearchContainer>
      <MainPanel>
        <CategoryContainer>
          {topCategories.map(element => (<CategoryTab key={element} cat={element} />))}
        </CategoryContainer>
      </MainPanel>
    </Container>
  );
};

export default Home;
