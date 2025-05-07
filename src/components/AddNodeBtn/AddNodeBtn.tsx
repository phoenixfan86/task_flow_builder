import { useAppDispatch } from '../../app/hooks';
import { addNode } from '../../features/flow/flowSlice';

const AddNodeBtn = () => {
  const dispatch = useAppDispatch()

  const handleAddNode = () => {
    dispatch(addNode())
  }

  return (
    <button onClick={handleAddNode} className='ring-1 ring-zinc-500 bg-zinc-200 text-zinc-600 hover:text-zinc-800 hover:font-semibold hover:ring-2 hover:ring-zinc-700 hover:bg-zinc-300 rounded-lg p-2 transition-all duration-300'>
      Add Task
    </button>
  )
}

export default AddNodeBtn
