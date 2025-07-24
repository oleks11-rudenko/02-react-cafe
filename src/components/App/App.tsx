import { useState } from "react";
import css from "./App.module.css";
import { type Votes as VoteType } from "../../types/votes";
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteStats from "../VoteStats/VoteStats";
import VoteOptions from "../VoteOptions/VoteOptions";
import Notification from "../Notification/Notification";

export default function App() {
  const [votes, setVotes] = useState<VoteType>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const handleVote = (type: keyof VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0 && true}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
