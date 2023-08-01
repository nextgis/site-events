import type { ModuleNamespace } from 'node_modules/vite/types/hot';
import type { App } from 'vue';

export function registerLayouts(app: App<Element>) {
  const layouts: Record<string, ModuleNamespace> = import.meta.glob('./*.vue', { eager: true });
  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default);
  });
}