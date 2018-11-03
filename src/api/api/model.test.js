import { Api } from '.'

let api

beforeEach(async () => {
  api = await Api.create({ date: 'test', device: 'test', uuid: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = api.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(api.id)
    expect(view.date).toBe(api.date)
    expect(view.device).toBe(api.device)
    expect(view.uuid).toBe(api.uuid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = api.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(api.id)
    expect(view.date).toBe(api.date)
    expect(view.device).toBe(api.device)
    expect(view.uuid).toBe(api.uuid)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
