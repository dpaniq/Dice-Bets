import {Stack} from '../intefaces/interface'

function randomCube(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function randomCubes(): number[] {
  return [randomCube(), randomCube(), randomCube()];
}

export function toFormChipOccuranceInStack(stack: number): Stack[] {
  const result = [];
  const chips = [1000, 500, 100, 25, 5, 1];
  let occurance: number;
  let leftover: number = stack;

  for (const i of chips) {
    occurance = Math.floor(leftover / +i);
    leftover = leftover - occurance * +i;

    if (occurance) {
      result.push({ name: +i, occurance });
    }
  }
  return result.sort();
}