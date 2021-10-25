import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { request } from '../requestMethods';

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Background = styled.div`
    width: 90%;
    max-width: 800px;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
`;

const DataContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.h1`
    margin-bottom: 1rem;
`;

const FullName = styled.h4``;

const Email = styled.h4``;

const Hr = styled.hr`
    height: 0;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
`;

const Title = styled.h1``;

const PostList = styled.div`
    flex: 1;
`;

const PostWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Button = styled.button`
    flex: 1;
    border: 1px solid black;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    max-height: 40px;
    &:disabled {
      background-color: rgba(128, 128, 128, 0.4);
      color: #777
    }
`;

const PostCardWrapper = styled.div`
    flex: 1;
`;

const Profile = () => {
  const location = useLocation();
  const username = location.pathname.split('/')[2];

  const user = useSelector(state => state.localSettings.user.currentUser || null);

  const [isItMe, setIsItMe] = useState(false);
  const [articles, setArticles] = useState([]);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let me = false;
    if (user) {
      me = user.user.username === username;
      setIsItMe(me);
    } else {
      setIsItMe(false);
    }
    if (me) {
      setUserData(null);
    } else {
      request.get(`/user/${username}`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => {
          console.log(err);
          history.push('/');
        });
    }
  }, [history, user, username]);

  useEffect(() => {
    const options = user ? { headers: { Authorization: `Bearer ${user.accessToken}` } } : {};
    request.get(`/post/user/${username}`, options)
      .then(res => {
        setArticles(res.data.posts);
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
  }, [username, history, user]);

  const deleteArticle = async (index) => {
    try {
      const id = articles[index].id;
      const ac = [...articles];
      ac.splice(index, 1);
      setArticles(ac);
      await request.delete(`/post/${id}`, { headers: { Authorization: `Bearer ${user.accessToken}` } });
    } catch (err) {
      console.log(err);
      history.push('/');
    }
  };

  return (
    <Container>
      <Background>
        {!isItMe && userData &&
          <DataContainer>
            <InfoContainer>
              <UserName>{userData.username}</UserName>
              <FullName>{userData.name}</FullName>
              {userData.email && <Email>{userData.email}</Email>}
            </InfoContainer>
            <Avatar value={userData.username} round src={userData.avatar} />
          </DataContainer>}
        <Hr />
        <Title>Articles</Title>
        {articles &&
          <PostList>
            {articles.map((element, index) => (
              <PostWrapper key={index}>
                <PostCardWrapper>
                  <PostCard post={element} imagePosition='left' />
                </PostCardWrapper>
                {isItMe &&
                  <EditContainer>
                    {!element.public && <h4>unpublished</h4>}
                    <Button onClick={() => history.push(`/edit/${element.id}`)}>EDIT</Button>
                    <Button onClick={() => deleteArticle(index)}>DELETE</Button>
                  </EditContainer>}
              </PostWrapper>
            ))}
          </PostList>}
      </Background>
    </Container>
  );
};

export default Profile;
