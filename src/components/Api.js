const renderResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export class Api {
  constructor(config){
    this._url = config.url;
    this._authorization = config.authorization;
    this._cohort = config.cohort;
  }

  getInitialCards() {
    return fetch(`${this._url}v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(renderResponse)
  }

  setCard({name, link}){
    return fetch(`${this._url}v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(renderResponse)
  }

  deleteCard(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(renderResponse)
  }

  getUserData(){
    return fetch(`${this._url}v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(renderResponse)
  }

  setUserData({name, about}){
    return fetch(`${this._url}v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(renderResponse)
  }

  setUserAvatar({avatar}){
    return fetch(`${this._url}v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(renderResponse)
  }


  setLike(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(renderResponse)
  }

  deleteLike(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(renderResponse)
  }
}

