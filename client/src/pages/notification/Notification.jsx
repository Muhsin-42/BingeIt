import { useEffect, useState } from 'react';
import NotificationCard from './NotificationCard';
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';
import socket from '../../socket.io/socket.io';

function Notification() {
  const currentUserRedux = useSelector(state => state.user);
  const token = useSelector(state => state.token);
  const [notifications, setNotifications] = useState([]);
  const [socketNotification, setSocketNotification] = useState({});

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setSocketNotification(data);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(socketNotification).length) {
      setNotifications((prev) => [socketNotification, ...prev]);
    }
  }, [socketNotification]);

  const makeNotificationSeen = async () => {
    try {
      const response = await axios.patch(`api/notification/make-seen/${currentUserRedux._id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.log('makeNotificationError => ', error);
    }
  }

  const getNotifications = async () => {
    try {
      const response = await axios.get(`api/notification/notifications/${currentUserRedux._id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.log('getNotification error => ', error);
    }
  }

  useEffect(() => {
    getNotifications();
    setTimeout(() => {
      makeNotificationSeen();
    }, 20000);
  }, []);

  return (
    <div>
      <h1 className='text-secondary m-5'>Unread Notifications</h1>
      {
        notifications?.map((notification) => {
          return (
            !notification.read && <NotificationCard key={notification._id} notification={notification} />
          );
        })
      }
      <h1 className='text-secondary mx-5'>Read Notifications</h1>
      {
        notifications?.map((notification) => {
          return (
            notification.read && <NotificationCard key={notification._id} notification={notification} />
          );
        })
      }
    </div>
  );
}

export default Notification;