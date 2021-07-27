import React from 'react';
import styled from 'styled-components';

const InputStyle = styled.input`
  display: none;
  &:checked {
    border: 20px solid rgb(0, 0, 0);
  }
`;

const CheckedStyle = styled.div`
  [type='checkbox']:checked + label > img {
    transform: scale(1.3);
  }
`;

const ImgStyle = styled.img`
  width: 20vw;
  height: 20vw;
  margin: 0px;
  padding: 0px;
  &:hover {
    opacity: 0.6;
    transition: transform 0.2s ease-out, color 0.2s ease;
    /* transition: all 0.2s ease-in-out; */
    transform: scale(1.2);
    cursor: pointer;
  }
  &:active {
    opacity: 0.4;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const Caption = styled.div`
  padding: 1em;
  line-height: 1;
  font-family: font-css;
  text-align: center;
  color: black;
  top: 0;
  bottom: auto;
`;

const SelectSectionStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: space-around;
  width: 100vw;
`;

function CheckMenu({ data, handleCheckBox }) {
  const name = Object.keys(data)[0];
  const menu = data[name];
  return (
    <SelectSectionStyle>
      {menu.map((el) =>
        el.img_url ? (
          <CheckedStyle>
            <InputStyle
              type="checkbox"
              id={el.id}
              name={name}
              value={el.id}
              onChange={(e) => {
                const data = { name, id: [el.id] };
                handleCheckBox(e.target.checked, data);
              }}
            />
            <label for={el.id}>
              <ImgStyle src={el.img_url} />
            </label>
          </CheckedStyle>
        ) : (
          <CheckedStyle>
            <input
              type="checkbox"
              id={el.id}
              name={name}
              value={el.id}
              onChange={(e) => {
                const data = { name, id: [el.id] };
                handleCheckBox(e.target.checked, data);
              }}
            />
            <label for={el.id}>{el.name}</label>
            {name === 'addmeat' ? null : <Caption>{el.name}</Caption>}
          </CheckedStyle>
        ),
      )}
    </SelectSectionStyle>
  );
}

export default CheckMenu;
