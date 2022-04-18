"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const axios_1 = require("axios");
class DataService {
    constructor(baseUrl) {
        if (!baseUrl) {
            throw new Error('Base URL cannot be empty');
        }
        this.baseUrl = baseUrl;
    }
    getUrl(model) {
        if (!model) {
            throw new Error('Model cannot be empty');
        }
        return {
            default: `${this.baseUrl}/${model}`,
            count: `${this.baseUrl}/${model}/count`,
            one: `${this.baseUrl}/${model}/one`,
            all: `${this.baseUrl}/${model}/all`,
            findAndCount: `${this.baseUrl}/${model}/find_and_count`,
            withPk: (id) => `${this.baseUrl}/${model}/${id}`,
        };
    }
    async call(method, url, config, body) {
        let res;
        try {
            switch (method) {
                case 'post':
                case 'put':
                    res = await axios_1.default[method](url, body, config);
                default:
                    res = await axios_1.default[method](url, config);
            }
            if (res.data) {
                return res.data;
            }
            throw new Error('Empty response');
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async count(model, config) {
        return this.call('get', this.getUrl(model).default, config);
    }
    async findByPk(model, id, config) {
        return this.call('get', this.getUrl(model).withPk(id), config);
    }
    async findOne(model, config) {
        return this.call('get', this.getUrl(model).one, config);
    }
    async findAll(model, config) {
        return this.call('get', this.getUrl(model).all, config);
    }
    async findAndCount(model, config) {
        return this.call('get', this.getUrl(model).findAndCount, config);
    }
    async find(model, config) {
        return this.call('get', this.getUrl(model).default, config);
    }
    async create(model, body, config) {
        try {
            return this.call('post', this.getUrl(model).default, config, body);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    async update(model, id, body, config) {
        return this.call('put', this.getUrl(model).withPk(id), config, body);
    }
    async delete(model, id, config) {
        return this.call('delete', this.getUrl(model).withPk(id), config);
    }
}
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map