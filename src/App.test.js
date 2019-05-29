import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({ adapter: new Adapter() })
/**
 * 
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - component props specific for this setup
 * @param {object} state - initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

/**
 * 
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without errors', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('renders counter display', () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setup()
  const initialCounterState = wrapper.state('count')
  expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
  const count = 7
  const wrapper = setup(null, { count })

  // find button and click it
  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  wrapper.update()

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(count + 1)
})

test('clicking button decrements counter display', () => {
  const count = 3
  const wrapper = setup(null, { count })

  // find button and click it
  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  wrapper.update()

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.text()).toContain(count - 1)
})

test('decrementing counter below 0 should throw error', () => {
  const count = 0
  const wrapper = setup(null, { count })

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')
  wrapper.update()

  const errorDisplay = findByTestAttr(wrapper, 'error-display')
  expect(wrapper.state('hasError')).toBeTruthy()
  expect(errorDisplay.hasClass('hidden')).toBeFalsy()
})

test('error should clear on click of increment button', () => {
  const count = 0
  const wrapper = setup(null, { count, hasError: true })

  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')
  wrapper.update()

  const errorDisplay = findByTestAttr(wrapper, 'error-display')
  expect(wrapper.state('hasError')).toBeFalsy()
  expect(errorDisplay.hasClass('hidden')).toBeTruthy()
})
