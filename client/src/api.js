import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,
  
  getProjects() {
    return service
      .get('/projects')
      .then(res => res.data)
      .catch(errHandler);
  },

  getProject(projectId) {
    return service
      .get('/projects/'+projectId)
      .then(res => res.data)
      .catch(errHandler);
  },

  postProjects(data) {
    return service
    .post('/projects', data)
    .then(res => res.data)
    .catch(errHandler);
  },
  
  putProject(projectId, body) {
    return service
      .put('/projects/'+projectId, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteProjects(projectId) {
    return service
      .delete('/projects/'+projectId)
      .then(res => res.data)
      .catch(errHandler);
  },

  getIdea(ideaId) {
    return service
      .get('/ideas'+ideaId)
      .then(res => res.data)
      .catch(errHandler);
  },

  postIdea(data) {
    return service
    .post('/ideas', data)
    .then(res => res.data)
    .catch(errHandler);
  },
  
  putIdea(ideaId, body) {
    return service
      .put('/ideas/'+ideaId, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteIdea(ideaId) {
    return service
      .delete('/ideas/'+ideaId)
      .then(res => res.data)
      .catch(errHandler);
  },

  getComments(ideaId) {
    return service
      .get('/comments'+ideaId)
      .then(res => res.data)
      .catch(errHandler);
  },

  postComments(data) {
    return service
    .post('/comments', data)
    .then(res => res.data)
    .catch(errHandler);
  },
  
  putComment(commentId, body) {
    return service
      .put('/comments/'+commentId, body)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteComments(commentId) {
    return service
      .delete('/comments/'+commentId)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get('/secret')
      .then(res => res.data)
      .catch(errHandler);
  },
  
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then(res => {
        const { data } = res;
        localStorage.setItem('user', JSON.stringify(data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        return data;
      })
      .catch(errHandler);
  },

  logout() {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('user');
  },

  loadUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    const user = JSON.parse(userData);
    if (user.token && user.name) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      return user;
    }
    return false;
  },

  isLoggedIn() {
    return localStorage.getItem('user') != null
  },


  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file)
    return service
      .post('/users/first-user/pictures', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => res.data)
      .catch(errHandler);
  },
};
