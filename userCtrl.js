let users = require('./users');
let userArray = users.find();

module.exports = {
  readAll: ()=>{
      return users.find();
  },

  findUserById: (id) =>{
      let found = userArray.filter(val =>{
          return val.id === id;
      });
    return users.findOne('id', id);
  },

  getAdmins: ()=>{
      let found = userArray.filter(val =>{
          return val.type === 'admin';
      });
      if(found.length > 0){
          return found;
      }else{
          return null;
      }
  },

    getNonAdmins: ()=>{
        let found = userArray.filter(val =>{
            return val.type !== 'admin';
        });
        if(found.length > 0){
            return found;
        }else{
            return null;
        }
    },

    getUsersByFavorite: (fav)=>{
      let favs = [];
      for(let i = 0; i < userArray.length; i++) {
          for(let j = 0; j < userArray[i].favorites.length; j++){
              if (userArray[i].favorites[j] === fav){
                  favs.push(userArray[i])
              }
          }
      }
        if(favs.length > 0){
            return favs;
        }else{
            return null;
        }
    },

    getUsersByAgeLimit: (age) =>{
        let found = userArray.filter(val =>{
            return val.age < age;
        });
        if(found.length > 0){
            return found;
        }else{
            return null;
        }
    },

    findUserByQuery: (term, value) =>{
      switch (term){
          case 'last_name':
              return users.find('last_name', value);
              break;
          case 'email':
              let foundEmail = userArray.filter(val =>{
                  return val.email === value;
              });
              if(foundEmail.length > 0){
                  return foundEmail;
              }else{
                  return null;
              }
              break;
          case 'state':
              let foundState = userArray.filter(val =>{
                  return val.state === value;
              });
              if(foundState.length > 0){
                  return foundState;
              }else{
                  return null;
              }
              break;
      }
  },
    createUser: (user) =>{
        let newUser = user;
        return users.add(newUser);
    },

    updateUser: (userId, user) =>{
        let found = users.findOne('id', userId);
        return users.update("id", found.id, user)
    },
    removeUser: (id) =>{
        let found = users.findOne('id', id);
        return users.remove("id", found.id)

    }


};