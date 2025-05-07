import type { Node, Edge } from 'reactflow';

export type FlowNodeData = {
  label: string;
  type: 'task' | 'decision' | 'input';
};

export type FlowNode = Node<FlowNodeData>;
export type FlowEdge = Edge;
