// flagがfalseのときバツのターン、trueのときマルのターン
let flag = false;

// square を取得
const squares = document.querySelectorAll('.square');
// Array に変換　※IE11対策
const squaresArray = [].slice.call(squares);

// message-list のli  取得
const messages = document.querySelectorAll('.message-list li');
// Array に変換
const messagesArray = [].slice.call(messages);

// メッセージ切り替え関数
function setMessage(id) {
  messagesArray.forEach(function (message) {
    if (message.id === id) {
      message.classList.remove('js-hidden');
    } else {
      message.classList.add('js-hidden');
    }
  }); 
}

// マス目をクリックしたときにイベント発火
squaresArray.forEach(function (square) {
  square.addEventListener('click', function () {

    if (flag === true) {
      square.classList.add('js-maru-checked');
      square.classList.add('js-unclickable');
      setMessage('batsu-turn');
      flag = false;

    } else {
      square.classList.add('js-batsu-checked');
      square.classList.add('js-unclickable');
      setMessage('maru-turn');
      flag = true;
    }
  });
});