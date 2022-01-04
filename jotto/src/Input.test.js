import React from "react"
import { mount, ReactWrapper } from "enzyme"
import { findByTestAttribute, checkProps, storeFactory } from "../src/test/testUtils"
import Input from "./Input"
import { Provider } from "react-redux"


const defaultProps = {
  secretWord: "party",
}

//Mock entire module for destructuring
let mockSetCurrentGuess = jest.fn()
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockSetCurrentGuess]
}))

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ReactWrapper}
 */
const setup = (initialState = {}, props = {}) => {
  const store = storeFactory(initialState)
  const setupProps = { ...defaultProps, ...props }
  return mount(<Provider store={store}><Input {...setupProps} /></Provider>)
}

describe('render', () => {
  describe('success is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: false });
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttribute(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box displays', () => {
      const inputBox = findByTestAttribute(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button displays', () => {
      const submitButton = findByTestAttribute(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
  describe('success is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    })
    test('Input renders without error', () => {
      const inputComponent = findByTestAttribute(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });
    test('input box does not display', () => {
      const inputBox = findByTestAttribute(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not display', () => {
      const submitButton = findByTestAttribute(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });
});

test('does not throw warning with expected props', () => {
  checkProps(Input, defaultProps)
})

describe('state controlled input field', () => {
  let wrapper;
  let originalState
  beforeEach(() => {
    wrapper = setup()
    originalState = mockSetCurrentGuess;
  })

  afterEach(() => {
    mockSetCurrentGuess = originalState;
  })

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttribute(wrapper, "input-box")

    const mockEvent = { target: { value: "train" } }
    inputBox.simulate("change", mockEvent)

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train")
  })

  test("field is cleared upon submit button click", () => {
    const submitButton = findByTestAttribute(wrapper, "submit-button")

    submitButton.simulate('click', { preventDefault() { } })
    expect(mockSetCurrentGuess).toBeCalledWith("")
  })
})
