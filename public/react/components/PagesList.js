import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, onPageClick }) => {
  return <div>
  {
	pages.map((page, idx) => {
	  return (
		<div key={idx} onClick={() => onPageClick(page.slug)}>
		  <Page page={page} />
		</div>
	  )
	})
  }
</div>
}
