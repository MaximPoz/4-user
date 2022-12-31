import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch('https://reqres.in/api/users') //взять от сюда
      .then((res) => res.json()) //конвертировать в json
      .then((json) => {       //из json забрать 
        setUsers(json.data)  // data (там все пользователи)
      })
      .catch((err) => { //Если будет ошибка то и так понятно
        console.warn(err)
        alert('Ошибка при получении пользователей')
      })
      .finally(() => setLoading(false))//когда загрузка закончилась, вырубить Loading
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length}/>
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          onClickInvite={onClickInvite}
          invites={invites}
          onClickSendInvites={onClickSendInvites}

        />
      )}

    </div>
  );
}

export default App;
