import React, { Component } from 'react'
import { connect } from 'react-redux'
import MemberRow from '../components/member-row'

class UserList extends Component {
    // validate props
    static propTypes = {
        users: React.PropTypes.array.isRequired,
        itemActive: React.PropTypes.array,
        handleDeleteClick: React.PropTypes.func,
        handleClickUI: React.PropTypes.func,
        handleOnClick: React.PropTypes.func,
        handleKidsClick: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            indexTop: '',
            itemActive: []
        }
    }

    handleClickUI(evt) {
        // UI behavior for click
        let parentNode = evt.currentTarget.parentNode;
        if (document.getElementsByClassName('relatives-table-body active').length > 0) {
            const thatActive = document.getElementsByClassName('relatives-table-body active');
            const thatActiveChild = document.getElementsByClassName('relatives-info open');

            thatActive[0].classList.remove('active');
            for (let i=0; i < thatActiveChild.length; i++) {
                thatActiveChild[i].classList.remove('open');
            }
        }

        if (evt.currentTarget.nextSibling) {
            let childNode = evt.currentTarget.nextSibling;

            if (parentNode.classList.contains('active') && childNode.length != -1) {
                childNode.classList.remove('active');
            } else {
                childNode.classList.add('active');
            }
        }

        // top level list UI
        if (parentNode.classList.contains('active')) {
            parentNode.classList.remove('active');
            evt.currentTarget.classList.remove('open');
        } else {
            parentNode.classList.add('active');
            evt.currentTarget.classList.add('open');
        }
    }

    handleDeleteClick(indexMember, indexRelative, indexHasPhone, evt) {
        console.log(indexMember, indexRelative, indexHasPhone)
        // delete items by splicing
        evt.stopPropagation();
        let users = this.state.users;
        let getDeleteItem;

        if (indexMember != -1 && indexRelative != -1 && indexHasPhone != -1 ) {
            getDeleteItem = users[indexMember].kids.has_relatives.records[indexRelative].kids.has_phone.records;
            getDeleteItem.splice(indexHasPhone, 1);
            console.log('3rd lvl')
        } else if (indexMember != -1 && indexRelative != -1 && indexHasPhone == -1 ) {
            getDeleteItem = users[indexMember].kids.has_relatives.records;
            getDeleteItem.splice(indexRelative, 1);
            console.log('2nd lvl')
        } else if (indexMember != -1 && indexRelative == -1 && indexHasPhone == -1 && users.length > 1) {
            users.splice(indexMember, 1);
            console.log(indexMember)
            console.log('1st lvl')
        } else if (users.length == 1) {
            alert('You can\'t delete last entry')
        }
        // set updated users array after item deleted
        this.setState(
            {
                users: users
            }
        );
    }

    handleOnClick(user, evt, index) {
        if (this.state.itemActive.indexOf(index) == -1) {
            // state top level click index + concat into array to validate for UI
            this.setState(
                {
                    indexTop: index,
                    itemActive: this.state.itemActive.concat([index])
                }
            )
            console.log(index)
        }
    }

    render() {
        return (
            <MemberRow
                users={this.state.users}
                itemActive={this.state.itemActive}
                indexTop={this.state.indexTop}
                handleClickUI={this.handleClickUI.bind(this)}
                handleOnClick={this.handleOnClick.bind(this)}
                handleDeleteClick={this.handleDeleteClick.bind(this)}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserList)