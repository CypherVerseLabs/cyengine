import { useEffect, useMemo, useState } from "react";
import { DataConnection, MediaConnection, Peer } from "peerjs";
import { isLocalNetwork } from "./local";
import { LocalSignaller } from "./signallers/LocalSignaller";
import { CyphrSignaller } from "./signallers/CyphrSignaller";
import { useWaving } from "./wave";
import { Signaller, SignallerConfig } from "./signallers";
import { Channels, useChannels } from "./channels";
import { useVoiceConnections } from "./voice";
import { getCyphrIceServers } from "./ice";

export type ConnectionState = {
  connected: boolean;
  connect: (config?: ConnectionConfig) => Promise<void>;
  connections: Map<string, DataConnection>;
  mediaConnections: Map<string, MediaConnection>;
  localStream: MediaStream | undefined;
  disconnect: () => void;
  voice: boolean;
  setVoice: (v: boolean) => void;
  setInputDevice: (deviceId: string) => void;
} & Pick<Channels, "useChannel">;

export type ConnectionConfig = {
  iceServers?: RTCIceServer[];
  voice?: boolean;
  inputDeviceId?: string;
} & SignallerConfig;

export const useConnection = (
  externalConfig: ConnectionConfig
): ConnectionState => {
  const [connected, setConnected] = useState(false);
  const [peer, setPeer] = useState<Peer>();
  const connections = useMemo(() => new Map<string, DataConnection>(), []);
  const [signaller, setSignaller] = useState<Signaller>();

  const channels = useChannels(connections);

  const registerConnection = (conn: DataConnection) => {
    connections.set(conn.peer, conn);

    conn.on("open", () => {
      console.log("connection opened with peer", conn.peer);
      channels.greet(conn);
    });

    conn.on("data", (message: any) => {
      channels.receive({ conn, ...message });
    });

    conn.on("close", () => {
      console.log("connection closed with peer", conn.peer);
      connections.delete(conn.peer);
    });

    conn.on("error", (err) => {
      console.log("connection error with peer", conn.peer, err);
      connections.delete(conn.peer);
    });
  };

  const connect = async (config?: ConnectionConfig) => {
    console.log("connecting to network");

    if (peer || connected) {
      console.error("already connected or peer exists");
      return;
    }

    const finalConfig = { ...externalConfig, ...config };

    // -------------------------
    // ICE FETCH (TURN + STUN)
    // -------------------------
    if (!finalConfig.iceServers) {
      try {
        const servers = await getCyphrIceServers(
          finalConfig.host ?? "https://cypherverse.space"
        );

        if (servers?.length) {
          finalConfig.iceServers = servers;
        }
      } catch (err) {
        console.warn("ICE fetch failed, using PeerJS defaults", err);
      }
    }

    // -------------------------
    // PeerJS CONFIG (FIXED)
    // -------------------------
    const peerConfig: any = {};

    if (finalConfig.iceServers) {
      peerConfig.config = {
        iceServers: finalConfig.iceServers,
      };
    }

    // IMPORTANT FIX:
    const p = new Peer(undefined as any, peerConfig);

    p.on("connection", registerConnection);
    p.on("close", disconnect);

    p.on("error", (err) => {
      console.error("peer error:", err);
    });

    p.on("open", async () => {
      setConnected(true);

      const s =
        isLocalNetwork() && !finalConfig.host
          ? new LocalSignaller(p)
          : new CyphrSignaller(p, finalConfig);

      setSignaller(s);

      const ids = await s.join();

      console.log("found peers:", ids);

      if (!ids?.length) return;

      ids.forEach((id) => {
        if (id === p.id) return;
        const conn = p.connect(id);
        registerConnection(conn);
      });

      setPeer(p);
    });
  };

  const disconnect = () => {
    console.log("disconnecting from network");

    if (!peer) return;

    try {
      signaller?.leave().catch(() => {});

      connections.forEach((conn) => conn.close());

      if (!peer.destroyed) {
        peer.disconnect();
        peer.destroy();
      }
    } catch (err) {
      console.error(err);
    }

    setConnected(false);
    setPeer(undefined);
    setSignaller(undefined);
  };

  useWaving(1, signaller, disconnect);

  const [voice, setVoice] = useState(!!externalConfig.voice);
  const [inputDeviceId, setInputDevice] = useState<string>();

  useEffect(() => {
    setVoice(!!externalConfig.voice);
  }, [externalConfig.voice]);

  const { mediaConnections, localStream } = useVoiceConnections(
    voice,
    peer,
    connections,
    inputDeviceId
  );

  return {
    connected,
    connect,
    disconnect,
    connections,
    useChannel: channels.useChannel,
    voice,
    setVoice,
    localStream,
    mediaConnections,
    setInputDevice,
  };
};