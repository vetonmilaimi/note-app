import React, { Fragment, useState } from 'react'

import './App.scss';

const DUMMY_NOTES = [
  {
    id: 1,
    title: "First note",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit odio vel lorem interdum vehicula. Donec non lobortis dolor. Morbi eu libero ullamcorper purus finibus scelerisque. Integer vel interdum urna. Sed risus sapien, porttitor quis mattis sed, cursus ut diam. Praesent sodales tempus vulputate. Vivamus et venenatis sapien, eu bibendum metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
    category: "Work",
    date: new Date('2022-07-01')
  },
  {
    id: 2,
    title: "Second note",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit odio vel lorem interdum vehicula. Donec non lobortis dolor. Morbi eu libero ullamcorper purus finibus scelerisque. Integer vel interdum urna. Sed risus sapien, porttitor quis mattis sed, cursus ut diam. Praesent sodales tempus vulputate. Vivamus et venenatis sapien, eu bibendum metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
    category: "Home",
    date: new Date('2022-05-31')
  },
  {
    id: 3,
    title: "Third note",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit odio vel lorem interdum vehicula. Donec non lobortis dolor. Morbi eu libero ullamcorper purus finibus scelerisque. Integer vel interdum urna. Sed risus sapien, porttitor quis mattis sed, cursus ut diam. Praesent sodales tempus vulputate. Vivamus et venenatis sapien, eu bibendum metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
    category: "Course",
    date: new Date('2022-06-24')
  },
]

function App() {
  const [notes, setNotes] = useState(DUMMY_NOTES);
  const [id, setId] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: (Math.random() * 10) + 3,
      title: title !== '' ? title : "Random title",
      content: content !== '' ? content : "Random content",
      category: category !== '' ? category : "Random category",
      date: new Date()
    }

    setNotes(notes => [...notes, newNote])
    console.log(notes);
  }

  const selectHandler = (event, newId) => {
    setId(newId);
  }

  const changeHandle = (e) => {
    setSearchText(e.target.value);
  }

  const titleHandler = (e) => {
    setTitle(e.target.value);
  }
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  }
  const contentHandler = (e) => {
    setContent(e.target.value);
  }


  return (
    <Fragment>
      <div className="new-task">
        <form>
          <input type="text" id="title" name="title" placeholder="Title" onChange={titleHandler} required /> <br />
          <input type="text" id="category" name="category" placeholder="Category" onChange={categoryHandler} required /> <br />
          <textarea id="content" name="content" placeholder="Content" onChange={contentHandler} required /> <br />
          <button type="submit" className="add-btn" onClick={addNote}>Add</button>
        </form>
      </div>
      <div className="app">
        <div className="left-container">
          <div className="search">
            <input name="search" type="text" id="search" placeholder="Search" onChange={changeHandle} />
          </div>
          <div className="notes-list">
            {
              notes.filter(note => note.category
                .toLowerCase().includes(searchText) ||
                note.title.toLowerCase().includes(searchText))
                .map((note) => {
                  return (
                    <div className="single-note" key={note.id} onClick={event => selectHandler(event, note.id)}>
                      <h2>{note.title}</h2>
                    </div>
                  )
                })
            }
          </div>
        </div>

        <div className="right-container">
          {
            notes.filter((note) => note.id === id).map((note) => {
              const date = note.date.getDate() + '/' + (note.date.getMonth() + 1) + '/' + note.date.getFullYear()
              return (
                <div key={note.id} className="my-note">
                  <h1>{note.title}</h1>
                  <p className="category">{note.category} • {date} </p>
                  <p className="content">{note.content}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;