import React from 'react';
import './index.css';

const App = ({ data }: { data: Record<string, string> }) => {
  let str = '';
  if (data.address_first_line) str += data.address_first_line;
  if (data.address_second_line) str += `\n${data.address_second_line}  `;
  if (data.postcode) str += data.postcode;
  if (data.telephone) str += `\n${data.telephone}`;
  if (data.fax) str += `  ${data.fax}`;
  if (data.mobile) str += `\n${data.mobile}`;
  if (data.email) str += `\n${data.email}`;

  str += '\nsingaporeair.com';

  return (
    <div id="capture" className={`App ${data.language}`}>
      <div className="text">
        <div className="name">{data.name}</div>
        <div className="position">{data.position}</div>
        <pre className="info">{str}</pre>
      </div>
      <div className="logo" />
      <div className="qrcode" />
    </div>
  );
};

export default App;
