import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { groupPropType } from '../constants';

export default function GroupForm (props) {
    const { group, allDevices } = props;
    const { devices, name } = group;
    console.log(group, allDevices);

    const handleCancelClick = () => {
        window.history.back();
    };

    const handleSubmit = (event) => {
        props.onSubmit({
            ...props.group,
            name: event.target.groupName.value,
            devices: ['5d38ab584cfb7e2fb4d86a2b', '5d3d5f60d11a241fd80bfd3e'],
        });

        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="groupName">Group Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="groupName"
                    name="groupName"
                    placeholder="Group Name"
                    required
                    defaultValue={name}
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
                                    checked={devices.includes(device.id)}
                                />
                                <label htmlFor={device.id}>{device.name}</label>
                            </Fragment>
                        ))
                    }
                </div>
            }

            <div className="float-right">
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button type="button" className="btn btn-default" onClick={handleCancelClick}>Cancel</button>
            </div>
        </form>
    );
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