const loginbox = document.querySelector('#loginbox');
loginbox.addEventListener('click', ({target}) => {
  if (target.matches('#signup')) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  }
  if (target.matches('.close-modal')) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  }
});

const emailpoint = document.querySelector('#email');
const pwpoint = document.querySelector('#pw');
const pwConfirmpoint = document.querySelector('#pwConfirm');
const nicknamepoint = document.querySelector('#nickname');
const intropoint = document.querySelector('#intro');
const numberpoint = document.querySelector('#number');

async function signup() {
  if (localStorage.getItem('emailchecked') == 1) {
    try {
      const email = emailpoint.value;
      const pw = pwpoint.value;
      const pwConfirm = pwConfirmpoint.value;
      const nickname = nicknamepoint.value;
      const intro = intropoint.value;
      const response = await fetch(`http://localhost:3000/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, pw, pwConfirm, nickname, intro}),
      });
      const result = await response.json();
      console.log(result.message);
      window.location.reload();
      return alert(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('이메일 인증 후에 가입 가능합니다.');
  }
}

async function verify() {
  try {
    const email = emailpoint.value;
    const response = await fetch(`http://localhost:3000/api/authEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const result = await response.json();
    console.log(result.message);
    return alert(result.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function check() {
  const authNumber = Number(numberpoint.value);
  try {
    const response = await fetch(`http://localhost:3000/api/authNumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({authNumber}),
    });
    const result = await response.json();
    const aftermessage = result.message;
    console.log(aftermessage);

    if (aftermessage.includes('성공')) {
      localStorage.setItem('emailchecked', 1);
    } else {
      localStorage.setItem('emailchecked', 0);
    }

    return alert(result.message);
  } catch (error) {
    console.error('Error:', error);
  }
}
