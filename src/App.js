import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.scss';

//List of countries found by Googling "javascript list of countries"
const COUNTRY_LIST = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

class App extends Component {
  state = {
    //Store the form data by the HTML "name" of the input
    form: {
      //Text input example: <input type="text" name="firstName" value={this.state.form.firstName} />
      firstName: '',
      //Text input example: <input type="text" name="lastName" value={this.state.form.lastName} />
      lastName: '',
      //Radio button example: <input type="radio" name="gender" value="Male" checked={this.state.form.gender === "Male"} />
      gender: '',
      //Checkbox example: <input type="checkbox" name="favouriteMusic" value="Hip-Hop" checked={this.state.form.favouriteMusic.includes('Hip-Hop')} />
      favouriteMusic: [],
      //React-Select example (one selection): <Select name="countryOfBirth" value={this.state.form.countryOfBirth} onChange={this.selectChanged.bind(this, 'countryOfBirth')} simpleValue={true} />
      countryOfBirth: ''
    }
  }

  //Handles text inputs and radio buttons
  inputChanged = (event) => {
    //Get the input name and the new value
    const { name, value } = event.target;
    this.setState({
      //Update the value of the input in the state
      form: { ...this.state.form, [name]: value }
    });
  }

  //Handle checkboxes (keep the checked values in an array)
  checkboxChanged = (event) => {
    const { form } = this.state;
    //Check the checkbox group name and the value we're toggling
    const { name, value } = event.target;
  
    //Find out whether the value is already in the checkbox value array
    const valueIndex = form[name].indexOf(value);
    if(valueIndex > -1) {
      //If value is already in array, remove it
      var newValues = form[name].filter((_, i) => i !== valueIndex);
    } else {
      //If not, add it
      var newValues = [ ...form[name], value ];
    }

    this.setState( { form: { ...form, [name]: newValues } } );
  }

  //Handle React-Select component
  selectChanged = (name, newOption) => {
    this.setState( { form: { ...this.state.form, [name]: newOption } } );
  } 

  //Handle form submit
  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    //Display the current form state
    window.alert(`
      First name: ${form.firstName}
      Last name: ${form.lastName}
      Gender: ${form.gender}
      Favourite Music: ${form.favouriteMusic.join(', ')}
      Country of Birth: ${form.countryOfBirth}
    `);
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <form className="c-form" onSubmit={this.onSubmit}>
          {/* Text Inputs */}
          <span>First name:</span>
          <input type="text" name="firstName" onChange={this.inputChanged} value={form.firstName} />
          <span>Last name:</span>
          <input type="text" name="lastName" onChange={this.inputChanged} value={form.lastName} />

          {/* Radio Buttons */}
          <span>Gender:</span>
          <label><input type="radio" name="gender" value="Male" onChange={this.inputChanged} checked={form.gender === "Male"} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={this.inputChanged} checked={form.gender === "Female"} /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={this.inputChanged} checked={form.gender === "Other"} /> Other</label>

          {/* Checkbox Selection */}
          <span>Favourite Music:</span>
          <label><input type="checkbox" name="favouriteMusic" value="Hip-Hop" onChange={this.checkboxChanged} checked={form.favouriteMusic.includes("Hip-Hop")} /> Hip-Hop</label>
          <label><input type="checkbox" name="favouriteMusic" value="Rock &amp; Roll" onChange={this.checkboxChanged} checked={form.favouriteMusic.includes("Rock & Roll")} /> Rock &amp; Roll</label>
          <label><input type="checkbox" name="favouriteMusic" value="Metal" onChange={this.checkboxChanged} checked={form.favouriteMusic.includes("Metal")} /> Metal</label>
          <label><input type="checkbox" name="favouriteMusic" value="Country" onChange={this.checkboxChanged} checked={form.favouriteMusic.includes("Country")} /> Country</label>

          {/* React-Select Component */}
          <span>Country of Birth:</span>
          <Select 
            name="countryOfBirth"
            value={form.countryOfBirth}
            onChange={this.selectChanged.bind(this, 'countryOfBirth')}
            options={COUNTRY_LIST.map(country => { return { value: country, label: country } } )}
            simpleValue={true}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
