// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getStaffs, getRoles} from '../../../../state/actions/shop';

// COMPONENTS
import Staff from './components/Staff';
import AddStaff from './components/Staff/components/AddStaff';
import EditStaff from './components/Staff/components/EditStaff';
import DeleteStaff from './components/Staff/components/DeleteStaff';

// ==========

class Staffs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      modalClasses: 'modal',
      action: '',
      staff: null
    };
  };

  toggle = (event, staff = null) => { 
    if (!this.state.modal) {
      this.setState({
        modal: true,
        modalClasses: this.state.modalClasses + ' is-active',
        action: event.target.id,
        staff
      });
    } else {
      this.setState({
        modal: false,
        modalClasses: 'modal',
        action: '',
        staff: null
      });
    }
  };

  componentDidMount () {
    this.props.getStaffs();
    this.props.getRoles();
  };

  render () {
    return (
      <div>
        <div className="card">
          <div className="card-content">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title">Staff</h1>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <span className="button is-primary is-outlined" id="add-staff" onClick={this.toggle}>Add</span>
                </div>
              </div>
            </div>
            <hr />
            <div id="staff">
              <div className="columns">
                {
                  this.props.staffs.map((staff, i) => {
                    return (
                      <Staff key={i} staff={staff} roles={this.props.roles} toggle={this.toggle} />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.modalClasses}>
          <div className="modal-background" onClick={this.toggle}></div>
          <div className="modal-content modal-form">
            <div className="modal-container">
              {
                (() => {
                  switch (this.state.action) {
                    case 'add-staff':
                      return <AddStaff toggle={this.toggle} />;
                    case 'edit-staff':
                      return <EditStaff toggle={this.toggle} staff={this.state.staff} />;
                    case 'delete-staff':
                      return <DeleteStaff toggle={this.toggle} staff={this.state.staff} />;
                    default:
                      break;
                  }
                })()
              }
            </div>
          </div>
          <button className="modal-close is-large" onClick={this.toggle}></button>
        </div>
      </div>    
    );
  };
};

const mapStateToProps = state => ({
  staffs: state.shop.staffs,
  editStaffError: state.shop.editStaffError,
  roles: state.shop.roles
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getStaffs,
  getRoles
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Staffs);