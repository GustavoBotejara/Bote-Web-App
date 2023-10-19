import { useState, useEffect } from 'react';
import BoteList from './BoteList';

const term = "Bote";
const API_URL = "/botes";
const headers = {
    'Content-type' : 'application/json',
}

function Bote() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchBoteData();
  }, []);

  const fetchBoteData = (): void => {
    fetch(API_URL)
        .then(response => response.json())
        .then((data) => setData(data))
        .catch((error: Error) => setError(error));
  };

  const handleCreate = (item): void => {
    console.log(`add item: ${JSON.stringify(item)}`);

    fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({name: item.name}),
    })
        .then(response => response.json())
        .then((returnedItem) => setData([...data, returnedItem]))
        .catch((error: Error) => setError(error));
  };

  const handleUpdate = (updatedItem): void => {
    console.log(`updated item: ${JSON.stringify(updatedItem)}`);

    fetch(`${API_URL}/${updatedItem.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedItem),
    })
        .then(() => setData(data.map(item => item.id === updatedItem.id ? updatedItem: item)))
        .catch((error: Error) => setError(error));
  };

  const handleDelete = (id): void => {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers,
    })
        .then(() => setData(data.filter(item => item.id !== id)))
        .catch((error: Error) => console.error('Error deleting item:', error));
  };


  return (
    <div>
      <BoteList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Bote;