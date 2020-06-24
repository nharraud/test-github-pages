import React, { useState } from 'react'
import { useLunr } from 'react-lunr'
import { Formik, Form, Field } from 'formik'
import * as lunr from 'lunr'
import index_data from './index.json'
import raw_data from './data.json'

const index = lunr.Index.load(index_data)
// const index = lunr(function () {
//   this.field('title')
//   this.field("body");

//   this.add({
//     title: "Twelfth-Night",
//     body: "If music be the food of love, play on: Give me excess of it…",
//     author: "William Shakespeare",
//     id: "1"
//   });
// })
const store = raw_data.reduce(function(obj, x) {
  obj[x.id] = x
  return obj
}, {})


// const store = {
//   1: { id: 1, title: 'Document 1' },
//   2: { id: 2, title: 'Document 2' },
//   3: { id: 3, title: 'Document 3' },
// }
 
export const SearchBar = () => {
  const [query, setQuery] = useState(null)
  const results = useLunr(query, index, store)
 
  return (
    <div>
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setQuery(values.query)
        setSubmitting(false)
      }}
    >
      <Form>
        <Field name="query" />
      </Form>
    </Formik>
    <h1>Results</h1>
    <ul>
      {results.map(result => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
    </div>
  )
}