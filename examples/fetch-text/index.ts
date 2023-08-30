import { fetchResult, parseText } from "fetch-result"

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
  const textResult = await fetchResponse.text()
  if (textResult.err) {
    console.log("Error parsing text:")
    console.error(textResult.val)
    return
  }
  console.log("Text:", textResult.val)

  // Simplified version of the above code:
  const textResult2 = await fetchResult(
    "https://jsonplaceholder.typicode.com/todos/1"
  ).then(parseText)
  if (textResult2.err) {
    console.log("Error parsing text (simplified version):")
    console.error(textResult2.val)
    return
  }
  console.log("Text (simplified version):", textResult2.val)
}

main()
