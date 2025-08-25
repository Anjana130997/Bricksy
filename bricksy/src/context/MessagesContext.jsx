// UPDATED & HARDENED: prevents "undefined" keys, stable IDs, dev helpers preserved
import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const MessagesContext = createContext();
export const useMessages = () => useContext(MessagesContext);

export function MessagesProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('messages', {});

  // one-time cleanup for legacy 'undefined' key
  useEffect(() => {
    if (!conversations) return;
    if (Object.prototype.hasOwnProperty.call(conversations, 'undefined')) {
      // eslint-disable-next-line no-unused-vars
      const { undefined: _drop, ...rest } = conversations;
      setConversations(rest);
    }
  }, []); // once

  const sendMessage = (propertyId, text, from = 'user') => {
    const pid = String(propertyId || '');
    const trimmed = String(text || '').trim();
    if (!pid || !trimmed) return;

    const ts = Date.now();
    const msg = { id: `${pid}-${ts}`, from, text: trimmed, ts };

    setConversations((prev) => {
      const next = { ...(prev || {}) };
      const list = Array.isArray(next[pid]) ? next[pid].slice() : [];
      list.push(msg);
      next[pid] = list;
      return next;
    });
  };

  const simulateOwnerReply = (propertyId) => {
    const pid = String(propertyId || '');
    if (!pid) return;
    setTimeout(() => {
      sendMessage(pid, "Thanks for reaching out! I'll get back to you soon.", 'owner');
    }, 600);
  };

  // Dev helpers (optional)
  const devResetMessages = () => setConversations({});
  const devRemoveUndefinedKey = () =>
    setConversations((prev) => {
      if (!prev || !prev.undefined) return prev;
      // eslint-disable-next-line no-unused-vars
      const { undefined: _drop, ...rest } = prev;
      return rest;
    });

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        sendMessage,
        simulateOwnerReply,
        devResetMessages,
        devRemoveUndefinedKey,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
