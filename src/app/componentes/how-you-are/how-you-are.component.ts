import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-how-you-are',
  imports: [CommonModule],
  templateUrl: './how-you-are.component.html',
  styleUrl: './how-you-are.component.css',
})
export class HowYouAreComponent implements OnInit {
  title: string = '';

  questions: any;
  questionsSelect: any;

  answers: string[] = [];
  answersSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;

      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionsSelect = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  buttonPress(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionsSelect = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);

      this.finished = true;

      this.answersSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
