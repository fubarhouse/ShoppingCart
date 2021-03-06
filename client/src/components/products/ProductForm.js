import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addProduct } from "../../actions/productActions";

class ProductForm extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    image: "",
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // const { user } = this.props.auth;

    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image
    };

    this.props.addProduct(newProduct, this.props.history);

    this.setState({
      name: "",
      price: "",
      description: "",
      image: ""
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="product-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add a product...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="name of product"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextAreaFieldGroup
                  placeholder="Brief description of the product"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="Picture of your product"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                />
              </div>
              <button className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProduct }
)(ProductForm);
