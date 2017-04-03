export const notify = (title, options, events) => {
  let notification = null;
  const notifyItem = () => {
    notification = new Notification(title, options);
    Object.keys(events).forEach((event) => {
      notification[event] = events[event];
    });
  };

  if (!('Notification' in window)) { // Let's check if the browser supports notifications
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') { // Let's check whether notification permissions have already been granted
    // If it's okay let's create a notification
    notifyItem();
  } else if (Notification.permission !== 'denied') { // Otherwise, we need to ask the user for permission
    Notification.requestPermission((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        notifyItem();
      }
    });
  }

  return notification;
};

export const close = (notification) => {
  notification.close();
};
