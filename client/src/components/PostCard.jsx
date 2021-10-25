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

const ImageContainer = styled.div`
    width: ${props => props.imagePosition === 'top' ? '100%' : '200px'};
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 2rem;
    font-weight: bold;
`;

const Image = styled.img`
    max-width:100%;
    max-height:100%;
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
        <ImageContainer imagePosition={imagePosition}>
          {post.image ? <Image src={post.image} /> : 'IMAGE'}
        </ImageContainer>
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
