export function filterList(list, taskState) {
  let filteredList = [...list];
  if(taskState !== '') {
    filteredList = list.filter(
      item => item.state === taskState
    );
  }
  return filteredList;
}