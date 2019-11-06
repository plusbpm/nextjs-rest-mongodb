import Router from 'next/router';

export default ({ res, restClient }, Location, condition) => {
  const userInquery = restClient.getInquery('user');
  const userId = userInquery.get('data._id');
  if (!condition(userId)) return false;
  if (res) {
    res.writeHead(302, { Location });
    res.end();
  } else {
    Router.push(Location);
  }
  return true;
};
