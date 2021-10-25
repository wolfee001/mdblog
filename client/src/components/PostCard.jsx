import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Info = styled.div`
    margin: 10px 5px 10px 5px;
    padding: 5px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: ${props => props.imagePosition === 'top' ? 'column' : 'row'};
`;

const Image = styled.img`
    width: 100%;
    max-width: ${props => props.imagePosition === 'top' ? '-1' : '200'}px;
    max-height: 100%;
`;

const Texts = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: ${props => props.imagePosition === 'top' ? '0' : '1'}rem;
`;

const Title = styled.h4`
    margin-top: 5px;
`;

const Author = styled.h5`
    margin-top: 5px;
`;

const Short = styled.p`
    margin-top: 5px;
    font-size: 14px;
`;

const PostCard = ({ post, imagePosition = 'top' }) => {
  return (
    <Container>
      <Info imagePosition={imagePosition}>
        <Image src={post.img} imagePosition={imagePosition} />
        <Texts>
          <Title>{post.title}</Title>
          <Author>{post.author}</Author>
          <Short>{post.short}</Short>
        </Texts>
      </Info>
    </Container>
  );
};

export default PostCard;
