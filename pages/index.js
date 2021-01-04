import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState, useEffect} from "react"

import Books from '../public/books.json'
import Book from './src/Book'


export default function Home() {
  const bookMaker = p => <Book title={p.title} author={p.author} genre={p.genre}></Book>
  const [genreChoice, setGenreChoice] = useState("")
  const [authorChoice, setAuthorChoice] = useState("");
  const [titleChoice, setTitleChoice] = useState("I am Malala");
  const [randNum, setRandNum] = useState(0);
  const [page, setPage] = useState(0);

  const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

  //const genreFilter = (x => x.genre == genreChoice);
  const authorFilter = (x => x.author == authorChoice);
  const searchTitle = (x => x.title == titleChoice);
  const randBookFilter = (x => x.random_id == randNum);

  const genreFilter = (x) => {
    for(let i = 0; i < x.genre.length; i++){
      if(x.genre[i] == genreChoice){
        return true;
      }
    }
  }
  

  const byGenre = Books.filter(genreFilter);
  const byAuthor = Books.filter(authorFilter);
  const byTitle = Books.filter(searchTitle);
  const randBooks = Books.filter(randBookFilter);

  const bookDisplay = byTitle.map(bookMaker);
  
  
  console.log(byTitle.map(bookMaker))
  console.log(randBooks.map(bookMaker))
  console.log(page)
  console.log(randNum)
  

  const onSubmit = (event) => {
    event.preventDefault();
  }
  
  return(
    <div className="bg-purple-200 h-screen">
      <h1 className="text-center text-6xl pt-8">Search Alyssa's bookshelf!</h1>
      <h2 className="text-2xl text-center font-bold m-10">Sort by:</h2>
      <div className="grid grid-cols-3">
        <button className="bg-indigo-500 mx-5 hover:bg-indigo-700 text-white font-bold p-2 rounded"
          onClick={()=>setPage(1)}>
          Genre
          </button>
        <button className="bg-indigo-500 mx-5 hover:bg-indigo-700 text-white font-bold p-2 rounded" 
          onClick={()=>setPage(2)}>
          Author
          </button>
        <button className="bg-indigo-500 mx-5 hover:bg-indigo-700 text-white font-bold p-2 rounded" 
          onClick={()=>setPage(3)}>
          Title
          </button>
      </div>

      <div className="text-center">
        <h1 className="mt-10 text-2xl font-bold">Or try the:</h1>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold p-2 rounded mt-6"
          onClick={()=> {
                  setPage(4); 
                  setRandNum(randint(1,25))
                }}>
                  Random Book Generator!</button>
      </div>
       
      {page == 1 ? 
       <div>
       <label className="text-xl font-bold px-5" htmlFor="genre">Genre: </label>
       <input 
       id="genre" 
       value={genreChoice} 
       placeholder="Example: Fiction"
       className = "mt-10 mb-10 rounded"
       onChange={(event) => setGenreChoice(event.target.value)}></input>
       <div>{byGenre.map(bookMaker)}</div></div>
      :
      page == 2 ?
      <div>
      <label className="text-xl font-bold px-5" htmlFor="author">Author: </label>
      <input 
      id="author" 
      value={authorChoice}
      placeholder="Example: J. K. Rowling"
      className = "mt-10 mb-10 rounded" 
      onChange={(event) => setAuthorChoice(event.target.value)}></input>
      <div>{byAuthor.map(bookMaker)}</div></div>
      :
      page == 3 ?
      <div>
      <label className="text-xl font-bold px-5" htmlFor="title">Title: </label>
      <input 
      id="title" 
      value={titleChoice}
      placeholder="Example: Black Beauty"
      className = "mt-10 mb-10 rounded" 
      onChange={(event) => setTitleChoice(event.target.value)}></input>
      <div>{byTitle.map(bookMaker)}</div></div>
      :
      page == 4 ?
      <div className="text-center text-3xl mt-10">You should try: {randBooks.map(bookMaker)}</div>
      :
      <div></div>
    }
    </div>


  )



  }
