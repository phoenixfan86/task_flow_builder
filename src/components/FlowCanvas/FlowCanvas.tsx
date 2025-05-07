import { useCallback, useEffect, useRef } from 'react';
import ReactFlow, { applyNodeChanges, applyEdgeChanges, Background, Controls, addEdge, } from 'reactflow';
import type { Node } from 'reactflow';
import type { Connection } from 'reactflow';
import type { NodeChange, EdgeChange } from 'reactflow';
import type { FlowNode, FlowNodeData } from '../../features/flow/types';
import { saveFlow, loadFlow } from '../../utils/localStorage';
import 'reactflow/dist/style.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setEdges, setNodes, setSelectedNode } from '../../features/flow/flowSlice';
import EditableNode from '../EditableNode/EditableNode';

const nodeTypes = {
  default: EditableNode,
}

const FlowCanvas = () => {
  const dispatch = useAppDispatch()
  const nodes = useAppSelector((state) => state.flow.nodes)
  const edges = useAppSelector((state) => state.flow.edges)

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
      dispatch(setNodes(updatedNodes))
    },
    [dispatch, nodes]
  )

  const handleEdgeChange = useCallback(
    (changes: EdgeChange[]) => {
      const updatedEdges = applyEdgeChanges(changes, edges)
      dispatch(setEdges(updatedEdges))
    },
    [dispatch, edges]
  )

  const handleConnect = useCallback(
    (connection: Connection) => {
      const newEdges = addEdge(connection, edges)
      dispatch(setEdges(newEdges))
    },
    [edges, dispatch]
  )

  const onNodeClick = (_: unknown, node: Node<FlowNodeData>) => {
    dispatch(setSelectedNode(node.id));
  };

  const didLoad = useRef(false);

  useEffect(() => {
    const data = loadFlow();
    if (data) {
      dispatch(setNodes(data.nodes as FlowNode[]));
      dispatch(setEdges(data.edges));

      setTimeout(() => {
        didLoad.current = true;
      }, 100);
    } else {
      didLoad.current = true;
    }
  }, [dispatch]);


  useEffect(() => {
    if (didLoad.current) {
      saveFlow(nodes, edges);
    }
  }, [nodes, edges]);

  return (

    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onNodeClick={onNodeClick}
        onEdgesChange={handleEdgeChange}
        onConnect={handleConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas
