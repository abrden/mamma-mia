export default function getItemIndex(selectedItems, id) {
  try { 
    return selectedItems.findIndex(item => item.id === id) 
  } catch {
    return "null"
  }
}
