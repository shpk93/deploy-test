import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

const FormArea = styled.form`
  display: flex;
`;

const ButtonStyle = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: transparent;
`;
const SearchArea = styled.input`
  background-color: transparent;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-color: white;

  ::placeholder {
    color: white;
  }
`;
function Search({ getPosts, setGetPosts }) {
  const [keyword, setKeyword] = useState('');
  const [option, setOption] = useState('제목');
  const [data, setdata] = useState([]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const getOption = (e) => {
    setOption(e.target.value);
  };
  const onSearch = () => {
    let result;
    if (option === '제목') {
      result = data.filter((posts) => posts.title.includes(keyword));
    }
    if (option === '메인메뉴') {
      result = data.filter((posts) => posts.mainmenu.includes(keyword));
    }
    if (option === '닉네임') {
      result = data.filter((posts) => posts.username.includes(keyword));
    }
    setGetPosts(result);
  };
  useEffect(() => {
    setdata(getPosts);
  }, []);

  return (
    <FormArea onSubmit={(e) => e.preventDefault()}>
      <select onChange={getOption}>
        <option value="제목">제목</option>
        <option value="메인메뉴">메인메뉴</option>
        <option value="닉네임">닉네임</option>
      </select>
      <SearchArea type="text" placeholder="Search.." name="search" value={keyword} onChange={handleKeyword} />
      <ButtonStyle type="submit" onClick={onSearch}>
        <SearchIcon style={{ color: 'white' }} onClick={onSearch} />
      </ButtonStyle>
    </FormArea>
  );
}

export default Search;
