import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls createBlog with right attributes when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const titleInput = container.querySelector('#blogform-title')
  const authorInput = container.querySelector('#blogform-author')
  const urlInput = container.querySelector('#blogform-url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'title 123')
  await user.type(authorInput, 'author 123')
  await user.type(urlInput, 'url.123')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title 123')
  expect(createBlog.mock.calls[0][0].author).toBe('author 123')
  expect(createBlog.mock.calls[0][0].url).toBe('url.123')
})