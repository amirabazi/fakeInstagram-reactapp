import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

ReactDOM.render(
 
  <React.StrictMode>
     <RecoilRoot> 
    <App className='App' />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
  
);

