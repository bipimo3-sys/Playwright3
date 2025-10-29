import type { APIRequestContext, APIResponse } from "@playwright/test";

export class APIUserService {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = "http://localhost:3000/api/users";
  }

  
  async getAllUsers(): Promise<APIResponse> {
    return this.request.get(this.baseURL);
  }

  async getUserById(id: string | number): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}/${id}`);
  }

  async createUser(name: string): Promise<APIResponse> {
    return this.request.post(this.baseURL, { data: { name } });
  }

  async updateUser(id: string | number, name: string): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}/${id}`, { data: { name } });
  }

  async deleteUser(id: string | number): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}/${id}`);
  }

  async getDelayedEndpoint(): Promise<APIResponse> {
    return this.request.get("http://localhost:3000/api/delay");
  }

  async getErrorEndpoint(): Promise<APIResponse> {
    return this.request.get("http://localhost:3000/api/error");
  }
}
