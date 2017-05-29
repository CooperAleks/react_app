import React, { Component } from 'react'
import HasPhone from '../components/has-phone'

class HasRelatives extends Component {

    getRelativesHeaders() {
        const relativesKeys = Object.keys(this.props.users[this.props.indexClick].kids.has_relatives.records[0].data);
        const relativesHeadersList = [];

        relativesKeys.map((header, j) => {
            relativesHeadersList.push(<th className='relatives-header-item' key={'header' + j}>{header}</th>);
        })

        return (
            <thead className='relatives-table-header'>
                <tr>
                    <th className='header-item fake-box'></th>
                    {relativesHeadersList}
                    <th className='header-item fake-box'></th>
                </tr>
            </thead>
        )
    }

    renderRelatives() {
        const relativesInfo = [];
        this.props.users.length && this.props.users[this.props.indexClick].kids.has_relatives.records.map((item, i) => {
            relativesInfo.push(item);
        })
        const relativesItem = relativesInfo.map((relItem, k) => {
            return (
                <tbody className='relatives-table-body' key={'relBox' + k}>
                    <tr key={'relative' + k} className='relatives-info' onClick={(evt) => (this.props.handleKidsClick(relItem, this.props.indexClick, k, evt), this.props.handleClickUI(evt))}>
                        <td key={'relItem' + k} className='item arrow-item'><span className='arrow'></span></td>
                        {
                            Object.values(relItem.data).map((item, z) => {
                                return (
                                    <td key={'relItem' + z} className='item'>{item}</td>
                                )
                            })
                        }
                        <td key={'deleteBtn'+k} 
                            className='item delete-item'
                            onClick={(evt) => this.props.handleDeleteClick(this.props.indexParent, k, -1, evt)}>
                        <span className='delete-btn'></span></td>
                    </tr>
                    {
                        this.props.itemParents.indexOf(this.props.indexParent) != -1 && 
                        this.props.indexParent == this.props.indexClick  && 
                        k == this.props.indexKids && 
                        <HasPhone 
                            users={this.props.users} 
                            relatives={this.props.memberRel} 
                            itemParents={this.props.itemParents} 
                            itemOpened={this.props.itemOpened} 
                            indexKids={this.props.indexKids} 
                            indexParent={this.props.indexParent} 
                            handleDeleteClick={this.props.handleDeleteClick.bind(this)}
                        />
                    }
                </tbody>
            )
        })

        return relativesItem
    }

    render() {
        if (this.props.users[this.props.indexClick].kids.has_relatives && this.props.users[this.props.indexClick].kids.has_relatives.records.length > 0) {
            return (
                <tr className='relatives-row active'>
                    <td colSpan='12'>
                        <table className='relatives-table'>
                            <caption>{Object.keys(this.props.users[0].kids)}</caption>
                            {this.getRelativesHeaders()}
                            {this.renderRelatives()}
                        </table>
                    </td>
                </tr>
            )
        } else {
            return null
        }
    }
}

export default HasRelatives