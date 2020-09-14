const URL = 'http://localhost:8081';
let users = [];
let currentEntry;


/*const loginUsser = (login) => {
    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    }).then((result) => {
        result.json().then((login) => {
            console.log(JSON.stringify(login));
            users.push(login);
        });
    });
};*/

const loginUser = async (login) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(login)
        })
            .then(async res => {
                if (res.status === 200) {
                    localStorage.setItem('bearer', res.headers.get('Authorization').split('Bearer ')[1]);
                    /*toggleLogin('none');
                    entries = await getEntries();
                    categories = await getCategories();
                    toggleWorkTimeOverview();*/
                } else reject();
            })
            .catch(err => reject(err));
    });
};

const register = async (register) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/users/sign-up`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(register)
        })
            .then(res => {
                if (res.status === 200) {
                    //toggleRegister();
                    loginUser(register);
                    resolve(true);
                } else reject();
            })
            .catch(err => reject(err));
    });
};

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const login = {};
    login['username'] = formData.get('usernameInput');
    login['password'] = formData.get('passwordInput');

    loginUser(login);


}

const getHeaders = () => {
    if (localStorage.getItem('bearer') === null) return {
        'Content-Type': 'application/json'
    };
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('bearer')}`
    }
};

document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', saveForm);
});