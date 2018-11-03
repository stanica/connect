import { success, notFound } from '../../services/response/'
import { Api } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Api.create(body)
    .then((api) => api.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Api.count(query)
    .then(count => Api.find(query, select, cursor)
      .then((apis) => ({
        count,
        rows: apis.map((api) => api.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Api.findById(params.id)
    .then(notFound(res))
    .then((api) => api ? api.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Api.findById(params.id)
    .then(notFound(res))
    .then((api) => api ? Object.assign(api, body).save() : null)
    .then((api) => api ? api.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Api.findById(params.id)
    .then(notFound(res))
    .then((api) => api ? api.remove() : null)
    .then(success(res, 204))
    .catch(next)
