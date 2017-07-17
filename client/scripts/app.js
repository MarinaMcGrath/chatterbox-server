// // YOUR CODE HERE:
// window.allLobbies = [];
// const app = {
//   init: function() {
//     $('.username').click(function(e) { 
//         app.handleUsernameClick($(this)); 
//     });
//     $('#submit, .submit').on('submit', function() { 
//         app.handleSubmit(); 
//     }); 
//     $('#submit, .submit').on('click', function() { 
//         app.handleSubmit(); 
//     }); 
//     app.fetch(true);
//     window.fetchMessages = setInterval(function() {
//         app.fetch();
//     }, 800);
//     window.fetchMessages = setInterval(function() {
//         app.clearMessages();
//         let append = app.allData.filter(message => 
//                         message.roomname === $('#roomSelect').val());
//         append.forEach((element) => 
//             app.renderMessage(element));
//     }, 1500);
//   },
//   server: 'http://parse.opspark.hackreactor.com/chatterbox/classes/messages',
//   allData: ['lmazo'],
//   send: function(data) {
//     $.ajax({
//       url: app.server,
//       type: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify(data),
//       success: function(d) {
//       }, 
//       fail: function() {
//         console.error('err on post req to server');
//       }
//     });
//   },
//   fetch: function(first, data) {
//     $.ajax({
//         url: app.server,
//         type: 'GET',
//         data: {order: "-createdAt"},
//         success: function(d) {
//             app.allData = d.results;        
//             if (first) {
//                 app.allData.forEach(msg => { 
//                     window.allLobbies.push(msg.roomname);
//                 });
//                 window.allLobbies = _.uniq(window.allLobbies);
//                 window.allLobbies.forEach(room => { 
//                     app.renderRoom(room);
//             });
//             }
//         }, 
//         fail: function() {
//             console.error('err on get req to server');
//         }
//     });
//   },
//   clearMessages: function() {
//     $('#chats').empty();
//   },
//   renderMessage: function(message) {
//     let $msg = $('<div>').addClass('message');
//     $msg.append($(`<span>${moment(message.createdAt).fromNow()}</span>`).addClass('date'))
//         .append($(`<span>@${message.username}</span>`).addClass('username'))
//         .append($(`<p>${message.text}</p>`).addClass('message'))
//         .append($(`<span>/${message.roomname}</span>`).addClass('roomname'));
//     $('#chats').prepend($msg);
//   },
//   renderRoom: function(room) {
//     $('#roomSelect').prepend($(`<option value=${room}>${room}</option>`));
//   },
//   handleUsernameClick: function(e) {
//     // add a friend.?
//   },
//   handleSubmit: function() {
//     let details = {
//         username: window.location.search.split('?username=').join(''),
//         text: $('#message').val(),
//         roomname: $('#roomSelect').val(),
//         createdAt: new Date()
//     };
//     this.renderMessage(details);
//     this.send(details);
//   }
// }; 

// const sanitize = function(str) {
//     return str;
// };

// app.init();

