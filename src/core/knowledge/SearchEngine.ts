import { KnowledgeGraph, GraphNode } from './KnowledgeGraph';

export interface SearchResult {
  query: string;
  matches: GraphNode[];
}

export class SearchEngine {
  constructor(private graph: KnowledgeGraph) {}

  public execute(query: string): SearchResult {
    const normalized = query.toLowerCase().trim();
    if (!normalized) {
      return { query, matches: [] };
    }

    const allNodes = this.graph.getAllNodes();
    const matches = allNodes.filter((node) => {
      // Match ID or main label name
      if (node.label.toLowerCase().includes(normalized)) return true;
      if (node.id.toLowerCase().includes(normalized)) return true;

      // Match technology categories and questions
      if (node.type === 'technology') {
        const data = node.data;
        if (data.category && data.category.toLowerCase().includes(normalized)) return true;
        if (
          data.interviewQuestions &&
          Array.isArray(data.interviewQuestions) &&
          data.interviewQuestions.some(
            (q: any) =>
              q.q.toLowerCase().includes(normalized) ||
              q.a.toLowerCase().includes(normalized)
          )
        ) {
          return true;
        }
      }

      // Match projects spec data fields
      if (node.type === 'project') {
        const data = node.data;
        if (data.spec) {
          if (data.spec.overview.toLowerCase().includes(normalized)) return true;
          if (data.spec.architecture.toLowerCase().includes(normalized)) return true;
          if (data.spec.challenges.toLowerCase().includes(normalized)) return true;
          if (data.spec.engineeringDecisions.toLowerCase().includes(normalized)) return true;
          if (data.spec.lessonsLearned.toLowerCase().includes(normalized)) return true;
        }
        if (
          data.connections &&
          Array.isArray(data.connections) &&
          data.connections.some((c: string) => c.toLowerCase().includes(normalized))
        ) {
          return true;
        }
      }

      // Match experiences
      if (node.type === 'experience') {
        const data = node.data;
        if (data.role.toLowerCase().includes(normalized)) return true;
        if (data.company.toLowerCase().includes(normalized)) return true;
        if (
          data.points &&
          Array.isArray(data.points) &&
          data.points.some((p: string) => p.toLowerCase().includes(normalized))
        ) {
          return true;
        }
      }

      // Match subsystems
      if (node.type === 'subsystem') {
        const data = node.data;
        if (data.function && data.function.toLowerCase().includes(normalized)) return true;
        if (
          data.technologies &&
          Array.isArray(data.technologies) &&
          data.technologies.some((t: string) => t.toLowerCase().includes(normalized))
        ) {
          return true;
        }
      }

      return false;
    });

    return { query, matches };
  }
}
