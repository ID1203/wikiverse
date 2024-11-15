import React from 'react';

export const PageDetail = ({ page, onBackClick }) => {
  return (
    <div>
      <h2>{page.title}</h2>
      <p><strong>Author:</strong> {page.author.name}</p>
      <p><strong>Published:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
      <p> {page.content}</p>
      <p><strong>Tags:</strong> {page.tags.length > 0 ? page.tags.map(tag => tag.name).join(", ") : "No tags"}</p>
      <button onClick={onBackClick}>Back to Wiki List</button>
    </div>
  );
};