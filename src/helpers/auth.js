export function authHeader() {
  // return authorization header with jwt token
  const idToken = localStorage.getItem("idToken");
  const userName = localStorage.getItem("username");
  // let tokenType = localStorage.getItem("tokenType");

  return {
    Authorization: `${idToken}`,
    UserName: userName,
    "Access-Control-Allow-Origin": "*",
  };
}
