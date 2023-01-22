export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'numeric' }) + '.' 
  + date.toLocaleDateString('en-US', { day: 'numeric' }) + '.'
  + date.toLocaleDateString('en-US', { year: 'numeric' })
}