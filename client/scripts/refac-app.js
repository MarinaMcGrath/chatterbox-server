// YOUR CODE HERE:
const app = {
  init: function() {
    this.server = 'http://127.0.0.1:3000/classes/messages';
    this.allData = [];
    this.allLobbies = [];
    this.eventListeners(); 

    this.fetch(function() {
        app.allData.forEach(msg => app.allLobbies.push(msg.roomname));
        app.allLobbies = _.uniq(app.allLobbies);
        app.allLobbies.forEach(room => {
            if (room !== undefined) {
                app.renderRoom(room);
            }
        });
    });

    this.fetchMessages = setInterval(function() {
        app.fetch(function() {
            app.clearMessages();
            let append = app.allData.filter(message => message.roomname === $('#roomSelect').val());
            append.forEach(element => app.renderMessage(element));
        });
    }, 500);
  },
  eventListeners: function() {
    $('.username').click(function(e) { 
        app.handleUsernameClick($(this)); 
    });

    $('#submit, .submit').on('submit', function() { 
        app.handleSubmit(); 
    }); 
    $('#submit, .submit').on('click', function() { 
        app.handleSubmit(); 
        $('#message').val('');
    });

    $('#addLobby').click(function() {
        let newRoom = $('#newLobby');
        app.renderRoom(newRoom.val());
        $('#roomSelect').val(newRoom.val());
        newRoom.val('');
    });
    $('#removeLobby').click(function() {
        let allOf = app.allData.filter(each => each.roomname === $('#roomSelect').val());
        allOf.forEach(each => {
            $.ajax({
                url: `${app.server}/${each.objectId}`,
                type: 'DELETE',
                success: data => console.log('delete successful'), 
                fail: () => console.error('Error on DELETE request to server')
            });
        });
        Array.from($('#roomSelect').children()).forEach((e, i) => {
            if (e.value === $('#roomSelect').val()) {
                $('#roomSelect').children()[i].remove();
            }
        });
    });

    $('#message').on('keyup', function() {
        if ($(this).val() !== '') {
            $('#send').addClass('pulse')        
        } else {
            $('#send').removeClass('pulse')  
        }
    });
  },
  send: function(data) {
    $.ajax({
      url: app.server,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(d) {}, 
      fail: () => console.error('Error on POST request to server')
    });
  },
  fetch: function(callback = () => {}) {
    $.ajax({
        url: app.server,
        type: 'GET',
        // data: { order: '-createdAt' },
        success: function(d) {
            app.allData = d.results; 
            callback();       
        }, 
        fail: () => console.error('Error on GET request to server')
    });
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    message = sanitize(message);
    $('#chats').append(
        $('<div>').addClass('row col s12 m6 card darken-1')
            .append(
                $('<div>').addClass('card-content')
                    .append($(`<span>@${message.username}</span>`)
                        .addClass('username')
                            .append($('<i class="material-icons person-av">person_pin</i>')))
                    .append($(`<span>${moment(message.createdAt).fromNow()}</span>`)
                        .addClass('date right'))
                    .append($(`<p>${message.text}</p>`)
                        .addClass('text'))
                    .append($(`<span>/${message.roomname}</span>`)
                        .addClass('roomname')))
            );
  },
  renderRoom: function(room) {
    $('#roomSelect').prepend(
        $(`<option value=${room}>${room}</option>`));
  },
  handleUsernameClick: function(e) {
    // add a friend.?
  },
  handleSubmit: function() {
    let details = {
        username: window.location.search.split('?username=').join(''),
        text: $('#message').val(),
        roomname: $('#roomSelect').val(),
        createdAt: new Date()
    };
    this.renderMessage(details);
    this.send(details);
  }
}; 

const sanitize = function(un) {
    if (typeof un === 'object') {
        let sanitizedOb = {};
        for (let key in un) {
            sanitizedOb[sanitize(key)] = sanitize(un[key])
        }
        return sanitizedOb;
    } else if (typeof un === 'string') {
        return un
                 .split('<').join(' ')
                 .split('>').join(' ')
                 .split('&lt').join(' ')
                 .split('&gt').join(' ');
    }
};

app.init();

