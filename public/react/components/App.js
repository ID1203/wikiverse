import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'

// import and prepend the api url to any fetch calls
import apiURL from '../api'
import { Page } from './Page'
import { PageDetail } from './PageDetail'
import PageForm from './PageFrom'

export const App = () => {
  const [pages, setPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)
  const [isAddingArticle, setIsAddingArticle] = useState(false)

  const fetchPages = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  };

  useEffect(() => {
    fetchPages()
  }, [])

  const handleArticleCreated = async (articleData) => {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });
        const data = await response.json();
        console.log('Article Created:', data);
        fetchPages(); 
        setIsAddingArticle(false); 
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  };

  const handleArticleDelete = async (slug) => {
    try {
      const response = await fetch(`${apiURL}/wiki${slug}`, {
        method: 'DELETE'
      });
        const data = await response.json();
        console.log('Article Deleted:', data);
        fetchPages(); 
        setSelectedPage(null)
    } catch (err) {
      console.log('Oh no an error! ', err);
    }
  };

  const handlePageClick = async (slug) => {
      const response = await fetch(`${apiURL}/wiki/${slug}`)
      const pageData = await response.json()
      setSelectedPage(pageData) 
  }

  const handleBackToList = () => {
    setSelectedPage(null) 
  }

  const handleAddingArticle = () => {
    setIsAddingArticle(!isAddingArticle)
  }


  return (
    <>
		<main>
    <h1>WikiVerse</h1>
    <h2>An interesting 📚</h2>
    {selectedPage ? (
      <PageDetail page={selectedPage} onBackClick={handleBackToList} />
    ) : (
      !isAddingArticle && (
        <PagesList pages={pages} onPageClick={handlePageClick} />
      )
    )}
    {isAddingArticle && <PageForm handleArticleCreated={handleArticleCreated} /> }

    {!isAddingArticle ? (
      <button onClick={handleAddingArticle}> Add Article</button>
    ) :(
      <button onClick={handleAddingArticle}>Return</button>
    )}
  </main>
  
  
    </>
  )
}
