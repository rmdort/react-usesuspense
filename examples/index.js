import React, { Suspense, useEffect, useState, useMemo} from 'react'
import ReactDOM from 'react-dom'


let results = null
let error = null
const useSuspense = (fn, deps) => {
  useEffect(() => {
    results = false
  }, deps)
  
  if (results) return results
  if (error) throw error
  throw new Promise((resolve, reject) => {
    return fn()
      .then((res) => {
        results = res
        resolve(results)
      })
      .catch(err => {
        error = err
      })
  })
}

const SearchResults = ({ query }) => {
  const api = useMemo(() => {
    return fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&query="${query}"`)
  }, [ query ])
  const results = useSuspense(() => {
    return api.then(res => res.json()).then(res => res.hits)
  }, [ api ])
  return (
    <div>
      {results.map((result, idx) => {
        return (
          <div key={result.objectID}>
              {result.title}
          </div>
        )
      })}
    </div>
  )
}

const App = () => {
  const [ query, setQuery ] = useState('')
  return (
    <div>
      <input type='text' onChange={(e) => setQuery(e.target.value)} />
      <Suspense fallback={<div>Loading</div>}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
