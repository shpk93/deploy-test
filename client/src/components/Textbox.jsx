import React from 'react';

function Textbox({ name, textData }) {
  // name="Title" textData={setTitle}

  const handleText = (e) => {
    console.log({ content: e.target.value });
    textData({ content: e.target.value });
  };

  return (
    <div>
      <h3>{name}</h3>
      <hr></hr>
      <input type="textbox" onChange={handleText} />
    </div>
  );
}

export default Textbox;
