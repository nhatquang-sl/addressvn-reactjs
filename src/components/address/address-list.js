import React from 'react';
import { CSVLink } from 'react-csv';

export default class AddressList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEdit(address, event) {
        if (document.body.scrollTop != 0)
            document.body.scrollTop = 0; // For Safari

        if (document.documentElement.scrollTop != 0)
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        if (this.props.onEdit) this.props.onEdit(address, event);
    }

    render() {
        return (
            <div>
                <CSVLink data={this.props.addresses} separator={";"}>
                    Export a CSV
                </CSVLink>
                <table className="table table-striped table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Street Name</th>
                            <th>Ward</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.addresses.map((address) => {
                            return (
                                <tr key={address.id}>
                                    <td>{address.street_name}</td>
                                    <td>{address.ward}</td>
                                    <td>{address.district}</td>
                                    <td>{address.city}</td>
                                    <td>{address.country}</td>
                                    <td>
                                        <button type="button" className="btn btn-link btn-sm"
                                            onClick={this.handleEdit.bind(this, address)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
