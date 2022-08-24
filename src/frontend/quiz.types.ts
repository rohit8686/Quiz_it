export type QuizData = {
    React : QuizQuestion[],
    HTML : QuizQuestion[],
    CSS : QuizQuestion[],
    JS : QuizQuestion[],
}

export type QuizQuestion = {
    _id : number,
    answer : string,
    option1 : string,
    option2 : string,
    option3 : string,
    option4 : string,
    question : string
    img ?: string,
}
