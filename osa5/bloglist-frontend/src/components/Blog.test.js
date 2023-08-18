import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testuser = {
  username: 'testuser'
}

const blog = {
  title: 'test title',
  author: 'tester',
  url: 'test.com',
  likes: 2,
  user: testuser
}

test('only blog title and author are shown by default', () => {
  //render(<Blog blog={blog} />)

  //const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`)

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')

  //screen.debug() / (element)

  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(screen.queryByText(blog.url)).toBeNull()
  expect(screen.queryByText(blog.likes)).toBeNull()

  //const url = screen.getByText('test.com')
  //const likes = screen.getByText('likes')
  //expect(titleAndAuthor).toBeDefined()
  //expect(url).
})

test('url and likes are shown after view button is pressed', async () => {
  render(<Blog blog={blog} user={testuser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.queryByText(blog.url)).toBeDefined()
  expect(screen.queryByText(blog.likes)).toBeDefined()
  expect(screen.queryByText(blog.user.username)).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} user={testuser} addLikeToBlog={mockHandler}/>)

  const user = userEvent.setup()
  // have to click view-button to get make like-button visible
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})