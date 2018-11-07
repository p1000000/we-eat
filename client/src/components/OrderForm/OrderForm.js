import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Title = styled("div")`
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5em;
  margin: 10px 0 !important;
`;

const Form = styled("form")`

`;

const Content = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
`;

const StyledTextField = styled(TextField)`
  margin: 10px 0 !important;
`;

const StyledButton = styled(Button)`
  margin: 15px 0 0 !important;
  height: 50px;
  color: ${({ type }) => type === "submit" ? "#ff5f7e" : "#2196f3"} !important;
`;

class AddOrder extends React.Component {
    state = {
        fields: {
            name: "",
            comment: "",
            rating: 0
        }
    };

    handleChange = (field) => (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [field]: e.target.value
            }
        });
    };


    _onOrder = () => {
        this.props.onOrder(this.state.fields.name);
    };

    _onCancel = () => {
        this.props.onCancel();
    };

    _renderAddOrder = () => (
        <div>
            <Form
                onSubmit={this._onOrder}
            >
                <Content>
                    <Title>
                        {`Write your name for your order from ${this.props.restaurantName}`}
                    </Title>
                    <StyledTextField
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange("name")}
                        required
                    />
                    <StyledButton
                        type="submit"
                    >
                        Order
                    </StyledButton>
                    <StyledButton
                        onClick={this._onCancel}
                    >
                        Cancel
                    </StyledButton>
                </Content>
            </Form>
        </div>
    );

    render() {
        return this._renderAddOrder();
    }
}

AddOrder.propTypes = {
    restaurantName: PropTypes.string,
    onOrder: PropTypes.func,
    onCancel: PropTypes.func
};

AddOrder.defaultProps = {
    restaurantName: "",
    onOrder: () => {},
    onCancel: () => {}
};

export default AddOrder;