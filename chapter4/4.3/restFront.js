const getUser = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        
        
        if (xhr.status === 200) {
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map((key) => {
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];

                var edit = document.createElement('button');
                edit.textContent = 'Edit';
                edit.addEventListener('click', () => {
                    var name = prompt('Enter a name to change');
                    if (!name) {
                        return alert('Name is mandatory');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);                    
                        }
                    };
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({ name: name }));
                });

                var remove = document.createElement('button');
                remove.textContent = 'Remove';
                remove.addEventListener('click', () => {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });

                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);            
        }
    };
    xhr.open('GET', '/users');
    xhr.send();
};

window.onload = getUser;

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var name = e.target.username.value;
    if (!name) {
        return alert('Enter a user name');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        console.log("status code: ", xhr.status);
        if (xhr.status === 201) {
            console.log(xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ name: name }));
});