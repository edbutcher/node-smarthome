import React, { PureComponent } from 'react';
import GroupForm from '../components/GroupForm';
import { addGroup, getDevices } from '../api';

export default class GroupAdd extends PureComponent {
    state = {
        allDevices: [],
    };

    componentDidMount = async () => {
        this.setState({
            allDevices: await getDevices(),
        });
    };

    handleFormSubmit = async (group) => {
        await addGroup(group);
        window.history.back();
    };


    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                                <li className="breadcrumb-item"><a href="#/groups">Groups</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Add device</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <GroupForm onSubmit={this.handleFormSubmit} allDevices={this.state.allDevices} />
                    </div>
                </div>
            </div>
        );
    }
}