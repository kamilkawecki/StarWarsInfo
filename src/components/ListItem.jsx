function ListItem(props) {
  return (
    <li className="bg-white rounded overflow-hidden">
      <div>
        <img src={'/LukeSkywalker.jpg'} onError={(e)=>{e.target.onError = null; e.target.src = '/placeholder.png'}} alt="" width="300" height="300" />
      </div>
      <div className="p-4 text-center">{props.person.name}</div>
    </li>
  );
}

export default ListItem;
