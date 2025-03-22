import React, { useEffect, useState } from 'react'; // 修正: useStateをインポート
import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import uuid from 'react-uuid';

function App() {
  const [notes,setNotes] = useState(
    JSON.parse(localStorage.getItem("notes"))||[]);
  const [activeNote,setActiveNote] = useState(false);

  useEffect(() => {
    // ローカルストレージにノートを保存
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0].id);
    } else {
      setActiveNote(false); // または適切なデフォルト値
    }
  }, [notes]);
  
  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes,newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  }

  const getActiveNote = () =>{
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す。
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id){
        return updatedNote;
      }else{
        return note;
      }
    });

    setNotes(updatedNotesArray);
    };


  return(
  <div className="App">
    <Sidebar
      onAddNote={onAddNote}
      notes={notes}
      onDeleteNote={onDeleteNote}
      setActiveNote={setActiveNote}
      />
    <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
  </div>
  );
}

export default App;
