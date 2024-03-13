import Echo from 'laravel-echo';
import axiosClient from '../axios-client';

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'dc6423124445d7b08415',
  cluster: 'ap1',
  forceTLS: true,
  authEndPoint: "/pusher/auth",
  encrypted: true,
  authorizer: (channel) => {
    return {
      authorize: (socketId, callback) => {
        axiosClient.post('broadcasting/auth', {
          socket_id: socketId,
          channel_name: channel.name
        })
          .then(response => {
            callback(false, response.data);
          })
          .catch(error => {
            callback(true, error);
          });
      }
    }
  }
});

export default echo;