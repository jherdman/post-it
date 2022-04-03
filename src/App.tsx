import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';

interface IPostIt {
    id: string;
    text: string;
}

const App = (): JSX.Element => {
  const [postItList, addPostIt] = useState<IPostIt[]>([]);

  function insertPostIt(newPostItText: string) {
    const nextId: string = (postItList.length + 1).toString();
    const newPostIt: IPostIt = { id: nextId, text: newPostItText };
    const newPostItList = [...postItList, newPostIt];

    addPostIt(newPostItList);
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

interface PostItFormProps {
    insertPostIt(newPostItText: string): void;
}

const PostItForm = (props: PostItFormProps): JSX.Element => {
    const [newPostItText, setPostItText] = useState('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if ( newPostItText?.length > 0) {
            props.insertPostIt(newPostItText);
            setPostItText('');
        }
    }

    const handleChange = (event: ChangeEvent): void => {
        const { target } = event;
        setPostItText((target as HTMLTextAreaElement).value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={newPostItText} onChange={handleChange} />
            <button type="submit">Save</button>
        </form>
    )
}

interface PostItListProps {
    items: IPostIt[];
}

const PostItList = ({ items }: PostItListProps): JSX.Element => {
    if (!items.length) {
        return (<p>No items</p>);
    }

    const postItItems = items.map(item => {
        return (<PostItItem text={item.text} key={item.id} />);
    });

    return (<ul>{postItItems}</ul>);
}

type PostItItemProps = {
    text: string;
}

const PostItItem = ({ text }: PostItItemProps): JSX.Element => {
    return (
        <li>{text}</li>
    )
}

export default App;
