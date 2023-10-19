import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

interface Bote {
  id: string;
  name: string;
}

interface BoteListProps {
  name: string;
  data: Bote[];
  onCreate: (formData: Bote) => void;
  onUpdate: (formData: Bote) => void;
  onDelete: (id: string) => void;
  error: { message: string } | null;
}

const BoteList: FC<BoteListProps> = ({ name, data, onCreate, onUpdate, onDelete, error }) => {
  const [formData, setFormData] = useState<Bote>({ id: '', name: ''});
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingId) {
      onUpdate(formData);
      setEditingId(null);
    } else {
      onCreate(formData);
    }
    setFormData({ id: '', name: ''});
  };

  const handleEdit = (item: Bote) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      name: item.name,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ id: '', name: ''});
  };


  return (
    <div>
      <h2>{name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormChange}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
      </form>
      {error && <div>{error.message}</div>}
      <h2>{name}s</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoteList;