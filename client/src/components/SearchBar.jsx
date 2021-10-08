import React from 'react';
import styled from 'styled-components';

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
        <QuickCategory>Culture</QuickCategory>
        <QuickCategory>Life&Style</QuickCategory>
        <QuickCategory>Outside</QuickCategory>
        <QuickCategory>Gastro</QuickCategory>
        <QuickCategory>Tech</QuickCategory>
        <QuickCategory>Sports</QuickCategory>
        <QuickCategory>Personal</QuickCategory>
      </QuickCategoryContainer>
    </Container>
  );
};

export default SearchBar;
