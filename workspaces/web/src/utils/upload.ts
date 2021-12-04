export function upload(form: FormData) {
  return fetch('/api/images', {
    body: form,
    method: 'POST',
  }).then((res) => (res.ok ? res.json() : Promise.reject()))
}
