import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import {useDispatch} from "react-redux";
import {resourceName} from "./Config";
import {searchProduct} from "../../redux/ProductSlice";
import {searchCategory} from "../../redux/CategorySlice";
import {searchManufacture} from "../../redux/manufactureSlice";

const ProductRouting = (props) => {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    return (
        <Switch>
            <Route
                path={`/${resourceName}/create`}
                render={() => {
                    dispatch(searchCategory());
                    dispatch(searchManufacture());
                    return <ProductDetail action="CREATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id/update`}
                render={() => {
                    dispatch(searchCategory());
                    dispatch(searchManufacture());
                    return <ProductDetail action="UPDATE"/>
                }}
                exact
            />
            <Route
                path={`/${resourceName}/:id`}
                render={() => {
                    dispatch(searchCategory());
                    dispatch(searchManufacture());
                    return <ProductDetail action="VIEW"/>;
                }}
                exact
            />
            <Route path="/" render={(props) => {
                dispatch(searchManufacture());
                dispatch(searchProduct());
                dispatch(searchCategory());
                dispatch(searchCategory());
                return <ProductList/>
            }}/>
        </Switch>
    );
};

export default ProductRouting;
