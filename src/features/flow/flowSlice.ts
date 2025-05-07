import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Edge } from 'reactflow';
import type { FlowEdge, FlowNode } from './types';

interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNodeId: string | null;
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    addNode: (state) => {
      const newNode: FlowNode = {
        id: nanoid(),
        type: 'default',
        position: {
          x: 100 + Math.random() * 500,
          y: 100,
        },
        data: {
          label: 'New Task',
          type: 'task',
        },
      };
      state.nodes.push(newNode);
    },
    setSelectedNode(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    setNodes: (state, action: PayloadAction<FlowNode[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    updateNodeLabel: (
  state,
  action: PayloadAction<{ id: string; label: string }>
) => {
  const node = state.nodes.find((n) => n.id === action.payload.id);
  if (node) {
    node.data.label = action.payload.label;
  }
},

  },
});

export const { setNodes, setEdges, addNode, setSelectedNode, updateNodeLabel } = flowSlice.actions;
export default flowSlice.reducer;
