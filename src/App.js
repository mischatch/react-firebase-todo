import React, { Component } from 'react';
import Note from './note/note';
import NoteForm from './noteForm/noteform';
import { dbConfig } from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props){

    super(props);
    this.state = {
      notes: [],
    };

    this.app = firebase.initializeApp(dbConfig);
    this.db = this.app.database().ref().child('notes');

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentWillMount(){
    const previousNotes = this.state.notes;
    this.db.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        text: snap.val().text,
      });
      this.setState({
        notes: previousNotes,
      });
    });

    this.db.on('child_removed', snap => {
      for (var i = 0; i < previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes,
      });
    });
  }

  addNote(note){
    this.db.push().set({text: note});
  }

  removeNote(id){
    this.db.child(id).remove();
  }


  render() {
    return (
      <div className="App">
        {this.state.notes.map(note =>
          <Note
            text={note.text}
            id={note.id}
            removeNote={this.removeNote}
            key={note.id}
            />

        )}
        <NoteForm addNote={this.addNote}/>
      </div>
    );
  }
}

export default App;
