import { fetchResultWrapper } from "./fetchResultWrapper"
import fetch from "node-fetch"

export const fetchResult = fetchResultWrapper(fetch)
