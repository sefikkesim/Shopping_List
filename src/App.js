import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage =()=>{
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(list)
  }else{
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hey");
    if (!name) {
    showAlert(true, "Please enter something" , "danger")
    } else if (name && isEditing) {
      setList(list.map((item)=>{
        if(item.id === editId){
          return { ...item, title :name}
        }
        return item
      }
      ))
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true,"item edited successfully","success");
    } else {
      showAlert(true,"item aded successfully","success")
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("")
    }
  };

const showAlert = (show = false , msg = "" ,type = "")=>{
  setAlert({show,msg,type})
}

const clearList =()=>{
showAlert(true,"List Cleared","danger")
setList ([])
}

const deleteItem = (id) => {
  showAlert(true, "item deleted","danger");
  const newList= list.filter((item) => item.id !== id )
  setList (newList)
};


const editItem =(id)=>{
  const speceficItem = list.find((item)=> item.id === id)
  setIsEditing(true)
  setEditId(id)
  setName(speceficItem.title)
}

useEffect(()=>{
  localStorage.setItem("list",JSON.stringify(list))
},[list])
  return (
    <div className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>Shopping List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Something..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} deleteItem={deleteItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>
            {" "}
            Clear Items
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
