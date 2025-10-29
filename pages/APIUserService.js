export class APIUserService {
  constructor(request) {
    this.request = request;
    this.baseURL = "http://localhost:3000/api/users";
  }

  async getAllUsers() {
    return this.request.get(this.baseURL);
  }

  async getUserById(id) {
    return this.request.get(`${this.baseURL}/${id}`);
  }

  async createUser(name) {
    return this.request.post(this.baseURL, { data: { name } });
  }

  async updateUser(id, name) {
    return this.request.put(`${this.baseURL}/${id}`, { data: { name } });
  }

  async deleteUser(id) {
    return this.request.delete(`${this.baseURL}/${id}`);
  }

  async getDelayedEndpoint() {
    return this.request.get("http://localhost:3000/api/delay");
  }

  async getErrorEndpoint() {
    return this.request.get("http://localhost:3000/api/error");
  }
}
