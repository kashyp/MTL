const _COURSES_URL = "http://localhost:8888/courses";

export function getCourses(){
  return fetch(_COURSES_URL)
  .then(res => res.json())
  .catch(error => {
    console.log('Error fetching data.')
  });
}
