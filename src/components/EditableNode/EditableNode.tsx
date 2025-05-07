import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setNodes, setSelectedNode } from '../../features/flow/flowSlice';


const EditableNode = ({ id, data, selected }: NodeProps) => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector((state) => state.flow.nodes);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;

    const updatedNodes = nodes.map((node) =>
      node.id === id
        ? { ...node, data: { ...node.data, label: newLabel } }
        : node
    );

    dispatch(setNodes(updatedNodes));
  };

  const handleBlur = () => {
    dispatch(setSelectedNode(null));
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm bg-white border-2 ${selected ? 'border-zinc-500' : 'border-transparent'}`}>
      <input
        value={data.label}
        onChange={handleLabelChange}
        onBlur={handleBlur}
        className="text-center w-full bg-transparent outline-none"
      />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default EditableNode;
