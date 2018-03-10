import React from 'react';
import './NoteForm.css'

class NoteForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {newNoteText: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      newNoteText: e.target.value,
    });
  }

  handleSubmit(){

    this.props.addNote(this.state.newNoteText);
    this.setState({
      newNoteText: '',
    });
  }

  render(){
    return(
      <div className="form">
        <input
          className="input"
          onChange={this.handleChange}
          value={this.state.newNoteText}
          />
        <button
          className="createBTN"
          onClick={this.handleSubmit}
          >Add new note</button>
      </div>
    )
  }
}

export default NoteForm;
