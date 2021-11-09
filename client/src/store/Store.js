import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import {PasswordEditReducer, signinReducer, signupReducer} from '../reducer/auth'
import { ItemAddReducer, ItemDeleteReducer, ItemEditReducer, ItemListReducer } from '../reducer/items'
import { CategoryAddReducer, CategoryDeleteReducer, CategoryEditReducer, CategoryListReducer } from '../reducer/category'
import { UnitAddReducer, UnitDeleteReducer, UnitEditReducer, UNITListReducer } from '../reducer/unit'
import { AreaAddReducer, AreaDeleteReducer, AreaEditReducer, AreaListReducer } from '../reducer/area'
import {  RegulateItemListReducer,} from '../reducer/regulateItems'
import { ComplaintListReducer } from '../reducer/complaint'
const userInfo = Cookie.getJSON("userInfo") || null

const initialState = {userSignin: { userInfo }, }
const reducer = combineReducers({
    userSignin:signinReducer,
    userSignup: signupReducer,
    passwordEditData: PasswordEditReducer,
    itemListData: ItemListReducer,
    itemAddData: ItemAddReducer,
    itemEditData: ItemEditReducer,
    itemDeleteData: ItemDeleteReducer,
    regulateItemListData: RegulateItemListReducer,
    categoryListData: CategoryListReducer,
    categoryAddData: CategoryAddReducer,
    categoryEditData: CategoryEditReducer,
    categoryDeleteData: CategoryDeleteReducer,
    unitListData: UNITListReducer,
    unitAddData: UnitAddReducer,
    unitDeleteData: UnitDeleteReducer,
    unitEditData: UnitEditReducer,
    areaListData: AreaListReducer,
    areaAddData: AreaAddReducer,
    areaDeleteData: AreaDeleteReducer,
    areaEditData: AreaEditReducer,
    complaintListData: ComplaintListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store