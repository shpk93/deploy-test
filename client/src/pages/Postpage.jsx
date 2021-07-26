import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RadioMenu from '../components/RadioMenu';
import CheckMenu from '../components/CheckMenu';
import axios from 'axios';
import Textbox from '../components/Textbox';
import styled from 'styled-components';

const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const PostAreaStyle = styled.div`
  margin-top: 150px;
  padding: 0;
  height: 100%;
`;

function Postpage() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [allMenu, setAllMenu] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errMessage, setErrMessage] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    //주소 수정해주세요
    const data = await axios.get('https://api.mysubway.ml/menu').then((result) => {
      const arr = [];
      const name = Object.keys(result.data.data);
      const value = Object.values(result.data.data);

      for (let i = 0; i < name.length; i++) {
        arr.push({ [name[i]]: value[i] });
      }
      return arr;
    });
    setAllMenu(data);
  }, []);

  useEffect(() => {
    setErrMessage(false);
  }, [checkedItems]);

  const handleRadio = (item) => {
    const name = checkedItems.map((el) => el.name);
    if (!name.includes(item.name)) {
      let data = item;
      setCheckedItems([...checkedItems, data]);
    } else {
      for (let i = 0; i < checkedItems.length; i++) {
        if (checkedItems[i].name === item.name) {
          let newData = [
            ...checkedItems.slice(0, i),
            { ...checkedItems[i], id: item.id },
            ...checkedItems.slice(i + 1),
          ];
          setCheckedItems(newData);
        }
      }
    }
  };

  const handleCheckBox = (checked, item) => {
    if (checked) {
      const name = checkedItems.map((el) => el.name);
      if (!name.includes(item.name)) {
        setCheckedItems([...checkedItems, item]);
      } else {
        for (let i = 0; i < checkedItems.length; i++) {
          if (checkedItems[i].name === item.name) {
            checkedItems[i].id.push(item.id[0]);
          }
        }
      }
    } else {
      for (let i = 0; i < checkedItems.length; i++) {
        if (checkedItems[i].name === item.name) {
          let newData = checkedItems[i].id.filter((el) => el !== item.id[0]);
          checkedItems[i].id = newData;
        }
      }
    }
  };

  const handlePostSend = () => {
    const check = checkedItems.reduce((acc, cur) => {
      return [...acc, cur.name];
    }, []);
    if (!check.includes('main')) {
      setErrMessage('메인을 선택해주세요');
      return;
    } else if (!check.includes('bread')) {
      setErrMessage('빵을 선택해주세요');
      return;
    } else if (!check.includes('cheese')) {
      setErrMessage('치즈를 선택해주세요');
      return;
    }

    const menu = checkedItems.reduce((acc, cur) => {
      if (Array.isArray(cur.id)) {
        return [...acc, ...cur.id];
      } else {
        return [...acc, cur.id];
      }
    }, []);
    const data = {
      title: title.content,
      content: content.content,
      menu,
    };
    console.log(data);
    //완료시 리렌더링되게 바꿔야함
    axios.post(`${url}posts`, data).then((result) => history.push('/'));
  };

  return (
    allMenu && (
      <PostAreaStyle>
        <Textbox name="Title" textData={setTitle} />
        {allMenu.map((el) => {
          const name = Object.keys(el)[0];
          return name === 'main' || name === 'bread' || name === 'cheese' ? (
            <div>
              <h3>{name}</h3>
              <hr></hr>
              <RadioMenu data={el} handleRadio={handleRadio} />
            </div>
          ) : (
            <div>
              <h3>{name}</h3>
              <hr></hr>
              <CheckMenu data={el} handleCheckBox={handleCheckBox} />
            </div>
          );
        })}
        <Textbox name="Contents" textData={setContent} />
        <div>
          {errMessage ? <div>{errMessage}</div> : null}
          <button onClick={handlePostSend}>GO POST</button>
        </div>
      </PostAreaStyle>
    )
  );
}

export default Postpage;
