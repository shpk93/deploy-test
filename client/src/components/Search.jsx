import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

function Search() {
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

  return (
    <FormArea action="/action_page.php">
      <SearchArea type="text" placeholder="Search.." name="search" />
      <ButtonStyle type="submit">
        <SearchIcon style={{ color: 'white' }} />
      </ButtonStyle>
    </FormArea>
  );
}

export default Search;
