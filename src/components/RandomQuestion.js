import React, { useState, useEffect } from 'react';
import './RandomQuestion.css';

const RandomQuestion = ({ setCurrentTopic}) => {
  const [loading, setLoading] = useState(false);
  const MAX_QUESTIONS = 20;  // максимальное число вопросов, которое мы хотим хранить
  const KEEP_QUESTIONS = 10; // если превышено, оставляем только последние N вопросо

  // При монтировании инициализируем localStorage, если ещё нет сохранённых вопросов
  useEffect(() => {
    if (!localStorage.getItem('generatedQuestions')) {
      localStorage.setItem('generatedQuestions', JSON.stringify([]));
    }
  }, []);

  const getRandomQuestion = async () => {
    setLoading(true);
    try {
      // Извлекаем список ранее сгенерированных вопросов из localStorage
      const previousQuestionsJSON = localStorage.getItem('generatedQuestions');
      let previousQuestions = previousQuestionsJSON ? JSON.parse(previousQuestionsJSON) : [];
      // Если количество вопросов превышает максимальное, оставляем только последние KEEP_QUESTIONS
      if (previousQuestions.length >= MAX_QUESTIONS) {
        previousQuestions = previousQuestions.slice(-KEEP_QUESTIONS);
        localStorage.setItem('generatedQuestions', JSON.stringify(previousQuestions));
      }
      // Формируем строку с предыдущими вопросами (ограничим количество, чтобы не превысить лимит промпта)
      const previousQuestionsText = previousQuestions.slice(-5).join('\n');

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are an expert in creating tasks for the Norskprøven exam, with a focus on tasks that require writing texts (such tasks that may appear on the Norwegian language test Norskprøven). Your task is to generate a unique, diverse, simple, and clear interrogative prompt that encourages the candidate to write a text. The question must be formulated in Norwegian and contain only the question itself, without any additional explanations, instructions, or comments. The question must be clear and unambiguous, and must adhere to ethical standards by avoiding any provocative, racist, discriminatory, or otherwise unethical moral dilemmas. Example tasks: 'Bør kjøttforbruket reduseres for å redde miljøet?' or 'Er økonomisk vekst forenlig med bærekraftig utvikling?', 'Bør butikker være åpne på søndager?', 'Bør ytringsfriheten ha grenser?', 'Bør universell grunninntekt innføres?', 'Bør offentlig transport være gratis for alle?', 'Bør vestlige land ha en mer restriktiv innvandringspolitikk?', 'Bør statsborgerskap gis automatisk til barn født i et land?', 'Bør regjeringer forby privatbiler i storbyer for å bekjempe klimakrisen?', 'Hva synes du om at mange velger å ikke få barn?', 'Hva synes du om at flere mennesker velger å jobbe frilans i stedet for fast jobb?', 'Hva synes du om at stadig flere jobber kan gjøres hjemmefra?', 'Bør sosiale medier ha aldersgrense?', ' Bør fysisk aktivitet være obligatorisk på arbeidsplassen?'. Use a variety of topics, such as politics, social life, refugees, culture, ecology, school, technology, health, medicine, education, migration, artificial intelligence, economic inequality and social justice, and other similar subjects. Use these and other diverse topics on which a question for the Norskprøven may be based. The question must be simple enough so that it does not require deep factual, technical, or scientific knowledge. In other words, the candidate should be able to write a text without having any specialized or expert-level background.And do not repeat or rephrase any of the following previously generated questions: ${previousQuestionsText}.Use unique, non-repetitive questions on diverse topics. If the question you intend to generate matches in theme and meaning with any of these questions: ${previousQuestionsText}, then create a question on a completely different topic instead.It is very important!If you see that the question you want to provide is the same as any of these questions: ${previousQuestionsText} , create COMPLETELY DIFFERENT question(TRY ANOTHER TOPIC WITH COMPLETELY DIFFERENT MEANING)!For example: if you see in these list of previous questions some topics about schools, education, or technologies then create topic for example about politics or immigration or medicine, i mean something that is completely different comparing to these previous questions: ${previousQuestionsText}. I need variety and diversity. If this list ${previousQuestionsText} is empty then create any question you want. Your questions need to be interesting, uniq and to encourage the candidate to write a text.`
            },
            {
              role: "user",
              content: "Generate a question for writing a text in Norwegian."
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setCurrentTopic(`Feil: ${errorData.error ? errorData.error.message : "Ukjent feil"}`);
      } else {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          const generatedQuestion = data.choices[0].message.content.trim();
          setCurrentTopic(generatedQuestion);
        } else {
          setCurrentTopic("Kunne ikke hente et gyldig spørsmål fra API.");
        }
      }
    } catch (error) {
      console.error("Feil under generering av spørsmål:", error);
      setCurrentTopic("Det oppstod en feil.. Vennligst prøv igjen senere.");
    }
    setLoading(false);
  };


  return (
    <div className="random-question">
      <h2>Få tema fra KI</h2>
      <p className='random-question-description'>🤔 Vet du ikke hva du skal skrive om? Generer et tilfeldig spørsmål! </p>
      <p>Trykk på knappen for å få et tema fra KI</p>
      <button onClick={getRandomQuestion} disabled={loading}>
  {loading ? "Laster..." : "Generer tema"}
</button>
    </div>
  );
};

export default RandomQuestion;