## Experimenting with suspending hook

(Use at your own risk)

## Usage

````
import React, { Suspense } from 'react
import useSuspense from '@rmdort/useSuspense'

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

````