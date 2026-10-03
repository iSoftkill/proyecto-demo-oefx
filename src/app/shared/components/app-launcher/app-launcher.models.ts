export interface OefaAppItem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'operativo' | 'gestion' | 'apoyo';
  iconBg: string;
  iconGradient: string;
  iconColor: string;
  iconType: 'checklist' | 'document' | 'folder' | 'shield' | 'environment' | 'inbox' | 'workflow' | 'analytics';
  hasAccess: boolean;
  isCurrentApp?: boolean;
  url?: string;
  badge?: string;
}
