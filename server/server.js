const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const sessions = new Map();

app.get("/sessions/get_ice", (req, res) => {
  res.json({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });
});

app.post("/sessions/join", (req, res) => {
  const { peer_id, session_id, world } = req.body;

  const roomId = session_id || world;

  if (!roomId) {
    return res.status(400).json({
      message: "session_id or world required",
    });
  }

  if (!sessions.has(roomId)) {
    sessions.set(roomId, {
      peers: new Set(),
      lastSeen: new Map(),
    });
  }

  const room = sessions.get(roomId);

  room.peers.add(peer_id);
  room.lastSeen.set(peer_id, Date.now());

  res.json({
    session_id: roomId,
    peer_ids: [...room.peers],
  });
});

app.post("/sessions/leave", (req, res) => {
  const { peer_id, session_id } = req.body;

  const room = sessions.get(session_id);

  if (room) {
    room.peers.delete(peer_id);
    room.lastSeen.delete(peer_id);

    if (room.peers.size === 0) {
      sessions.delete(session_id);
    }
  }

  res.json({
    success: true,
  });
});

app.post("/sessions/wave", (req, res) => {
  const { peer_id, session_id } = req.body;

  const room = sessions.get(session_id);

  if (!room) {
    return res.status(404).json({
      message: "session not found",
    });
  }

  room.lastSeen.set(peer_id, Date.now());

  res.json({
    success: true,
  });
});

setInterval(() => {
  const now = Date.now();

  for (const [sessionId, room] of sessions.entries()) {
    for (const [peerId, lastSeen] of room.lastSeen.entries()) {
      if (now - lastSeen > 30000) {
        room.peers.delete(peerId);
        room.lastSeen.delete(peerId);
      }
    }

    if (room.peers.size === 0) {
      sessions.delete(sessionId);
    }
  }
}, 10000);

app.listen(3001, () => {
  console.log("Cyphr Signalling Server running on port 3001");
});