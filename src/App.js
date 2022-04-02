import { useState } from 'react';
import './App.css';

function App() {
  const [postItList, addPostIt] = useState([]);

  function insertPostIt(newPostItText) {
    const nextId = postItList.length + 1;
    const newPostItList = [...postItList, { id: nextId, text: newPostItText }];
    return addPostIt(newPostItList);
  }

  return (
    <div className="App">
      <main>
        <div>
            <PostItForm insertPostIt={insertPostIt} />
        </div>

        <div>
            <PostItList items={postItList} />
        </div>
      </main>
    </div>
  );
}

function PostItForm(props) {
    const [newPostItText, setPostItText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( newPostItText?.length > 0) {
            props.insertPostIt(newPostItText);
            setPostItText('');
        }
    }

    const handleChange = (event) => {
        const { target: { value } } = event;
        setPostItText(value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={newPostItText} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    )
}

function PostItList(props) {
    if (!props.items?.length) {
        return (<p>No items</p>);
    }

    const { items } = props;

    const postItItems = items.map(item => {
        return (<PostItItem text={item.text} key={item.id} />);
    });

    return (<ul>{postItItems}</ul>);
}

function PostItItem(props) {
    return (
        <li>{props.text}</li>
    )
}

export default App;
