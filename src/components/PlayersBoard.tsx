// src/components/PlayersBoard.tsx
import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useState } from "react";
import "../components/PlayBoard.css";

interface Player {
  id: string;
  username: string;
  loginTime: string;
}

const PLAYER_SUBSCRIPTION = gql`
  subscription {
    fetchPlayers {
      id
      username
      loginTime
    }
  }
`;

export default function PlayersBoard() {
  const [players, setPlayers] = useState<Player[]>([]);

  const { data, loading, error } = useSubscription(PLAYER_SUBSCRIPTION, {
    onData: ({ data }) => {
      if (data.data?.fetchPlayers) {
        setPlayers((prev) => [...prev, data.data.fetchPlayers]);
      }
    },
  });

  if (error) return <div>Error! {error.message}</div>;

  return (
    <div className="board-container">
      <div className="player-display">
        <h2 className="header">Online Players</h2>
        <div className="list-players">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{player.username}</h3>
                <p className="text-sm text-gray-500">
                  Joined: {new Date(player.loginTime).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {players.length === 0 && (
            <p className="text-gray-500 text-center">No players online</p>
          )}
        </div>
      </div>
    </div>
  );
}
