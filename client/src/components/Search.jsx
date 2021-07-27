import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
axios.defaults.withCredentials = true;

const FormArea = styled.form`
  display: flex;
  width: 100%;
`;

const ButtonStyle = styled.button`
  border: none;
  margin-left: 10px;
  width: 32px;
  height: 65px;
  cursor: pointer;
  background-color: transparent;
`;

const Select = styled.select`
  width: 34%;
  border: 3px solid #00b4cc;
  border-right: #128735;
  padding: 10px;
  height: 66px;
  border-radius: 10px 0px 0px 10px;
  color: #ffffff;
  background-color: #128735;
`;
const Option = styled.option`
  color: #5a3636;
  width: 25%;
  border: 3px solid #00b4cc;
  border-right: #128735;
  padding: 30px;
  height: 40px;
  border-radius: 10px 0px 0px 10px;
  color: #ffffff;
  background-color: #ffffff;
`;

const SearchArea = styled.input`
  border: 3px solid #00b4cc;
  border-left: none;
  padding: 30px 30px 30px 10px;
  height: 40px;
  border-radius: 0px 10px 10px 0px;
  outline: none;
  background-color: #ffffff;
  color: #9dbfaf;
  ::placeholder {
    color: #449b5e;
  }
`;
function Search({ getPosts, setGetPosts }) {
  const [keyword, setKeyword] = useState('');
  const [option, setOption] = useState('제목');

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const getOption = (e) => {
    setOption(e.target.value);
  };
  const onSearch = async () => {
    let allPosts = await axios.get(`${process.env.REACT_APP_API_URL}posts`).then((data) => data.data.data);
    let result;
    if (option === '제목') {
      result = allPosts.filter((posts) => posts.title.includes(keyword)).sort((a, b) => b.likes - a.likes);
    }
    if (option === '메인메뉴') {
      result = allPosts.filter((posts) => posts.mainmenu.includes(keyword)).sort((a, b) => b.likes - a.likes);
    }
    if (option === '닉네임') {
      result = allPosts.filter((posts) => posts.username.includes(keyword)).sort((a, b) => b.likes - a.likes);
    }
    setGetPosts(result);
  };

  return (
    <FormArea onSubmit={(e) => e.preventDefault()}>
      <Select onChange={getOption}>
        <Option value="제목">제목</Option>
        <Option value="메인메뉴">메인메뉴</Option>
        <Option value="닉네임">닉네임</Option>
      </Select>
      <SearchArea type="text" placeholder="Search.." name="search" value={keyword} onChange={handleKeyword} />
      <ButtonStyle type="submit" onClick={onSearch}>
        <SearchIcon style={{ color: 'green' }} onClick={onSearch} />
      </ButtonStyle>
    </FormArea>
  );
}

export default Search;
