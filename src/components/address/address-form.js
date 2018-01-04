import React from 'react';

export default class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: props.address };
    }

    handleReset(event) {
        if (this.props.onReset) this.props.onReset(event);
    }

    handleChange(event) {
        if (this.props.onChange) this.props.onChange(event);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.onSubmit) this.props.onSubmit(event);
    }

    render() {
        let address = this.props.address;
        return (
            <form className="form-horizontal" noValidate onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group" style={this.props.address.errors.length > 0 ? {} : { display: "none" }}>
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {/* <strong>Warning!</strong> */}
                            <ul>
                                {this.props.address.errors.map((error) => {
                                    return (
                                        <li key={error}>{error}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={this.props.address.id ? {} : { display: "none" }}>
                    <label className="control-label col-sm-2 col-sm-offset-2">Id</label>
                    <div className="col-sm-6">
                        <span className="form-control">{this.props.address.id}</span>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2 col-sm-offset-2">Country</label>
                    <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="country"
                            value={this.props.address.country.value}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                </div>
                <div className={`form-group ${!address.city.isValid && address.city.isTouch ? " has-error" : ""}`}>
                    <label className="control-label col-sm-2 col-sm-offset-2">City</label>
                    <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="city"
                            value={this.props.address.city.value}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                </div>
                <div className={`form-group ${!address.district.isValid && address.district.isTouch ? " has-error" : ""}`}>
                    <label className="control-label col-sm-2 col-sm-offset-2">District</label>
                    <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="district"
                            value={this.props.address.district.value}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                </div>
                <div className={`form-group ${!address.ward.isValid && address.ward.isTouch ? " has-error" : ""}`}>
                    <label className="control-label col-sm-2 col-sm-offset-2">Ward</label>
                    <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="ward"
                            value={this.props.address.ward.value}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                </div>
                <div className={`form-group required ${!address.street_name.isValid && address.street_name.isTouch ? " has-error" : ""}`}>
                    <label className="control-label col-sm-2 col-sm-offset-2">Street Name</label>
                    <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" title="Street Name" name="street_name" required
                            value={address.street_name.value}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-4">
                        <button type="button" className="btn btn-default" onClick={() => {
                            if (this.props.onPickLocation) this.props.onPickLocation();
                        }}>
                            <span className="glyphicon glyphicon-record"></span>
                        </button>
                        <button type="button" className="btn btn-link pull-right" onClick={this.handleReset.bind(this)}>Reset</button>
                        <span className="pull-right">	&nbsp;	&nbsp;</span>
                        <button type="submit" className="btn btn-default pull-right">{this.props.address.id ? "Update" : "Submit"}</button>

                    </div>
                </div>
            </form>
        )
    }
}
