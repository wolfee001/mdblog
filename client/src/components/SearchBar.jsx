import React from 'react';
import styled from 'styled-components';
import { topCategories } from '../data';

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.4);
    width: 80%;
    max-width: 540px;
    height: 60px;
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled.div`
    display: flex;
    flex: 3;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid black;
    border-radius: 4px;
    width: 90%;
    height: 50%;
    font-size: 18px;
    padding: 5px 10px;
`;

const QuickCategoryContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
`;

const QuickCategory = styled.div`
    font-weight: bold;
    cursor: pointer;
`;

const SearchBar = () => {
  return (
    <Container>
      <InputContainer>
        <Input type='text' placeholder='Search for some blog posts...' />
      </InputContainer>
      <QuickCategoryContainer>
        {topCategories.map(item => (<QuickCategory key={item}>{item}</QuickCategory>))}
      </QuickCategoryContainer>
    </Container>
  );
};

export default SearchBar;
