// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUser} from '../../../../../../../../state/actions/auth';
import {editStaff, editStaffReset} from '../../../../../../../../state/actions/staff';

// ==========

class EditStaff extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      first_name: this.props.staff.first_name,
      last_name: this.props.staff.last_name,
      role_id: this.props.staff.role_id,
      email: this.props.staff.email,
      new_password: '',
      verify_password: '',
      photo: this.props.staff.photo,
      passwordError: false,
      passwordClasses: 'input'
    };
  };

  editStaff = async event => {
    event.preventDefault();
    const {first_name, last_name, role_id, email, new_password, verify_password, photo} = this.state;
    if (new_password !== verify_password) {
      this.setState({
        passwordClasses: this.state.passwordClasses + ' is-danger',
        passwordError: true
      });
    } else {
      await this.setState({
        passwordClasses: 'input',
        passwordError: false
      });
      const staff = {first_name, last_name, role_id, email, new_password, photo};
      await this.props.editStaff(staff, this.props.staff.id);
      if (!this.props.editStaffError) {
        if (this.props.staff.id === this.props.user.id) await this.props.getUser();
        this.props.toggle();
      }
    }
  };

  componentDidMount () {
    this.props.editStaffReset();
  };

  render () {
    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <form className="has-text-centered" onSubmit={this.editStaff}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="First Name *"
                      value={this.state.first_name}
                      onChange={event => this.setState({first_name: event.target.value})}
                      required
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Last Name *"
                      value={this.state.last_name}
                      onChange={event => this.setState({last_name: event.target.value})}
                      required
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    value={this.state.role_id}
                    onChange={event => this.setState({role_id: event.target.value})}
                    required
                  >
                    <option value="" disabled>Role *</option>
                    {
                      this.props.roles.map((role, i) => {
                        return (
                          <option key={i} value={role.id}>{role.name}</option>
                        );
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email *"
                  value={this.state.email}
                  onChange={event => this.setState({email: event.target.value})}
                  required
                />
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control">
                    <input
                      className={this.state.passwordClasses}
                      type="password"
                      placeholder="New Password"
                      value={this.state.new_password}
                      onChange={event => this.setState({new_password: event.target.value})}
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className={this.state.passwordClasses}
                      type="password"
                      placeholder="Verify Password"
                      value={this.state.verify_password}
                      onChange={event => this.setState({verify_password: event.target.value})}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Photo"
                  value={this.state.photo}
                  onChange={event => this.setState({photo: event.target.value})}
                />
              </p>
            </div>
            {
              this.props.editStaffError ? (
                <p className="help is-danger">
                  Staff edit failed.
                </p>
              ) : null
            }
            {
              this.state.passwordError ? (
                <p className="help is-danger">
                  Passwords do not match.
                </p>
              ) : null
            }
            <div className="buttons">
              <span className="button" onClick={this.props.toggle}>Cancel</span>
              <button className="button is-success">Edit</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  user: state.auth.user,
  staffs: state.staff.staffs,
  editStaffError: state.staff.editStaffError
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
  editStaff,
  editStaffReset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditStaff);