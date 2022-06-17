import { Box, FormControl, Radio, TextInput, Flash } from "@primer/react";
import React, { useState } from "react";

export default function LoginForm({ setLoginData, status }) {
  const [server, setServer] = useState("https://matrix.org");
  const [user, setUser] = useState("@yousefed:matrix.org");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [roomAlias, setRoomAlias] = useState("#matrix-crdt-test:matrix.org");
  const [authMethod, setAuthMethod] = useState("password");
  const [validationResult, setValidationResult] = useState();

  React.useEffect(() => {
    if (!/#matrix-crdt-.*/.test(roomAlias)) {
      setValidationResult("prefix");
    } else if (!/#.+:.+/.test(roomAlias)) {
      setValidationResult("format");
    } else {
      setValidationResult(undefined);
    }
  }, [roomAlias]);

  React.useEffect(() => {
    setLoginData({
      server,
      user,
      token,
      password,
      roomAlias,
      authMethod,
    });
  }, [setLoginData, server, user, token, password, roomAlias, authMethod]);

  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        {status === "failed" && <Flash variant="danger">Sign in failed</Flash>}
        <FormControl>
          <FormControl required>
            <FormControl.Label>Homeserver:</FormControl.Label>
            <TextInput
              onChange={(e) => setServer(e.target.value)}
              defaultValue={server}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <FormControl required>
            <FormControl.Label>Matrix user id:</FormControl.Label>
            <TextInput
              onChange={(e) => setUser(e.target.value)}
              defaultValue={user}
              placeholder="e.g.: @yousefed:matrix.org"
            />
          </FormControl>
        </FormControl>
        <fieldset style={{ margin: 0, padding: 0, border: 0 }}>
          <FormControl>
            <FormControl.Label>Sign in with password</FormControl.Label>
            <Radio
              name="authMethod"
              value="password"
              defaultChecked={authMethod === "password"}
              onChange={(e) => setAuthMethod(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Sign in with Access Token</FormControl.Label>
            <Radio
              name="authMethod"
              value="token"
              defaultChecked={authMethod === "token"}
              onChange={(e) => setAuthMethod(e.target.value)}
            />
          </FormControl>
        </fieldset>
        {authMethod === "token" && (
          <FormControl>
            <FormControl required>
              <FormControl.Label>Access token:</FormControl.Label>
              <TextInput
                type="password"
                onChange={(e) => setToken(e.target.value)}
                defaultValue={token}
              />
              <FormControl.Caption>
                You can find your access token in Element Settings -&gt; Help &
                About. Your access token is only shared with the Matrix server.
              </FormControl.Caption>
            </FormControl>
          </FormControl>
        )}
        {authMethod === "password" && (
          <FormControl>
            <FormControl required>
              <FormControl.Label>Password:</FormControl.Label>
              <TextInput
                name="matrixPassword"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                defaultValue={password}
              />
              <FormControl.Caption>
                Your password is only shared with the Matrix server.
              </FormControl.Caption>
            </FormControl>
          </FormControl>
        )}
        <FormControl>
          <FormControl
            required
            validationMap={{
              prefix: "error",
              format: "error",
            }}
            validationResult={validationResult}
          >
            <FormControl.Label>Room alias:</FormControl.Label>
            <TextInput
              onChange={(e) => setRoomAlias(e.target.value)}
              defaultValue={roomAlias}
              placeholder="e.g.: #matrix-crdt-test:matrix.org"
            />
            <FormControl.Validation validationKey="prefix">
              The room alias must start "#matrix-crdt-" for testing purposes.
            </FormControl.Validation>
            <FormControl.Validation validationKey="format">
              Room aliases should be of the format #alias:server.tld
            </FormControl.Validation>
            <FormControl.Caption>
              The room that application state will be synced with.
            </FormControl.Caption>
          </FormControl>
        </FormControl>
      </Box>
    </div>
  );
}
