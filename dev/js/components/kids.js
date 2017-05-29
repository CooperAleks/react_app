import React, { Component } from 'react'

class Kids extends Component {

    renderKids() {
    	const kids = this.props.kids
    	if (kids.has_relatives === undefined) {
    		const records = ''
    	} else {
    		const rows = kids.has_relatives.records
	    	const records = rows.map((kid, i) => {
	            return (
	                <tr key={i} className='relative-row'>
	                    <td>{kid.data.Name}</td>
	                </tr>
	            )
	        })
    	}

        return records
    }

    render() {
        return (
            <table className='kid'>
            	{this.renderKids()}
            </table>
        )
    }
}

export default Kids