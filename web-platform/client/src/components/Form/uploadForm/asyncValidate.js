const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /* , dispatch */) =>
  sleep(1000) // simulate server latency
    .then(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
        throw { username: 'That username is taken' };
      }
    });

export default asyncValidate;
