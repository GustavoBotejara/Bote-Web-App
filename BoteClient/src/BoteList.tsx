import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import {Box, Button, IconButton, List, ListItem, ListItemText, TextField} from '@mui/material';
import './BoteList.css';
import {Delete, Edit} from '@mui/icons-material';

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
    <Box className="Box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{name}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8}}>
      <TextField className="name-input" label="Name" name="name" value={formData.name} onChange={handleFormChange} />
      <Button sx={{ mr: 1 }} variant="contained" type="submit">{editingId === null ? 'Create' : 'Update'}</Button>
      {editingId !== null && <Button variant="contained" onClick={handleCancelEdit}>Cancel</Button>}
      </form>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {data.map(item => (
          <ListItem key={item.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={item.name}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default BoteList;