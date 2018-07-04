import mongoose from 'mongoose';

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

// print mongoose logs in dev env
if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, doc,"debug"); // eslint-disable-line no-console
  });
}
mongoose.connection.on('disconnected', () => {
  console.info('Database connection disconnected!'); // eslint-disable-line no-console
});
mongoose.connection.on('connecting', () => {
  console.info('Database connection connecting!'); // eslint-disable-line no-console
});
mongoose.connection.on('connected', () => {
  console.info('Database connection successful!'); // eslint-disable-line no-console
});
mongoose.connection.on('disconnecting', () => {
  console.info('Database disconnecting!'); // eslint-disable-line no-console
});

export default mongoose;
