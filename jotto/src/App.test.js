import App from './App';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestAttribute, storeFactory } from './test/testUtils'
import { getSecretWord as mockGetSecretWord } from './actions';
import { Provider } from 'react-redux';

//Activate global mock to make sure getSecretWord doesnt make network call
jest.mock('./actions')

/**
 * Setup function for App component
 * @returns {ReactWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState)
  return mount(<Provider store={store}><App /></Provider>)
}

test('renders without errors', () => {
  const wrapper = setup()
  const appComponent = findByTestAttribute(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1)
})

describe('get secret word', () => {
  beforeEach(() => {
    mockGetSecretWord.mockClear()
  })

  test('getSecretWord on app mount', () => {
    const wrapper = setup()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1)
  })

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()
    wrapper.setProps()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0)
  })
})