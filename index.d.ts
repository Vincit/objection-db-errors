import {
  CheckViolationError,
  ConstraintViolationError,
  DataError,
  DBError,
  ForeignKeyViolationError,
  NotNullViolationError,
  UniqueViolationError,
  wrapError,
} from 'db-errors'
import { Model } from 'objection'

export function DBErrors<M extends typeof Model>(modelClass: M): M
// DEPRECATED: Use DBErrors instead.
export function DbErrors<M extends typeof Model>(modelClass: M): M

export {
  wrapError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  ConstraintViolationError,
  CheckViolationError,
  DataError,
}
