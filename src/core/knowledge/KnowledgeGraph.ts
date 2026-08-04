import technologiesData from '../../data/knowledge/technologies.json';
import profileData from '../../data/knowledge/profile.json';
import skillsData from '../../data/knowledge/skills.json';
import experienceData from '../../data/knowledge/experience.json';
import connectionsData from '../../data/knowledge/connections.json';
import omniRoomData from '../../data/knowledge/projects/omni_room.json';
import pulseXData from '../../data/knowledge/projects/pulse_x.json';
import fluidAIData from '../../data/knowledge/projects/fluid_ai.json';
import predictiveMaintenanceData from '../../data/knowledge/projects/predictive_maintenance.json';

import { TechnologySchema, ProjectSchema, ExperienceSchema, SkillGroupSchema, ConnectionSchema } from '../../types/blueprint';

export interface GraphNode {
  id: string;
  type: 'profile' | 'technology' | 'project' | 'subsystem' | 'experience' | 'skill_group';
  label: string;
  data: any;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
  metadata?: any;
}

export class KnowledgeGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: Map<string, Set<GraphEdge>> = new Map();

  constructor() {
    this.buildGraph();
  }

  private buildGraph() {
    // 1. Add Profile Node
    this.addNode({
      id: 'central_core',
      type: 'profile',
      label: profileData.name,
      data: profileData,
    });

    // 2. Add Technologies Nodes
    const techMap = technologiesData as Record<string, TechnologySchema>;
    Object.keys(techMap).forEach((techId) => {
      const tech = techMap[techId];
      this.addNode({
        id: tech.id,
        type: 'technology',
        label: tech.name,
        data: tech,
      });
    });

    // 3. Add Skills Nodes & Links
    const skillsList = skillsData as SkillGroupSchema[];
    skillsList.forEach((skill) => {
      const skillNodeId = `skill_${skill.num}`;
      this.addNode({
        id: skillNodeId,
        type: 'skill_group',
        label: skill.cat,
        data: skill,
      });

      // Link skill group to central profile core
      this.addEdge(skillNodeId, 'central_core', 'categorizes');

      // Link items (technologies) to skill group node
      skill.items.forEach((techId) => {
        if (this.nodes.has(techId)) {
          this.addEdge(techId, skillNodeId, 'belongs_to');
        }
      });
    });

    // 4. Add Experiences Nodes & Links
    const expList = experienceData as ExperienceSchema[];
    expList.forEach((exp) => {
      this.addNode({
        id: exp.id,
        type: 'experience',
        label: exp.company,
        data: exp,
      });

      // Link experience to profile core
      this.addEdge(exp.id, 'central_core', 'employed_at');

      // Link technologies to experience
      exp.stack.forEach((techId) => {
        if (this.nodes.has(techId)) {
          this.addEdge(techId, exp.id, 'utilized_in');
        }
      });
    });

    // 5. Add Projects
    const projectsList: ProjectSchema[] = [
      omniRoomData as ProjectSchema,
      pulseXData as ProjectSchema,
      fluidAIData as ProjectSchema,
      predictiveMaintenanceData as ProjectSchema,
    ];

    projectsList.forEach((proj) => {
      this.addNode({
        id: proj.id,
        type: 'project',
        label: proj.name,
        data: proj,
      });

      // Link project to profile core
      this.addEdge(proj.id, 'central_core', 'created_by');

      // Link technologies to project
      proj.connections.forEach((techId) => {
        if (this.nodes.has(techId)) {
          this.addEdge(techId, proj.id, 'implemented_with');
        }
      });

      // Add subsystems as virtual nodes and link to project
      proj.spec.subsystems.forEach((sub, idx) => {
        const subId = `${proj.id}_sub_${idx}`;
        this.addNode({
          id: subId,
          type: 'subsystem',
          label: sub.name,
          data: sub,
        });

        this.addEdge(subId, proj.id, 'part_of');

        // Link subsystem technologies
        sub.technologies.forEach((techId) => {
          if (this.nodes.has(techId)) {
            this.addEdge(techId, subId, 'drives');
          }
        });
      });
    });

    // 6. Add Custom Structural Connections
    const connList = connectionsData as ConnectionSchema[];
    connList.forEach((conn) => {
      this.addEdge(conn.source, conn.target, 'bus_link', {
        busType: conn.busType,
        bandwidth: conn.bandwidth,
        dashArray: conn.dashArray,
      });
    });
  }

  public addNode(node: GraphNode) {
    this.nodes.set(node.id, node);
    if (!this.edges.has(node.id)) {
      this.edges.set(node.id, new Set());
    }
  }

  public addEdge(source: string, target: string, relation: string, metadata: any = {}) {
    if (!this.edges.has(source)) this.edges.set(source, new Set());
    if (!this.edges.has(target)) this.edges.set(target, new Set());

    this.edges.get(source)!.add({ source, target, relation, metadata });
    // Also build reverse edge for easy traversal
    this.edges.get(target)!.add({ source: target, target: source, relation: `${relation}_rev`, metadata });
  }

  public getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): GraphNode[] {
    return Array.from(this.nodes.values());
  }

  public getEdges(id: string): GraphEdge[] {
    return Array.from(this.edges.get(id) || []);
  }

  // Find all nodes connected to a specific node
  public queryConnections(id: string): GraphNode[] {
    const list = this.getEdges(id);
    return list
      .map((edge) => this.nodes.get(edge.target))
      .filter((n): n is GraphNode => n !== undefined);
  }

  // Deep query of technology references
  public queryBacklinks(techId: string) {
    const edges = this.getEdges(techId);
    const projects: GraphNode[] = [];
    const experiences: GraphNode[] = [];
    const subsystems: GraphNode[] = [];

    edges.forEach((edge) => {
      const node = this.nodes.get(edge.target);
      if (!node) return;
      if (node.type === 'project') projects.push(node);
      if (node.type === 'experience') experiences.push(node);
      if (node.type === 'subsystem') subsystems.push(node);
    });

    return { projects, experiences, subsystems };
  }
}
