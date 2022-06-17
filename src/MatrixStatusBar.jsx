import { Box, FormControl, Label, Radio } from "@primer/react";
import { MatrixProvider } from "matrix-crdt";
// import { MatrixClient } from "matrix-js-sdk";
import React, { useState } from "react";
import { LoginButton } from "./login/LoginButton";
import * as Y from "yjs";

/**
 * The Top Bar of the app that contains the sign in button and status of the MatrixProvider (connection to the Matrix Room)
 */
export default function MatrixStatusBar({ doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [matrixProvider, setMatrixProvider] = useState();
  const [status, setStatus] = useState();

  const [matrixClient, setMatrixClient] = useState();
  const [roomAlias, setRoomAlias] = useState();

  const connect = React.useCallback(
    (matrixClient, roomAlias) => {
      if (!matrixClient || !roomAlias) {
        throw new Error("can't connect without matrixClient or roomAlias");
      }

      // This is the main code that sets up the connection between
      // yjs and Matrix. It creates a new MatrixProvider and
      // registers it to the `doc`.
      const newMatrixProvider = new MatrixProvider(
        doc,
        matrixClient,
        { type: "alias", alias: roomAlias },
        undefined,
        {
          translator: { updatesAsRegularMessages: true },
          reader: { snapshotInterval: 10 },
          writer: { flushInterval: 500 },
        }
      );
      setStatus("loading");
      newMatrixProvider.initialize();
      setMatrixProvider(newMatrixProvider);

      // (optional): capture events from MatrixProvider to reflect the status in the UI
      newMatrixProvider.onDocumentAvailable((e) => {
        setStatus("ok");
      });

      newMatrixProvider.onCanWriteChanged((e) => {
        if (!newMatrixProvider.canWrite) {
          setStatus("failed");
        } else {
          setStatus("ok");
        }
      });

      newMatrixProvider.onDocumentUnavailable((e) => {
        setStatus("failed");
      });
    },
    [doc]
  );

  const onLogin = React.useCallback(
    (matrixClient, roomAlias) => {
      if (matrixProvider) {
        matrixProvider.dispose();
        setStatus("disconnected");
        setMatrixProvider(undefined);
      }

      // (optional) stored on state for easy disconnect + connect toggle
      setMatrixClient(matrixClient);
      setRoomAlias(roomAlias);

      // actually connect
      connect(matrixClient, roomAlias);
    },
    [matrixProvider, connect]
  );

  const onConnectChange = React.useCallback(
    (e) => {
      if (!matrixClient || !roomAlias) {
        throw new Error("matrixClient and roomAlias should be set");
      }

      if (matrixProvider) {
        matrixProvider.dispose();
        setStatus("disconnected");
        setMatrixProvider(undefined);
      }

      if (e.target.value === "true") {
        connect(matrixClient, roomAlias);
      }
    },
    [connect, matrixClient, roomAlias, matrixProvider]
  );

  return (
    <Box textAlign={"right"}>
      {/* TODO: add options to go offline / webrtc, snapshots etc */}
      <LoginButton
        onLogin={onLogin}
        isOpen={isOpen}
        setIsOpen={(flag) => setIsOpen(flag)}
      />
      {matrixClient && (
        <fieldset style={{ margin: 0, padding: 0, border: 0 }}>
          <FormControl>
            <FormControl.Label>Online</FormControl.Label>
            <Radio
              name="online"
              value="true"
              defaultChecked={true}
              onChange={onConnectChange}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Offline (disable sync)</FormControl.Label>
            <Radio
              name="online"
              value="false"
              defaultChecked={false}
              onChange={onConnectChange}
            />
          </FormControl>
        </fieldset>
      )}
      {status === "loading" && (
        <Label variant="small" outline>
          Connecting with Matrix room…
        </Label>
      )}
      {status === "disconnected" && (
        <Label variant="small" outline>
          Disconnected
        </Label>
      )}
      {status === "ok" && (
        <Label
          variant="small"
          outline
          sx={{ borderColor: "success.emphasis", color: "success.fg" }}
        >
          Connected with Matrix room
        </Label>
      )}
      {status === "failed" && (
        <Label
          variant="small"
          outline
          sx={{ borderColor: "danger.emphasis", color: "danger.fg" }}
        >
          Failed. Make sure the user has access to the Matrix room
        </Label>
      )}
    </Box>
  );
}
