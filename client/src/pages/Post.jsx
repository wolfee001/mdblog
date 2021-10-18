import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import toc from 'remark-toc';
import highlight from 'rehype-highlight';
import { singleArticle } from '../data';
import '../style/md.css';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

const ImgContainer = styled.div`
    width: 100%;
`;

const Img = styled.img`
    width: 100%;
`;

const SubInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const AuthorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const AuthorText = styled.h3`
    margin: 0px 5px;
`;

const Author = styled.h3`
    cursor: pointer;
`;

const CategoriesContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CategoryText = styled.h4`
    margin: 0px 10px;
`;

const Category = styled.h4`
    margin: 0px 5px;
    cursor: pointer;
`;

const TextContainer = styled.div`
    width: 90%;
    max-width: 800px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.4);
`;

const Post = () => {
  return (
    <Container>
      <TextContainer>
        <Info>
          <ImgContainer>
            <Img src={singleArticle.img} />
          </ImgContainer>
          <SubInfoContainer>
            <AuthorContainer>
              <AuthorText>Author: </AuthorText>
              <Author>{singleArticle.author}</Author>
            </AuthorContainer>
            <CategoriesContainer>
              <CategoryText>Categories:</CategoryText>
              {singleArticle.categories.map(element => (<Category key={element}>{element}</Category>))}
            </CategoriesContainer>
          </SubInfoContainer>
        </Info>
        <ReactMarkdown className='markdown-body' remarkPlugins={[gfm, slug, toc]} rehypePlugins={[highlight]}>
          {singleArticle.text}
        </ReactMarkdown>
      </TextContainer>
    </Container>
  );
};

export default Post;
