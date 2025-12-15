import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri:
    process.env.MONGODB_URI ||
    'mongodb+srv://phpdev074:GPwjDg6soVGDaZVn@cluster0.rap01fg.mongodb.net/smartAISolutions?retryWrites=true&w=majority&appName=Cluster0',
}));
