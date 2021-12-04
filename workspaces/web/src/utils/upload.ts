export function upload(form: FormData) {
  return fetch('/api/images', {
    body: form,
    method: 'POST',
  }).then(async (res) => {
    const response = await res.json()
    if (res.ok) return response
    throw new Error(response.message)
  })
}
