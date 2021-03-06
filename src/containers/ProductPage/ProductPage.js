import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isProductsLoaded, load as loadProducts } from 'redux/modules/products';
import { Header, ProductDetails } from 'components';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => { // eslint-disable-line react/prop-types
    const promises = [];
    if (!isProductsLoaded(getState())) {
      promises.push(dispatch(loadProducts()));
    }
    return Promise.all(promises);
  }
}])
@connect(state => ({ products: state.products.products }))
export default class ProductPage extends Component {
  static propTypes = {
    products: PropTypes.array,
    params: PropTypes.object
  };

  render() {
    const { params, products } = this.props;
    const productId = parseInt(params.productId, 10);
    const product = products.find(product => product.id === productId);

    return (
      <div>
        <Helmet title={product.name} />
        <Header title={product.name} subtitle={product.display_discount_price || product.display_price} />
        <ProductDetails product={product} />
      </div>
    );
  }
}
