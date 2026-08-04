import { ProfileSchema, ExperienceSchema, SkillGroupSchema, ProjectSchema, ConnectionSchema } from '../../types/blueprint';

export class SchemaValidator {
  public static validateProfile(data: any): data is ProfileSchema {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.name === 'string' &&
      typeof data.role === 'string' &&
      typeof data.location === 'string' &&
      Array.isArray(data.metrics)
    );
  }

  public static validateExperience(data: any): data is ExperienceSchema[] {
    if (!Array.isArray(data)) return false;
    return data.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.company === 'string' &&
        typeof item.role === 'string' &&
        typeof item.period === 'string' &&
        Array.isArray(item.points) &&
        Array.isArray(item.stack)
    );
  }

  public static validateSkills(data: any): data is SkillGroupSchema[] {
    if (!Array.isArray(data)) return false;
    return data.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.num === 'string' &&
        typeof item.cat === 'string' &&
        Array.isArray(item.items)
    );
  }

  public static validateProject(data: any): data is ProjectSchema {
    return (
      data &&
      typeof data === 'object' &&
      typeof data.id === 'string' &&
      typeof data.name === 'string' &&
      (data.status === 'ONLINE' || data.status === 'DIAGNOSTIC' || data.status === 'ERROR') &&
      typeof data.activeVersion === 'string' &&
      typeof data.versions === 'object' &&
      Array.isArray(data.connections) &&
      typeof data.spec === 'object' &&
      typeof data.spec.overview === 'string' &&
      typeof data.spec.architecture === 'string' &&
      Array.isArray(data.spec.subsystems) &&
      Array.isArray(data.replay)
    );
  }

  public static validateConnections(data: any): data is ConnectionSchema[] {
    if (!Array.isArray(data)) return false;
    return data.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.source === 'string' &&
        typeof item.target === 'string' &&
        typeof item.busType === 'string' &&
        typeof item.bandwidth === 'string' &&
        typeof item.colorToken === 'string'
    );
  }
}
