import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [itemText, setItemText] = useState('');
  const [listitem, setListitem] = useState([]);
  const [isupdating,setIsupdating]=useState('');
  const [updateitemText, setUpdateitemText] = useState('');


  //post the data
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/item', { item: itemText });
      setListitem((prev) => [...prev, res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  };
//getthe data
  useEffect(() => {
    const getitemlist = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items');
        setListitem(res.data); 
      } catch (error) {
        console.log(error);
      }
    };
    getitemlist();
  }, [listitem]);


  //upadate item 
 const updateitem= async(e)=>{
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:5500/api/item/${isupdating}`, { item: updateitemText });
    console.log(res.data);

    // Create a copy of the listitem array and update the specific item
    const updatedListitem = listitem.map(item => {
      if (item._id === isupdating) {
        return { ...item, item: updateitemText };
      }
      return item;
    });

    setListitem(updatedListitem);
    setUpdateitemText('')
    setIsupdating('')
  } catch (error) {
    console.log(error);
    
  }

 }
//before updating the item it is just doing the new input
const randerupdateform=()=>(
  <form className='update-form' onSubmit={(e)=>{updateitem(e)}}>
    <input className="update-new-input" type="text" placeholder='new Text'onChange={(e)=>{setUpdateitemText(e.target.value)}} value={updateitemText}/>
    <button className='update-new-button' type='submit'>Update</button>
  </form>
)


  //delete items
  const deleteitem= async(id)=>{
    try {
      const res=await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newlistitem=listitem.filter(item=>item._id!==id);
      setListitem(newlistitem)
      console.log(res)
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className="App">
      <h1>TODO-List</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add TODO Item"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">ADD</button>
      </form>

      <div className="todolistitems">
       

        {listitem.map((item) => (
          <div className="listtodo" key={item._id}>
           { isupdating===item._id
            ?randerupdateform()
            :<>
            <p className="item-content">{item.item}</p>
            <button className="Button-item" onClick={()=>{setIsupdating(item._id)}}>Update</button>
            <button className="Delete-item" onClick={() => { deleteitem(item._id)}}>Delete</button>
            </>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
