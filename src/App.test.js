import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import App from './App';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});