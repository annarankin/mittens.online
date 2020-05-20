window.onload = () => {
  const INPUT_ID = 'text-entry'
  const RESULTS_ID = 'results'
  const RIGHT_MITTEN_ID = 'right-mitten'
  const LEFT_MITTEN_ID = 'left-mitten'
  const input = document.getElementById(INPUT_ID)
  const results = document.getElementById(RESULTS_ID)
  const rightMitten = document.getElementById(RIGHT_MITTEN_ID)
  const leftMitten = document.getElementById(LEFT_MITTEN_ID)
  const TYPING_CLASS = 'typing'

  const alphaNumericKeys = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    "zxcvbnm".split(""),
  ];
  const allKeys = alphaNumericKeys.reduce(
    (prev, current) => prev.concat(current),
    []
  );

  const randomNumberMachine = () => Math.ceil(Math.random() * 100);
  const moveRightOrDown = (index, limit) => Math.min(index + 1, limit);
  const moveLeftOrUp = (index) => Math.max(index - 1, 0);

  const onTypeHandler = () => {
    rightMitten.classList.toggle(TYPING_CLASS)
    leftMitten.classList.toggle(TYPING_CLASS)
  }

  const nearbyKey = (originalKey) => {
    const rowIndex = alphaNumericKeys.findIndex(
      (row) => row.indexOf(originalKey) > -1
    );
    if (rowIndex < 0) { return '' }

    const keyIndex = alphaNumericKeys[rowIndex].indexOf(originalKey);
    const randomNumber = randomNumberMachine();
    let newRowIndex = rowIndex;
    let newKeyIndex = keyIndex;

    if (randomNumber > 60) {
      return ''
    } else if ((randomNumber <= 60 && randomNumber > 48)) {
      newRowIndex = moveLeftOrUp(rowIndex);
    } else if ((randomNumber <= 48 && randomNumber > 37)) {
      newKeyIndex = moveRightOrDown(
        keyIndex,
        alphaNumericKeys[rowIndex].length - 1
      );
    } else if (randomNumber <= 37 && randomNumber > 26) {
      newKeyIndex = moveLeftOrUp(keyIndex);
    } else if (randomNumber <= 26 && randomNumber > 14) {
      newRowIndex = moveRightOrDown(rowIndex, alphaNumericKeys.length - 1);
    } else {
      return originalKey
    }
    return alphaNumericKeys[newRowIndex][newKeyIndex]
  };

  hotkeys.filter = function(event) {
    var id = (event.target || event.srcElement).id;
    return id === INPUT_ID
  }

  hotkeys(allKeys.join(","), function (_event, handler) {
    const result = nearbyKey(handler.key) || ''
    input.value += result
  });

  input.addEventListener('change', () => {
    results.innerHTML = input.value
    onTypeHandler()
  })
}

