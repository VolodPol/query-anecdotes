import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request.js'
import { useContext } from 'react'
import { updateNotification } from '../util/notificationUtil.js'
import NotificationContext from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatchNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (created) => {
      const anecdotes = await queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(created))
    },
    onError: error => updateNotification(error.message, dispatchNotification)
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target['anecdote'].value
    event.target['anecdote'].value = ''
    newAnecdoteMutation.mutate({ content, likes: 0 })
    updateNotification(`anecdote ${content} created`, dispatchNotification)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
