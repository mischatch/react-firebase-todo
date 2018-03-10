import React from 'react';
import './Note.css';

class Note extends React.Component {
  constructor(props){
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(id){
    this.props.removeNote(this.props.id);
  }

  render(){
    return(
      <div className="noteLine">
        <span className="delete" onClick={this.handleRemove}>&times;</span>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default Note;
