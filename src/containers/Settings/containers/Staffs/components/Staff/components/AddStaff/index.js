// REACT
import React from 'react';

// REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addStaff, addStaffReset} from '../../../../../../../../state/actions/staff';

// ==========

class AddStaff extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      role_id: '',
      email: '',
      password: '',
      verify_password: '',
      photo: '',
      passwordError: false,
      passwordClasses: 'input'
    };
  };

  addStaff = async event => {
    event.preventDefault();
    const {first_name, last_name, role_id, email, password, verify_password, photo} = this.state;
    if (password !== verify_password) {
      this.setState({
        passwordClasses: this.state.passwordClasses + ' is-danger',
        passwordError: true
      });
    } else {
      await this.setState({
        passwordClasses: 'input',
        passwordError: false
      });
      const staff = {first_name, last_name, role_id, email, password, photo};
      await this.props.addStaff(staff);
      if (!this.props.addStaffError) this.props.toggle();
    }
  };

  componentDidMount () {
    this.props.addStaffReset();
  };

  render () {
    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <form className="has-text-centered" onSubmit={this.addStaff}>
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
                      placeholder="Password *"
                      value={this.state.password}
                      onChange={event => this.setState({password: event.target.value})}
                      required
                    />
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <input
                      className={this.state.passwordClasses}
                      type="password"
                      placeholder="Verify Password *"
                      value={this.state.verify_password}
                      onChange={event => this.setState({verify_password: event.target.value})}
                      required
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
              this.props.addStaffError ? (
                <p className="help is-danger">
                  Staff creation failed.
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
              <button className="button is-success">Add</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  staffs: state.staff.staffs,
  addStaffError: state.staff.addStaffError
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addStaff,
  addStaffReset
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);