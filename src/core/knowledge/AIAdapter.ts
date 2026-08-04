export interface LLMAdapter {
  query(prompt: string): Promise<string>;
}

export class GeminiAdapter implements LLMAdapter {
  public async query(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `[GEMINI-3.5-FLASH] SECURE_CONNECTION_STABLE.\nAnalysis: The Prototyping Services Platform is currently operating on a Hostinger VPS layer. Database writes utilize Prisma ORM mappings to a MySQL cluster. Integrated webhooks ensure order locks during payment callbacks.`
        );
      }, 1000);
    });
  }
}

export class OllamaAdapter implements LLMAdapter {
  public async query(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          `[OLLAMA-LLAMA3-OFFLINE] INF_THREAD_COMPLETE.\nAnalysis: Camera assembly uses Sony IMX sensors feeding a python OpenCV pipeline. CPU loads were limited by running HOG detection on frame deltas before scheduling CNN classifications.`
        );
      }, 850);
    });
  }
}

export class KnowledgeAIEngine {
  private currentAdapter: LLMAdapter;

  constructor(adapter: LLMAdapter = new OllamaAdapter()) {
    this.currentAdapter = adapter;
  }

  public setAdapter(adapter: LLMAdapter): void {
    this.currentAdapter = adapter;
  }

  public async queryKnowledge(context: string, question: string): Promise<string> {
    const prompt = `
[SYSTEM CONTEXT]
${context}

[USER INQUIRY]
${question}

Provide an engineering-focused system analysis. Keep it concise.
`;
    return this.currentAdapter.query(prompt);
  }
}
