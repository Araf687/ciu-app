import React, { Component } from 'react'

export default class Student extends Component {
    render() {
        const {name,id,dept,cgpa}=this.props.dt;
        return (
            <div>
                <p>as</p>
                <p>{name}</p>
                <p>{id}</p>
                <p>{dept}</p>
                <p>{cgpa}</p>
                
            </div>
        )
    }
}
