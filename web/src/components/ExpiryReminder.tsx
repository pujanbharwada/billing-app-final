import { useEffect } from 'react';

import { useSubscription } from '../context/SubscriptionContext';

import { useToast } from './Toast';

const MAX_PER_DAY = 2;

const RECHECK_MS = 6 * 60 * 60 * 1000;

const KEY = 'renewalReminder';

function todayKey(): string {
  return new Date().toDateString();
}

export function ExpiryReminder() {

  const { status, daysLeft } = useSubscription();

  const { toast } = useToast();

  const eligible =
    (status === 'trial' || status === 'active') &&
    daysLeft !== -1 &&
    daysLeft <= 2;
  useEffect(() => {
    if (!eligible) return;

    function maybeRemind() {

      let state = { date: todayKey(), count: 0 };
      try {

        const raw = localStorage.getItem(KEY);
        if (raw) state = JSON.parse(raw);
      } catch {
      }
      if (state.date !== todayKey()) state = { date: todayKey(), count: 0 };
      if (state.count >= MAX_PER_DAY) return;

      const msg =
        daysLeft <= 0
          ? '⏰ Your subscription ends today — please renew to keep billing.'
          : `⏰ Your subscription ends in ${daysLeft} day${
              daysLeft === 1 ? '' : 's'
            } — please renew soon.`;
      toast(msg, 'error');
      state.count += 1;
      localStorage.setItem(KEY, JSON.stringify(state));
    }
    maybeRemind();

    const id = setInterval(maybeRemind, RECHECK_MS);
    return () => clearInterval(id);
  }, [eligible, daysLeft, toast]);
  return null;
}
