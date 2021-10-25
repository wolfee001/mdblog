import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import gfm from 'remark-gfm';
import slug from 'remark-slug';
import toc from 'remark-toc';
import highlight from 'rehype-highlight';
import '../style/md.css';
import { useFilePicker } from 'use-file-picker';
import { useLocation } from 'react-router';
import { request } from '../requestMethods';
import { useSelector } from 'react-redux';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const EditorContainer = styled.div`
    flex: 1;
    margin: 0.5rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.4);
`;

const ImageField = styled.div`
    display: flex;
    width: 200px;
    height: 100px;
    background: rgba(255, 255, 255, 0.4);
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
`;

const Image = styled.img`
    max-width:100%;
    max-height:100%;
`;

const TitleField = styled.input`
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.4);
    padding: 0.25rem;
    margin: 0.25rem;
    outline: 0;
    border: 0;
`;

const ShortField = styled.textarea`
    width: 100%;
    border: 0;
    resize: none;
    padding: 0;
    outline: 0;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.4);
    padding: 0.25rem;
    margin: 0.25rem;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

const TitleTextsContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.4);
    margin-left: 0.5rem;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ShortContainer = styled.div`
    flex: 1;
    display: flex;
`;

const Text = styled.h3`
    margin: 0.25rem;
    min-width: 50px;
`;

const ArticleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const EditorField = styled.textarea`
    width: 100%;
    border: 0;
    resize: none;
    padding: 0;
    height: 100%;
    outline: 0;
    flex: 1;
    font-size: 1rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0);
`;

const PreviewContainer = styled.div`
    flex: 1;
    margin: 0.5rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.4);
`;

const CheckBoxLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 15px;
    border: 1px solid black;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: rgba(255, 255, 255, 0.4);
        transition: 0.2s;
        border: 1px solid black;
    }
`;

const CheckBox = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 15px;
    width: 42px;
    height: 26px;
    &:checked + ${CheckBoxLabel} {
        background: lightblue;
        &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            margin-left: 19px;
            transition: 0.2s;
        }
    }
`;

const CheckBoxWrapper = styled.div`
    position: relative;
`;

const MiscContainer = styled.div`
    display: flex;
    margin-left: 0.5rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.4);
    flex-direction: column;
    justify-content: space-between;
`;

const MiscElement = styled.div`
    display: flex;
`;

const Button = styled.button`
    flex: 1;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    &:disabled {
      background-color: rgba(128, 128, 128, 0.4);
      color: #777
    }
`;

const Category = styled.h4`
    border: ${props => props.selected ? '1' : '0'}px solid black;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0.25rem;
    padding: 0.125rem;
`;

const EditArticle = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const categories = ['Culture', 'Life&Style', 'Outside', 'Gastro', 'Tech', 'Sports', 'Personal'];

  const user = useSelector(state => state.localSettings.user);
  const [article, setArticle] = useState({
    image: undefined,
    title: '',
    short: '',
    text: '',
    public: false,
    categories: ['Personal']
  });

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 2 // in megabytes
  });

  useEffect(() => {
    if (filesContent.length) {
      setArticle(u => ({ ...u, image: filesContent[0].content }));
    }
  }, [filesContent]);

  useEffect(() => {
    if (user.currentUser) {
      request.get(`/post/edit/${id}`, { headers: { Authorization: `Bearer ${user.currentUser.accessToken}` } })
        .then(res => {
          setArticle({
            image: res.data.image,
            title: res.data.title,
            short: res.data.short,
            text: res.data.text,
            public: res.data.public,
            categories: res.data.categories
          });
        })
        .catch(err => console.log(err));
    }
  }, [user, id]);

  const [onSave, setOnSave] = useState(false);

  const save = async () => {
    setOnSave(true);
    try {
      await request.post(`/post/edit/${id}`, article, { headers: { Authorization: `Bearer ${user.currentUser.accessToken}` } });
    } catch (err) {
      console.log(err);
    }
    setOnSave(false);
  };

  return (
    <Container>
      <HeaderContainer>
        <ImageField onClick={() => openFileSelector()}>
          {article.image ? <Image src={article.image} /> : 'IMAGE'}
        </ImageField>
        <TitleTextsContainer>
          <TitleContainer>
            <Text>Title</Text>
            <TitleField value={article.title} onChange={(event) => setArticle(u => ({ ...u, title: event.target.value }))} />
            <Text>Categories</Text>
            {categories.map((element, index) =>
              <Category
                key={index}
                selected={article.categories.indexOf(element) !== -1}
                onClick={() => {
                  const cc = [...article.categories];
                  const idx = cc.indexOf(element);
                  if (idx === -1) {
                    cc.push(element);
                  } else {
                    cc.splice(idx, 1);
                  }
                  setArticle(u => ({ ...u, categories: cc }));
                }}
              >
                {element}
              </Category>
            )}
          </TitleContainer>
          <ShortContainer>
            <Text>Short</Text>
            <ShortField value={article.short} onChange={(event) => setArticle(u => ({ ...u, short: event.target.value }))} />
          </ShortContainer>
        </TitleTextsContainer>
        <MiscContainer>
          <MiscElement>
            <Text>Article is public</Text>
            <CheckBoxWrapper>
              <CheckBox id='checkbox' type='checkbox' checked={article.public} onChange={() => setArticle(u => ({ ...u, public: !u.public }))} />
              <CheckBoxLabel htmlFor='checkbox' />
            </CheckBoxWrapper>
          </MiscElement>
          <MiscElement>
            <Button disabled={onSave} onClick={() => save()}>SAVE</Button>
          </MiscElement>
        </MiscContainer>
      </HeaderContainer>
      <ArticleContainer>
        <EditorContainer>
          <EditorField value={article.text} onChange={(event) => setArticle(u => ({ ...u, text: event.target.value }))} />
        </EditorContainer>
        <PreviewContainer>
          <ReactMarkdown className='markdown-body' remarkPlugins={[gfm, slug, toc]} rehypePlugins={[highlight]}>
            {article.text}
          </ReactMarkdown>
        </PreviewContainer>
      </ArticleContainer>
    </Container>
  );
};

export default EditArticle;
