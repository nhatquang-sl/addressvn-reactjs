import React from 'react';
import { connect } from "react-redux";

import AddressForm from '../../components/address/address-form';
import AddressList from '../../components/address/address-list';

import { showLoading, hideLoading } from '../../actions/loading';
import { createAddress, getAddresses, updateAddress, getCurrentAddress } from '../../actions/addressActions';


function mapStateToProps(store) {
    return {
        address: store.address,
        loading: store.loading
    };
}

const adrDefault = {
    street_name: { value: "" },
    ward: { value: "", isValid: true },
    district: { value: "", isValid: true },
    city: { value: "", isValid: true },
    country: { value: "", isValid: true },
    createdDate: Date.now(),
    errors: []
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            address: JSON.parse(JSON.stringify(adrDefault)),
            isInit: true,
            isSubmitting: false,
            isGetCurrentAddress: false
        }
        this.props.dispatch(getAddresses());

    }

    componentDidMount() {
        this.props.dispatch(showLoading());
    }

    componentDidUpdate() {
        if (!this.props.address.pending && this.props.loading.isShow) {
            if (this.state.isInit) {
                this.setState({ isInit: false, addresses: JSON.parse(JSON.stringify(this.props.address.addresses)) });
                this.props.dispatch(hideLoading());
            } else if (this.state.isSubmitting) {
                let addresses = JSON.parse(JSON.stringify(this.state.addresses));
                let address = Object.assign({}, {
                    street_name: this.state.address.street_name.value,
                    ward: this.state.address.ward.value,
                    district: this.state.address.district.value,
                    city: this.state.address.city.value,
                    country: this.state.address.country.value
                });
                this.props.dispatch(hideLoading());
                if (this.state.address.id) {
                    addresses = addresses.map((item) => {
                        if (item.id == this.state.address.id) return Object.assign({}, address, { id: item.id });
                        else return item;
                    });
                } else {
                    addresses.unshift(Object.assign({}, address, { id: this.props.address.addresses[0].id }));
                }
                this.setState({ isSubmitting: false, addresses });
                this.handleReset();
            } else if (this.state.isGetCurrentAddress) {
                let address = JSON.parse(JSON.stringify(adrDefault));
                let adr = this.props.address.address;
                address.street_name.value = adr.street_name;
                address.ward.value = adr.ward;
                address.district.value = adr.district;
                address.city.value = adr.city;
                address.country.value = adr.country;

                this.props.dispatch(hideLoading());
                this.setState({ isGetCurrentAddress: false, address });
            }
        }
    }

    validateForm(address) {
        if (!address.city.value.trim() && (!address.ward.value.trim() || !address.district.value.trim())) {
            if (address.errors.indexOf("You must input City or Ward and District.") < 0)
                address.errors.push("You must input City or Ward and District.");
            address.city.isValid = address.ward.isValid = address.district.isValid = false;
            address.city.isTouch = address.ward.isTouch = address.district.isTouch = true;
        } else {
            let iremove = address.errors.indexOf("You must input City or Ward and District.");
            address.errors.splice(iremove, 1);
            address.city.isValid = address.ward.isValid = address.district.isValid = true;
        }

        if (address.street_name.isTouch && !address.street_name.value.trim()) {
            if (address.errors.indexOf("The Street Name is required.") < 0)
                address.errors.push("The Street Name is required.");
        }
        return address;
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let address = JSON.parse(JSON.stringify(this.state.address));

        if (event.target.required) {
            address[name].isValid = !(!value.trim());
            if (!address[name].isValid) {
                address.errors.push(`The ${event.target.title} is required.`)
            } else {
                const iremove = address.errors.indexOf(`The ${event.target.title} is required.`);
                address.errors.splice(iremove, 1);
            }
        }

        address[name].value = value;
        address[name].isTouch = true;

        if (!address.city.isValid && !address.ward.isValid && !address.district.isValid) {
            address = this.validateForm(address);
        }

        this.setState({ address, isSubmitting: false });
    }

    handleReset() {
        this.setState({ address: JSON.parse(JSON.stringify(adrDefault)) });
    }

    handleSubmit() {
        let state = JSON.parse(JSON.stringify(this.state));
        state.address.street_name.isTouch = true;
        state.address = this.validateForm(state.address);
        this.setState(state);

        if (state.address.errors.length == 0) {
            let address = {
                street_name: this.state.address.street_name.value,
                ward: this.state.address.ward.value,
                district: this.state.address.district.value,
                city: this.state.address.city.value,
                country: this.state.address.country.value,
                createdDate: Date.now()
            }
            if (state.address.id) {
                address.createdDate = state.address.createdDate;
                this.props.dispatch(updateAddress(state.address.id, address));
            }
            else
                this.props.dispatch(createAddress(address));
            // this.handleReset();
            this.setState({ isSubmitting: true });
            this.props.dispatch(showLoading());
        }
    }

    handleEdit(adr) {
        let address = JSON.parse(JSON.stringify(adrDefault));
        address.street_name.value = adr.street_name;
        address.ward.value = adr.ward;
        address.district.value = adr.district;
        address.city.value = adr.city;
        address.country.value = adr.country;
        address.id = adr.id;
        address.createdDate = adr.createdDate;
        this.setState({ address });
    }

    handlePickLocation() {
        this.setState({ isGetCurrentAddress: true });
        this.props.dispatch(showLoading());
        this.props.dispatch(getCurrentAddress());
    }

    render() {
        return (
            <div className="container-fluid">
                <AddressForm address={this.state.address}
                    onPickLocation={this.handlePickLocation.bind(this)}
                    onReset={this.handleReset.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)} />
                <AddressList addresses={this.state.addresses}
                    onEdit={this.handleEdit.bind(this)} />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Home);