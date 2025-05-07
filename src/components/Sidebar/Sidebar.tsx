import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setNodes, setSelectedNode } from '../../features/flow/flowSlice';
import type { FC, FormEvent } from 'react';
import { useState, useEffect } from 'react';

const SideBar: FC = () => {
  const dispatch = useAppDispatch();
  const selectedNodeId = useAppSelector((state) => state.flow.selectedNodeId);
  const nodes = useAppSelector((state) => state.flow.nodes);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode?.data?.label) {
      setLabel(selectedNode.data.label);
    }
  }, [selectedNode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedNodeId) return;

    const updatedNodes = nodes.map((node) =>
      node.id === selectedNodeId
        ? { ...node, data: { ...node.data, label } }
        : node
    );

    dispatch(setNodes(updatedNodes));
    dispatch(setSelectedNode(null));
  };

  if (!selectedNode) return null;

  return (
    <div className="h-screen absolute top-0 left-0 ring-1 ring-zinc-500 bg-zinc-100 rounded-r-lg p-4 z-50 transition-all duration-300 w-64">
      <h2 className="text-2xl uppercase text-shadow-lg mb-4">Edit task</h2>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-10">
        <input
          type="text"
          className="ring-1 ring-zinc-400 rounded-lg p-2"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button
          type="submit"
          className="ring-1 ring-zinc-500 bg-zinc-200 text-zinc-600 hover:text-zinc-800 hover:font-semibold hover:ring-2 hover:ring-zinc-700 hover:bg-zinc-300 rounded-lg p-2 transition-all duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SideBar;
