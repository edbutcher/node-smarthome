import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';

export default class GroupForm extends PureComponent {
    state = {
        devices: []
    };

    componentDidMount() {
        this.setState({
            devices: this.props.group.devices,
        });
    }

    handleCancelClick = () => {
        window.history.back();
    };

    handleSubmit = (event) => {
        this.props.onSubmit({
            ...this.props.group,
            name: event.target.groupName.value,
            devices: this.state.devices,
        });

        event.preventDefault();
    };

    handleChecking = ({ target: { value }}) => {

        this.setState(({ devices }) => {
                if (devices.includes(value)) {
                    return ({devices: devices.filter(device => device !== value)});
                } else {
                    return ({devices: [...devices, value]});
                }
              }
        )
    };

    render() {
        const { group, allDevices } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="groupName"
                        name="groupName"
                        placeholder="Group Name"
                        required
                        defaultValue={group.name}
                    />
                </div>
                
                {
                    allDevices &&
                    <div className="form-group">
                        {
                            allDevices.map( device => (
                                <Fragment key={device.id} >
                                    <input
                                        type="checkbox"
                                        id={device.id}
                                        name={device.name}
                                        value={device.id}
                                        checked={this.state.devices.includes(device.id)}
                                        onChange={this.handleChecking}
                                    />
                                    <label htmlFor={device.id}>{device.name}</label>
                                </Fragment>
                            ))
                        }
                    </div>
                }
    
                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                    <button type="button" className="btn btn-default" onClick={this.handleCancelClick}>Cancel</button>
                </div>
            </form>
        );
    }
}

GroupForm.defaultProps = {
    group: {
        id: '',
        name: '',
        devices: [],
    },
    allDevices: [],
};

GroupForm.propTypes = {
    group: groupPropType,
    onSubmit: PropTypes.func.isRequired
};