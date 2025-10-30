import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request.js'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (created) => {
      const anecdotes = await queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(created))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target['anecdote'].value
    event.target['anecdote'].value = ''
    newAnecdoteMutation.mutate({ content, likes: 0 })
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
