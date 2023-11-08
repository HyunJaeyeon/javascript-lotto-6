import Lotto from '../Lotto.js';
import Winner from './Winner.js';
import modifiers from '../utils/modifiers.js';

class WinnerMaker {
  #lottos; // 발행한 로또 받기

  #winner;

  constructor(lottos) {
    this.#lottos = lottos;
    this.#winner = new Winner();
  }

  #winningLotto = new Lotto('1,2,3,4,5,12', '7'); // 로또값 입력

  // 일치 개수 확인
  #checkNumbers(lotto) {
    const numbers = modifiers.duplicates(
      lotto,
      this.#winningLotto.getNumbers(),
    );
    return numbers.length;
  }

  // 보너스 확인
  #checkBonus(lotto) {
    return modifiers.isDuplicate(lotto, this.#winningLotto.getBonus());
  }

  // 등수 저장
  #getWinner() {
    this.#lottos.map((lotto) =>
      this.#winner.switchNumber(
        this.#checkNumbers(lotto),
        this.#checkBonus(lotto),
      ),
    );
  }

  getResult() {
    this.#getWinner();
    return this.#winner.getResult();
  }
}

export default WinnerMaker;

// const winnermaker = new WinnerMaker([
//   ['1', '2', '3', '4', '39', '44'],
//   ['1', '2', '3', '0', '4', '5'],
// ]);

// console.log(winnermaker.getResult());
