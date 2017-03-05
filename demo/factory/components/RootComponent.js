import React, { Component } from 'react';

class RootComponent extends Component {
    render() {
        const { children, handleSubmit } = this.props;

        return (
            <div className="meta-form">
                <form onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        );
    }
}

export default RootComponent;