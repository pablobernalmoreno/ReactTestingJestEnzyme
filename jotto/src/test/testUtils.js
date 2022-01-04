import { checkPropTypes } from "prop-types"
import { ShallowWrapper } from "enzyme"
import { applyMiddleware, createStore } from "redux"
import rootReducer from '../reducers'
import { middlewares } from "../configureStore"

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer
 * @param {object} initialState - Initial State for store.
 * @returns  {Store} - Redux Store
 */
export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares))
}

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} value - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttribute = (wrapper, value) => {
    return wrapper.find(`[data-test='${value}']`)
}

export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name)
    expect(propError).toBeUndefined()
}

