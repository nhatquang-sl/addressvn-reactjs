import React from 'react';
import { connect } from "react-redux";
import $ from 'jquery';

import './loading.scss';

function mapStateToProps(store) {
    return {
        loading: store.loading
    };
}

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.loading.isShow) {
            $("#loading-container").modal('show');
        } else {
            $("#loading-container").modal('hide');
        }
    }

    render() {
        return <div className="modal" role="dialog" id="loading-container">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                    </div>
                </div>
            </div>
        </div>
    }
}

export default connect(mapStateToProps)(Loading);