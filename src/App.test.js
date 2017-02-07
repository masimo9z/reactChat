import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import App from './App';
import { mount } from 'enzyme';
    
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders three needle and two circles', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('circle')).toHaveLength(2);
    expect(wrapper.find('line')).toHaveLength(3);
  });

it('its midnight', () => {
    const clock = sinon.useFakeTimers(new Date(2016,12,1).getTime());
    const wrapper = mount(<App />);
    new Date();
    var needle1 = wrapper.find('line').at(0).props();
    var needle2 = wrapper.find('line').at(1).props();
    var needle3 = wrapper.find('line').at(2).props();
    
    expect(parseInt(needle1.x1)).toEqual(parseInt(needle1.x2));
    expect(parseInt(needle2.x1)).toEqual(parseInt(needle2.x2));
    expect(parseInt(needle3.x1)).toEqual(parseInt(needle3.x2));
    expect(parseInt(needle1.x1)).toEqual(parseInt(needle2.x2));
    expect(parseInt(needle2.x1)).toEqual(parseInt(needle3.x2));
    
    expect(parseInt(needle2.y2)).not.toEqual(parseInt(needle3.y1));
    expect(parseInt(needle2.y1)).toBeLessThan(parseInt(needle3.y2));
  });

it('its 6clock', () => {
    const clock = sinon.useFakeTimers(new Date(2016,12,1, 6,30,30).getTime());
    const wrapper = mount(<App />);
    new Date();
    var needle1 = wrapper.find('line').at(0).props();
    var needle2 = wrapper.find('line').at(1).props();
    var needle3 = wrapper.find('line').at(2).props();
    
    expect(parseInt(needle1.x1)).toEqual(parseInt(needle1.x2));
    expect(parseInt(needle2.x1)).toEqual(parseInt(needle2.x2));
    expect(parseInt(needle3.x1)).toEqual(parseInt(needle3.x2));
    expect(parseInt(needle1.x1)).toEqual(parseInt(needle2.x2));
    expect(parseInt(needle2.x1)).toEqual(parseInt(needle3.x2));
  });

it('On Time Change', () => {
    const clock = sinon.useFakeTimers(new Date(2016,12,1).getTime());
    const wrapper = mount(<App />);
    clock.tick(15000);
    var needle1 = wrapper.find('line').at(0).props();
    var needle2 = wrapper.find('line').at(1).props();
    var needle3 = wrapper.find('line').at(2).props();
    expect(parseInt(Math.round(needle3.y1))).toEqual(parseInt(needle3.y2));
    clock.restore();
});

it('simulates click events', () => {
    const wrapper = mount(<App />);
    let initialCircleColor =  wrapper.find('circle').at(0).props().fill;
    wrapper.find('circle').at(0).simulate('click');
    var newCircleColor = wrapper.find('circle').at(0).props().fill;
    expect(initialCircleColor).not.toEqual(newCircleColor);
  });

it('Digital Analogique', () => {
    const clock = sinon.useFakeTimers(new Date(2016,12,1).getTime());
    const wrapper = mount(<App />);
    wrapper.find('input[name="displayAnalogic"]').at(0).simulate('click');
    expect(wrapper.find('.App-analogic p').text()).toContain('0:0:0');
    clock.restore();
  });