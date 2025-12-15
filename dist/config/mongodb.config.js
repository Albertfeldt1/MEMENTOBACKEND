"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('mongodb', () => ({
    uri: process.env.MONGODB_URI ||
        'mongodb+srv://phpdev074:GPwjDg6soVGDaZVn@cluster0.rap01fg.mongodb.net/smartAISolutions?retryWrites=true&w=majority&appName=Cluster0',
}));
//# sourceMappingURL=mongodb.config.js.map