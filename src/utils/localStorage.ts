import type { FlowNode, FlowEdge } from '../features/flow/types';

export function saveFlow(nodes: FlowNode[], edges: FlowEdge[]) {
  localStorage.setItem('flow-data', JSON.stringify({ nodes, edges }));
}

export function loadFlow(): { nodes: FlowNode[]; edges: FlowEdge[] } | null {
  const data = localStorage.getItem('flow-data');
  return data ? JSON.parse(data) : null;
}
