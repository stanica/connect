import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Api } from '.'

const app = () => express(apiRoot, routes)

let api

beforeEach(async () => {
  api = await Api.create({})
})

test('POST /api 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ date: 'test', device: 'test', uuid: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.device).toEqual('test')
  expect(body.uuid).toEqual('test')
})

test('GET /api 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /api/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${api.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(api.id)
})

test('GET /api/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /api/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${api.id}`)
    .send({ date: 'test', device: 'test', uuid: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(api.id)
  expect(body.date).toEqual('test')
  expect(body.device).toEqual('test')
  expect(body.uuid).toEqual('test')
})

test('PUT /api/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ date: 'test', device: 'test', uuid: 'test' })
  expect(status).toBe(404)
})

test('DELETE /api/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${api.id}`)
  expect(status).toBe(204)
})

test('DELETE /api/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
