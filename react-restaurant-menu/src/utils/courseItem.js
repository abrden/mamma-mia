export default function getCourseItems(courseItems, category_id = "0") {
  let items = courseItems.filter(res => {
    return res.category_id === category_id
  })
  return items
}
