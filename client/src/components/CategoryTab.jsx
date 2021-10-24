import React from 'react';
import styled from 'styled-components';
import { mainPageArticles } from '../data';
import PostCard from './PostCard';

const Container = styled.div`
    width: 300px;
    margin-bottom: 30px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostList = styled.div`
    background-color: rgba(255, 255,255, 0.4);;
    flex: 1;
`;

const TabNameWrapper = styled.div`
    display: flex;
`;

const TabNameContainer = styled.div`
    padding: 0px 20px;
`;

const TabName = styled.h3`
    background-color: rgba(255, 255,255, 0.4);
    padding: 0px 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Empty = styled.div`
    flex: 1;
`;

const CategoryTab = ({ cat }) => {
  const shuffle = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  return (
    <Container>
      <Wrapper>
        <TabNameWrapper>
          <TabNameContainer>
            <TabName>{cat}</TabName>
          </TabNameContainer>
          <Empty />
        </TabNameWrapper>
        <PostList>
          {shuffle(mainPageArticles).map(element => (<PostCard post={element} key={element.id} />))}
        </PostList>
      </Wrapper>
    </Container>
  );
};

export default CategoryTab;
