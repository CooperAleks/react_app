import React, { Component } from 'react'
import HasRelatives from '../components/has-relatives'

class MemberRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kids: [],
            indexClick: '',
            indexParent: '',
            itemParents: [],
            itemOpened: []
        }
    }

    getHeaders() {
        // render table headers from 0 index in users
        const keys = Object.keys(this.props.users[0].data);
        const headersList = [];

        keys.map((header, j) => {
            headersList.push(<th className='header-item' key={'header' + j}>{header}</th>);
        })

        return (
            <thead className='table-header'>
                <tr>
                    <th className='header-item fake-box'></th>
                    {headersList}
                    <th className='header-item fake-box'></th>
                </tr>
            </thead>
        )
    }

    handleKidsClick(that, count, index, evt) {
        // func to handle child elements click 
        // set kids from inner json object as state to pass forward + get all indexes + concat for UI behavior validation
        if (this.state.itemParents.indexOf(this.props.indexParent) == -1) {
            this.setState(
                {   
                    kids: this.props.users[count].kids.has_relatives.records[index].kids,
                    indexKids: index,
                    indexParent: count,
                    itemParents: this.state.itemParents.concat([count]),
                    itemOpened: this.state.itemOpened.concat([index])
                }
            )
        }
    }

	renderParents() {
        const itemsArray = [];
		const rows = this.props.users.map((member, k) => {
            itemsArray.push(Object.values(member.data));
        })
        const infoBox = itemsArray.map((eachItem, x) => {
            const itemBox = eachItem.map((item, k) => {
                return (<td key={'item' + k} className='item'>{item}</td>)
            })

            for (let i = 0; i < eachItem.length; i++) {
                return (
                    <tbody key={'members' + x} className='table-members-body'>
                        <tr key={'member' + x} className='info-box' onClick={(evt) => (this.props.handleOnClick(this.props.users[x], evt, x), this.props.handleClickUI(evt))}>
                            {
                                this.props.users.map((dataItem, j) => {
                                    if (dataItem.kids.has_relatives && x == j) {
                                        return (<td key={'item' + j} className='item arrow-item'><span className='arrow'></span></td>)
                                    } else if (!dataItem.kids.has_relatives && x == j) {
                                        return (<td key={'item' + j} className='item no-rel'></td>)
                                    }
                                })
                            }
                            {itemBox}
                            <td key={'deleteBtn'+x} 
                                className='item delete-item'
                                onClick={(evt) => (this.props.handleDeleteClick(x, -1, -1, evt))}>
                                <span className='delete-btn'></span>
                            </td>
                        </tr>
                        {
                            this.props.itemActive.indexOf(x) != -1 && 
                            <HasRelatives 
                                users={this.props.users}
                                memberRel={this.state.kids}
                                indexKids={this.state.indexKids}
                                indexClick={x}
                                indexParent={this.props.indexTop}
                                itemParents={this.state.itemParents}
                                itemOpened={this.state.itemOpened}
                                handleKidsClick={this.handleKidsClick.bind(this)} 
                                handleClickUI={this.props.handleClickUI.bind(this)}
                                handleDeleteClick={this.props.handleDeleteClick.bind(this)}
                            />
                        }
                    </tbody>
                )
            }
        })

        return infoBox
	}

    render() {
        return (
            <table className='table-members'>
                {this.getHeaders()}
                {this.renderParents()}
           </table>
        )
    }
}

export default MemberRow