import React, { Component } from 'react'

class Hasphone extends Component {
    renderHasPhone(that, index) {
        console.log(this.props.hasPhone)
        const phoneInfo = [];
        this.props.hasPhone.kids.has_phone.records.map((item, i) => {
            phoneInfo.push(item);
        })

        const hasPhoneItem = phoneInfo.map((phoneItem, k) => {
            return (
                <div key={'phone' + k} className='phone-info'>
                    {
                        Object.values(phoneItem.data).map((item, z) => {
                            return (
                                <div key={'relItem' + z} className='item'>{item}</div>
                            )
                        })
                    }
                </div>
            )
        })

        return hasPhoneItem
    }

    render() {
        return (
            <div className='hasphone-table active'>
                <div className='hasphone-table-body'>
                    {this.renderHasPhone()}
                </div>
            </div>
        )
    }
}

export default Hasphone