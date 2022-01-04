import App from './App';
import Enzyme, { shallow, ShallowWrapper } from "enzyme"
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17"

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />)

const findByTestAttribute = (wrapper, value) => wrapper.find(`[data-test='${value}']`)

test("renders without error", () => {
  const wrapper = setup()
  const appComponent = findByTestAttribute(wrapper, "component-app")
  expect(appComponent.length).toBe(1)
})

test("renders increment button", () => {
  const wrapper = setup()
  const button = findByTestAttribute(wrapper, "increment-button")
  expect(button.length).toBe(1)
})

test("renders counter display", () => {
  const wrapper = setup()
  const counterDisplay = findByTestAttribute(wrapper, "counter-display")
  expect(counterDisplay.length).toBe(1)
})

test("counter display starts at 0", () => {
  const wrapper = setup()
  const count = findByTestAttribute(wrapper, "count").text()
  expect(count).toBe("0")
})

test("clicking increment-button increments counter display", () => {
  //find button
  const wrapper = setup()
  const button = findByTestAttribute(wrapper, "increment-button")

  //simulate click
  button.simulate("click")

  //find display and test if number has been incremented
  const count = findByTestAttribute(wrapper, "count").text()
  expect(count).toBe("1")
})

test("clicking decrement-button decrements counter display", () => {
  //find increment-button
  const wrapper = setup()
  const incrementButton = findByTestAttribute(wrapper, "increment-button")
  incrementButton.simulate("click")

  //find decrement-button
  const decrementButton = findByTestAttribute(wrapper, "decrement-button")
  decrementButton.simulate("click")

  const count = findByTestAttribute(wrapper, "count").text()
  expect(count).toBe("0")
})

test("counter display doesnt go below 0", () => {
  const wrapper = setup()
  const decrementButton = findByTestAttribute(wrapper, "decrement-button")
  decrementButton.simulate("click")

  const count = findByTestAttribute(wrapper, "count").text()
  expect(count).toBe("0")
})

test("error message doesnt appear at first render", () => {
  const wrapper = setup()
  const errorMessage = findByTestAttribute(wrapper, "error-message")
  expect(errorMessage.length).toBe(0)
})

test("error message appears on decrement below 0", () => {
  const wrapper = setup()

  const decrementButton = findByTestAttribute(wrapper, "decrement-button")
  decrementButton.simulate("click")

  const errorMessage = findByTestAttribute(wrapper, "error-message")
  expect(errorMessage.length).toBe(1)
})

test("error message dissappears on increment", () => {
  const wrapper = setup()

  const incrementButton = findByTestAttribute(wrapper, "increment-button")
  incrementButton.simulate("click")

  const errorMessage = findByTestAttribute(wrapper, "error-message")
  expect(errorMessage.length).toBe(0)
})