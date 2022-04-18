import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class DataService {
  baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error('Base URL cannot be empty');
    }
    this.baseUrl = baseUrl;
  }

  private getUrl(model: string) {
    if (!model) {
      throw new Error('Model cannot be empty');
    }

    return {
      default: `${this.baseUrl}/${model}`,
      count: `${this.baseUrl}/${model}/count`,
      one: `${this.baseUrl}/${model}/one`,
      all: `${this.baseUrl}/${model}/all`,
      findAndCount: `${this.baseUrl}/${model}/find_and_count`,
      withPk: (id: number) => `${this.baseUrl}/${model}/${id}`,
    };
  }

  private async call(
    method: keyof Pick<AxiosInstance, 'get' | 'post' | 'put' | 'delete'>,
    url: string,
    config?: AxiosRequestConfig<Object>,
    body?: Object,
  ) {
    let res: AxiosResponse;
    try {
      switch (method) {
        case 'post':
        case 'put':
          res = await axios[method](url, body, config);
        default:
          res = await axios[method](url, config);
      }

      if (res.data) {
        return res.data;
      }
      throw new Error('Empty response');
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async count(model: string, config?: AxiosRequestConfig<Object>): Promise<any> {
    return this.call('get', this.getUrl(model).default, config);
  }

  async findByPk(model: string, id: number, config?: AxiosRequestConfig<Object>) {
    return this.call('get', this.getUrl(model).withPk(id), config);
  }

  async findOne(model: string, config?: AxiosRequestConfig<Object>) {
    return this.call('get', this.getUrl(model).one, config);
  }

  async findAll(model: string, config?: AxiosRequestConfig<Object>) {
    return this.call('get', this.getUrl(model).all, config);
  }

  async findAndCount(model: string, config?: AxiosRequestConfig<Object>) {
    return this.call('get', this.getUrl(model).findAndCount, config);
  }

  async find(model: string, config?: AxiosRequestConfig<Object>) {
    return this.call('get', this.getUrl(model).default, config);
  }

  async create(model: string, body?: Object, config?: AxiosRequestConfig<Object>) {
    try {
      return this.call('post', this.getUrl(model).default, config, body);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(model: string, id: number, body?: Object, config?: AxiosRequestConfig<Object>) {
    return this.call('put', this.getUrl(model).withPk(id), config, body);
  }

  async delete(model: string, id: number, config?: AxiosRequestConfig<Object>) {
    return this.call('delete', this.getUrl(model).withPk(id), config);
  }
}
