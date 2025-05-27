async function createChat() {
  const res = await fetch(BASE_URL + '/chats', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject({ status: res.status, data });
  }
  return data;
}

async function sendChatMessage({message, apiUrl}) {
  // Set up the url to send the message.
  const url = apiUrl + '/chat/' + message;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'include'
  });
  if (!res.ok) {
    return Promise.reject({ status: res.status, data: await res.text() });
  }

  return await res.text();
}

export default {
  createChat,
  sendChatMessage
};
