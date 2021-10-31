import {
   makeRadioSut,
   makeSelectSut,
   makeSut,
   makeUseFormParamsMock
} from './utils/makeSut'
import * as faker from 'faker'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent } from '@testing-library/react'

describe('Test initial state', () => {
   test('Should set initial values', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.values).toEqual(mock.hookParams.initialValues)
      })
   })

   test('Should set initial errors', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.errors).toEqual(mock.hookParams.initialErrors)
      })
   })

   test('Should set initial touched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: faker.datatype.boolean()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.touched).toEqual(mock.hookParams.initialTouched)
      })
   })
})

describe('Test handle functions to setField/value/error/touched', () => {
   test('Should change input state when run setFieldValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValue = faker.random.word()

      act(() => {
         hookState.setFieldValue(mock.inputParams.name, newValue)
      })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(newValue)
      })
   })

   test('Should change input state when run setFieldError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newError = faker.random.words()

      act(() => {
         hookState.setFieldError(mock.inputParams.name, newError)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual(newError)
      })
   })

   test('Should change input state when run setFieldTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: false
      })
      const { hookState } = makeSut(mock)
      const newTouched = true

      act(() => {
         hookState.setFieldTouched(mock.inputParams.name, newTouched)
      })

      await waitFor(() => {
         expect(hookState.state.touched.inputName).toEqual(newTouched)
      })
   })

   test('Should reset input state when run resetFieldError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newError = faker.random.words()

      act(() => {
         hookState.setFieldValue(mock.inputParams.name, newError)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual(newError)
      })

      act(() => {
         hookState.resetFieldError(mock.inputParams.name)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual('')
      })
   })
})

describe('Test handle functions to setFields/value/error/touched', () => {
   test('Should change input state when run setFieldsValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValues = {
         inputName: faker.random.word(),
         inputEmail: faker.random.word()
      }

      act(() => {
         hookState.setFieldsValue(newValues)
      })

      await waitFor(() => {
         expect(hookState.state.values).toEqual(newValues)
      })
   })

   test('Should change input state when run setFieldsError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newErrors = {
         inputName: faker.random.words(),
         inputEmail: faker.random.words()
      }

      act(() => {
         hookState.setFieldsError(newErrors)
      })

      await waitFor(() => {
         expect(hookState.state.errors).toEqual(newErrors)
      })
   })

   test('Should change input state when run setFieldsTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: faker.datatype.boolean()
      })
      const { hookState } = makeSut(mock)
      const newTouched = {
         inputName: faker.datatype.boolean(),
         inputEmail: faker.datatype.boolean()
      }

      act(() => {
         hookState.setFieldsTouched(newTouched)
      })
   })
})

describe('onChange mode tests input events', () => {
   test('Should update input value when dispatch input event', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.name.firstName()
      fireEvent.input(input, { target: { value: nextValue } })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(nextValue)
      })
   })

   test('Should update input number value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.number(),
         type: 'number'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input checkbox value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.boolean(),
         type: 'checkbox'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input range value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.number({ min: 0, max: 100 }),
         type: 'range'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input date value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'date'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input time value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'time'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input datetime-local value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'datetime-local'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input month value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'month'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input week value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'week'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input color value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.internet.color(),
         type: 'color'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.internet.color()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input radio value when dispatch input event', async () => {
      const mock = makeUseFormParamsMock({
         value: 'option-1'
      })
      const { hookState, sut } = makeRadioSut(mock)
      const input = sut.getByTestId('radio-2')
      const nextValue = 'option-2'
      fireEvent.click(input)

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input select value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: 'option-1'
      })
      const { hookState, sut } = makeSelectSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = 'option-2'
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })
})
