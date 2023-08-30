import { fetchResult, parseJson } from "fetch-result"

async function main() {
  const fetchedResult = await fetchResult(
    "https://jsonplaceholder.typicode.com/todos/1"
  )
  if (fetchedResult.err) {
    console.log("Error fetching data:")
    console.error(fetchedResult.val)
    return
  }
  const fetchResponse = fetchedResult.val
  const jsonResult = await fetchResponse.json()
  if (jsonResult.err) {
    console.log("Error parsing JSON:")
    console.error(jsonResult.val)
    return
  }
  console.log("JSON:", JSON.stringify(jsonResult.val, null, 2))

  // Simplified version of the above code:
  const jsonResult2 = await fetchResult(
    "https://jsonplaceholder.typicode.com/todos/1"
  ).then(parseJson)
  if (jsonResult2.err) {
    console.log("Error parsing JSON (simplified version):")
    console.error(jsonResult2.val)
    return
  }
  console.log(
    "JSON (simplified version):",
    JSON.stringify(jsonResult2.val, null, 2)
  )
}

main()
