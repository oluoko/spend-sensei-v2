import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getFinancialAdvice = async (
  totalBudget: number,
  totalIncome: number,
  totalSpend: number
) => {
  try {
    if (!totalBudget || !totalIncome || !totalSpend) {
      return "Please provide valid financial data to get advice. You need to add atleast one budget, income, and expense.";
    }

    const userPrompt = `
      Based on the following financial data:
      - Total Budget: Ksh ${totalBudget}  
      - Expenses: Ksh ${totalSpend}  
      - Incomes: Ksh ${totalIncome} 
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    // Send the prompt to the OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userPrompt }],
    });

    // Process and return the response
    const advice = chatCompletion.choices[0].message.content;
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
