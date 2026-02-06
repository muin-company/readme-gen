export type ProjectType = 'node' | 'python' | 'go' | 'rust' | 'unknown';

export type TemplateType = 'minimal' | 'standard' | 'detailed' | 'comprehensive';

export interface ProjectInfo {
  type: ProjectType;
  name: string;
  description?: string;
  version?: string;
  license?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  author?: string;
  repository?: string;
  fileTree: string;
  hasTests: boolean;
}
