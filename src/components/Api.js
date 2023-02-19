export class Api {
  constructor(config){
    this._url = config.url;
    this._authorization = config.authorization;
    this._cohort = config.cohort;
  }

  _renderResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._renderResponse)
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
    .then(this._renderResponse)
  }

  deleteCard(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._renderResponse)
  }

  getUserData(){
    return fetch(`${this._url}v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._renderResponse)
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
    .then(this._renderResponse)
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
    .then(this._renderResponse)
  }


  setLike(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._renderResponse)
  }

  deleteLike(cardId){
    return fetch(`${this._url}v1/${this._cohort}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._renderResponse)
  }
}

