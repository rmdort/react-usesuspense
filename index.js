import React, { useEffect } from 'react'

let results = null
let error = null
const useSuspense = (fn, deps = []) => {
  useEffect(() => {
    results = false
  }, deps)
  
  if (results) return results
  if (error) throw error
  throw new Promise((resolve, reject) => {
    fn()
      .then((res) => {
        results = res
        resolve(results)
      })
      .catch(err => {
        error = err
      })
  })
}

export default useSuspense
