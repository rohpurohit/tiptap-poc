import sdk from "matrix-js-sdk";

export async function createMatrixClient(data) {
  const signInOpts = {
    baseUrl: data.server,

    userId: data.user,
  };

  const matrixClient =
    data.authMethod === "token"
      ? sdk.createClient({
          ...signInOpts,
          accessToken: data.token,
        })
      : sdk.createClient(signInOpts);

  if (data.authMethod === "token") {
    await matrixClient.loginWithToken(data.token);
  } else {
    await matrixClient.login("m.login.password", {
      user: data.user,
      password: data.password,
    });
  }

  // overwrites because we don't call .start();
  matrixClient.canSupportVoip = false;
  matrixClient.clientOpts = {
    lazyLoadMembers: true,
  };
  return matrixClient;
}
