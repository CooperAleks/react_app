import React, { Component } from 'react'

class HasPhone extends Component {
    getHasPhoneHeaders() {
        const hasPhoneKeys = Object.keys(this.props.users[this.props.indexParent].kids.has_relatives.records[this.props.indexKids].kids.has_phone.records[0].data);
        const hasPhoneHeadersList = [];

        hasPhoneKeys.map((header, j) => {
            hasPhoneHeadersList.push(<th className='hasphone-header-item' key={'header' + j}>{header}</th>);
            // <div className='kids-header-item fake-box'></div>
        })

        return (
            <thead className='hasphone-table-header'>
                <tr>
                    {hasPhoneHeadersList}
                    <th className='header-item fake-box'></th>
                </tr>
            </thead>
        )
    }

    renderHasPhone() {
        const phoneData = [];
        const phoneInfo =  this.props.users[this.props.indexParent].kids.has_relatives.records[this.props.indexKids].kids.has_phone.records;
        phoneInfo.map((phoneItem, z) => {
            phoneData.push(phoneItem);
        })

        const hasPhoneItem = phoneData.map((data, j) => {
            return (
                <tbody key={'hasphone' + j} className='hasphone-table-body'>
                    <tr key={'phoneBox' + j} className='phones-table-info'>
                        {
                            Object.values(data.data).map((item, l) => {
                                return (
                                    <td key={'phoneItem' + l} className='item'>{item}</td>
                                )
                            })
                        }
                        <td key={'deleteBtn'+j} 
                            className='item delete-item'
                            onClick={(evt) => (this.props.handleDeleteClick(this.props.indexParent, this.props.indexKids, j, evt))}>
                            <span className='delete-btn'></span>
                        </td>
                    </tr>
                </tbody>
            )
        })

        return hasPhoneItem
    }

    render() {
        if (this.props.relatives.has_phone && 
            this.props.itemOpened.indexOf(this.props.indexKids) != -1 &&
            this.props.users[this.props.indexParent].kids.has_relatives.records[this.props.indexKids].kids.has_phone.records.length > 0) {
            return (
                <tr>
                    <td colSpan='12'>
                        <table className='hasphone-table active'>
                            <caption>{Object.keys(this.props.users[0].kids.has_relatives.records[0].kids)}</caption>
                            {this.getHasPhoneHeaders()}
                            {this.renderHasPhone()}
                        </table>
                    </td>
                </tr>
            )
        } else {
            return null
        }
    }
}

export default HasPhone