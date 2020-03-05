// flagがfalseのときバツのターン、trueのときマルのターン
let flag = false;
// ターン数カウンター
let counter = 9;

// square を取得
const squares = document.querySelectorAll('.square');
// Array に変換　※IE11対策
const squaresArray = [].slice.call(squares);

// message-list のli  取得
const messages = document.querySelectorAll('.message-list li');
// Array に変換
const messagesArray = [].slice.call(messages);

// リセットボタン取得
const resetBtn = document.getElementById('reset-btn');

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

// タテ・ヨコ・ナナメの列を配列化
function filterById(targetArray, idArray) {
  return targetArray.filter(function(e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  });
}

const line1 = filterById(squaresArray, ['1-1', '1-2', '1-3']);
const line2 = filterById(squaresArray, ['2-1', '2-2', '2-3']);
const line3 = filterById(squaresArray, ['3-1', '3-2', '3-3']);
const line4 = filterById(squaresArray, ['1-1', '2-1', '3-1']);
const line5 = filterById(squaresArray, ['1-2', '2-2', '3-2']);
const line6 = filterById(squaresArray, ['1-3', '2-3', '3-3']);
const line7 = filterById(squaresArray, ['1-1', '2-2', '3-3']);
const line8 = filterById(squaresArray, ['1-3', '2-2', '3-1']);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

// 勝敗判定
function isWinner(symbol) { 
  const result = lineArray.some(function (line) {
    const subResult = line.every(function (square) {
      if (symbol === 'maru') {
        return square.classList.contains('js-maru-checked');
      } else 
      if (symbol === 'batsu') {
        return square.classList.contains('js-batsu-checked');
      }
    });
    // trueを返したlineをwinningLineに代入
    if (subResult) { winningLine = line }
    
    return subResult;
  });
  return result;
}

// ゲーム終了時の処理
function gameOver() {
  // 全てのマスをクリックできないようにする
  squaresArray.forEach(function (square) {
    square.classList.add('js-unclickable');
  });
  // 勝ったときのマス目をハイライトする
  if (winningLine) {
    winningLine.forEach(function (square) {
      square.classList.add('js-highLight');
    });
  }
  // リセットボタン表示
  resetBtn.classList.remove('js-hidden');
}

// マス目をクリックしたときにイベント発火
squaresArray.forEach(function (square) {
  square.addEventListener('click', function () {

    if (flag === true) {
      square.classList.add('js-maru-checked');
      square.classList.add('js-unclickable');
      
      // マル勝利判定
      if (isWinner('maru')) {
        setMessage('maru-win');
        gameOver();
        return;
      }
      
      setMessage('batsu-turn');
      flag = false;

    } else {
      square.classList.add('js-batsu-checked');
      square.classList.add('js-unclickable');

      // バツ勝利判定
      if (isWinner('batsu')) {
        setMessage('batsu-win');
        gameOver();
        return;
      }

      setMessage('maru-turn');
      flag = true;
    }
    
    counter--;
    // 引き分け
    if (counter === 0) {
      setMessage('draw');
      gameOver();
    }
 
  });

  function initGame(){
    flag = false;
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
      square.classList.remove('js-maru-checked');
      square.classList.remove('js-batsu-checked');
      square.classList.remove('js-unclickable');
      square.classList.remove('js-highLight');
    });
    setMessage('batsu-turn');
    resetBtn.classList.add('js-hidden');
  }

  resetBtn.addEventListener('click', function () {
    initGame();
  });
});