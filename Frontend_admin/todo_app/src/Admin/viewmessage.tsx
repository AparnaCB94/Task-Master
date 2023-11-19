import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  name: string;
  email: string;
  message: string;
  contactDate: string;
}

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:4561/api/contact/admin/messages')
      .then((response: { data: { messages: Message[] }; }) => {
        const messageData: Message[] = response.data.messages;
        setMessages(messageData);
      })
      .catch((error: any) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const toggleMessage = (index: number) => {
    setExpandedMessage((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.slice(0).reverse().map((message, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => toggleMessage(index)}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.message && message.message.length > 50
                      ? `${message.message.slice(0, 50)}...`
                      : message.message}</td>
                    <td>{message.contactDate}</td>
                  </tr>
                  {expandedMessage === index && (
                    <tr>
                      <td colSpan={4}>{message.message}</td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesPage;
