import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialTable from 'material-table';
import ChipInput from 'material-ui-chip-input';
import useFetch from 'use-http';

import Loading from './Loading';

export default function Home() {
  const [users, setUsers] = useState([]);
  const { request, response, loading } = useFetch('/api/Users');

  useEffect(() => {
    (async () => {
      const data = await request.get();
      if (response.ok) setUsers(data);
    })();
  }, []);

  const addUser = async data => {
    const user = await request.post(data);
    if (response.ok) {
      console.log('new user added');
      users.push(user);
      setUsers(users.slice());
    } else {
      console.log('Error creating user: ' + response.status);
      throw new Error('error creating user');
    }
  };

  const updateUser = async user => {
    await request.put(`/${user.id}`, user);
    if (response.ok) {
      console.log('user modified');
      console.log(user);
      const idx = users.findIndex(u => u.id === user.id);
      users[idx] = user;
      setUsers(users.slice());
    } else {
      console.log('error updating user: ' + response.status);
    }
  };

  const deleteUser = async user => {
    await request.delete(`/${user.id}`);
    if (response.ok) {
      setUsers(users.filter(u => u.id !== user.id));
    } else {
      console.log('error deleting user');
    }
  };

  const renderChip = field => rowData => (
    <div>
      {(rowData[field] || []).map(c => (
        <Chip size="small" label={c} key={c} />
      ))}
    </div>
  );

  const editRole = ({ value, onChange }) => (
    <Select value={value} onChange={evt => onChange(evt.target.value)}>
      <MenuItem value="user">user</MenuItem>
      <MenuItem value="siege">siege</MenuItem>
      <MenuItem value="admin">admin</MenuItem>
    </Select>
  );

  const editCountries = ({ value, onChange }) => (
    <div>
      <ChipInput
        value={value || []}
        onAdd={chip => {
          const countries = (value || []).slice();
          countries.push(chip);
          console.log(countries);
          onChange(countries);
        }}
        onDelete={chip => onChange(value.filter(c => c !== chip))}
      />
    </div>
  );

  return (
    <Loading loading={loading}>
      <MaterialTable
        title="Utilisateurs"
        columns={[
          { title: 'Nom', field: 'name' },
          { title: 'Email', field: 'email' },
          { title: 'Statut', field: 'active', type: 'boolean' },
          {
            title: 'Role',
            field: 'role',
            editComponent: editRole,
            initialEditValue: 'user'
          },
          {
            title: 'Pays',
            field: 'countries',
            render: renderChip('countries'),
            editComponent: editCountries,
            initialEditValue: []
          }
        ]}
        data={users}
        editable={{
          onRowAdd: addUser,
          onRowUpdate: updateUser,
          onRowDelete: deleteUser
        }}
        localization={{
          pagination: {
            firstTooltip: 'Première Page',
            previousTooltip: 'Page Précédente',
            nextTooltip: 'Page Suivante',
            lastTooltip: 'Denière Page',
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsPerPage: 'Elements par page:',
            labelRowsSelect: 'élements'
          },
          toolbar: {
            searchTooltip: 'Rechercher',
            searchPlaceholder: 'Rechercher'
          },
          header: {},
          body: {
            filterRow: {},
            editRow: {
              saveTooltip: 'Ok',
              cancelTooltip: 'Annuler',
              deleteText: 'Etes vous sûr de vouloir supprimer cet élement ?'
            },
            addTooltip: 'Ajouter',
            deleteTooltip: 'Supprimer',
            editTooltip: 'Modifier'
          }
        }}
      />
    </Loading>
  );
}
