/* data pattern to update user*/
export function getSettings (id, entries) {
  return {
    "modifier": entries,
    "query": { "_id": id }
  }
}
